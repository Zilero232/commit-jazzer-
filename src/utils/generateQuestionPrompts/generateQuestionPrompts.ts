import { translations } from '@/translations';

import { createAutocompleteSource } from '@/utils';

import AnswerZodSchema from '@/schema/AnswerZodSchema';

import generateErrorReport from '@/helpers/generateErrorReport';
import { isObject } from '@/helpers/typeGuards';

import type { CommitJazzerPrompterOptions } from '@/types/index';
import type { BaseQuestionsOptions, PromptQuestions, PromptQuestionTypeValues } from '@/types/modules/prompt';
import { PromptQuestionTypeEnum } from '@/types/modules/prompt';
import { CommitFieldsEnum } from '@/types/modules/commit';

import DEFAULT_QUESTIONS from '@/config/defaultQuestions';
import DEFAULT_COMMIT_TYPES from '@/constants/emojiCommit';

interface GenerateQuestionPromptsProps extends Pick<CommitJazzerPrompterOptions, 'language' | 'baseQuestionsOptions'> {}

export const generateQuestionPrompts = async ({ language, baseQuestionsOptions }: GenerateQuestionPromptsProps) => {
	const promptQuestions: PromptQuestions[] = [];

	// If language is set, update the default questions.
	const CURRENT_TRANSLATIONS = language ? translations[language] : [];

	// Generate default questions.
	DEFAULT_QUESTIONS.forEach((question) => {
		const { key } = question;

		let questionOptions = {
			...question,
		};

		// If there are override options for the question, apply them.
		if (baseQuestionsOptions) {
			const overrideOptions = baseQuestionsOptions.find((option: BaseQuestionsOptions) => option.key === key);

			if (overrideOptions) {
				questionOptions = {
					...questionOptions,
					...overrideOptions,
				};
			}
		}

		// If there is a override translation for the question, apply it.
		if (isObject(CURRENT_TRANSLATIONS) && key in CURRENT_TRANSLATIONS) {
			questionOptions.message = CURRENT_TRANSLATIONS[key];
		}

		// Add the question to the promptQuestions array.
		promptQuestions.push(questionOptions);
	});

	const questions = promptQuestions.map(({ type, key, message, options = {} }) => {
		const { skip = false, validations = {} } = options;

		// Creating a Zod scheme based on the passed options.
		const schema = AnswerZodSchema(type as PromptQuestionTypeValues, options);

		const promptQuestion: Record<string, unknown> = {
			type,
			name: key,
			when: !skip,
			message,
			validate: async (input: string): Promise<boolean> => {
				// Checking the Zod scheme.
				const parseResult = await schema.safeParseAsync(input);

				if (!parseResult.success) {
					const errorMessage = generateErrorReport({
						issues: parseResult.error.issues,
					});

					console.error(errorMessage);
				}

				return parseResult.success;
			},
		};

		// If this is type = autocomplete, then add the source function for the search.
		if (type === PromptQuestionTypeEnum.Autocomplete) {
			switch (key) {
				case CommitFieldsEnum.ActionType:
					promptQuestion.source = createAutocompleteSource({
						data: DEFAULT_COMMIT_TYPES,
						keys: ['name', 'code', 'description'],
						formatOptions: {
							templateShowFormat: '{{name}} - {{description}} {{emoji}}',
							templateValueFormat: {
								type: 'name',
								emoji: 'emoji',
							},
						},
					});

					break;
				default:
					throw new Error(`Unknown key: ${key}`);
			}
		}

		// If this is type = maxlength-input, then add the min and max length options.
		if (type === PromptQuestionTypeEnum.MaxLengthInput) {
			promptQuestion.minLength = validations?.length?.minMessageLength || 0;
			promptQuestion.maxLength = validations?.length?.maxMessageLength || 70;
		}

		return promptQuestion;
	});

	return questions;
};
