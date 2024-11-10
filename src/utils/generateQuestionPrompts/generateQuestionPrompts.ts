import Fuse from 'fuse.js';

import type { CommitJazzerPrompterOptions } from '@/types/index';
import { PromptQuestionTypeEnum } from '@/types/modules/prompt';

import AnswerZodSchema from '@/schema/AnswerZodSchema';

import generateErrorReport from '@/helpers/generateErrorReport';

import DEFAULT_COMMIT_TYPES from '@/constants/emojiCommit';

interface GenerateQuestionPromptsProps extends Pick<CommitJazzerPrompterOptions, 'promptQuestions' | 'availableCommitTypes'> {}

export const generateQuestionPrompts = async ({ promptQuestions }: GenerateQuestionPromptsProps) => {
	if (!promptQuestions) {
		return [];
	}

	const questions = promptQuestions.map(({ type, key, message, options = {} }) => {
		const { skip } = options;

		// Creating a Zod scheme based on the passed options.
		const schema = AnswerZodSchema(options);

		const promptQuestion = {
			type,
			name: key,
			when: skip,
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

		if (type === PromptQuestionTypeEnum.Autocomplete) {
			const commitTypesFuse = new Fuse(DEFAULT_COMMIT_TYPES, {
				shouldSort: true,
				threshold: 0.4,
				location: 0,
				distance: 100,
				minMatchCharLength: 1,
				keys: ['name', 'code', 'description'],
			});

			// @ts-expect-error
			promptQuestion.source = (_: unknown, query: string) => {
				// If the query is empty, we return the default list.
				if (!query) {
					return DEFAULT_COMMIT_TYPES;
				}

				try {
					// Performing a search with filtering.
					const results = commitTypesFuse.search(query);

					return results.map(match => ({
						name: `${match.item.emoji} ${match.item.name} - ${match.item.description}`,
						value: match.item.name,
					}));
				} catch (error) {
					console.error('Error during search or sorting:', error);

					return DEFAULT_COMMIT_TYPES;
				}
			};
		}

		return promptQuestion;
	});

	return questions;
};
