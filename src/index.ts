import inquirerPrompt from 'inquirer-autocomplete-prompt';
import InquirerMaxLength from 'inquirer-maxlength-input-prompt';

import BadWordFilterPlugin from '@/lib/BadWordFilter';

import { generateQuestionPrompts, loadJazzerConfig, messageFormatter } from './utils';

import type { ICommitFunc, TypeInquirer } from './types';
import { type PromptAnswers, PromptQuestionTypeEnum } from './types/modules/prompt';

const CommitJazzerPrompter = async (cz: TypeInquirer, commitMessage: ICommitFunc) => {
	cz.prompt.registerPrompt(PromptQuestionTypeEnum.Autocomplete, inquirerPrompt);
	cz.prompt.registerPrompt(PromptQuestionTypeEnum.MaxLengthInput, InquirerMaxLength);

	// Load the configuration.
	const configuration = await loadJazzerConfig();

	// Get the questions.
	const questions: any = await generateQuestionPrompts({
		promptQuestions: configuration.promptQuestions,
		availableCommitTypes: configuration.availableCommitTypes,
	});

	// Get the answers.
	const answers = await cz.prompt<PromptAnswers>(questions);

	// Get the formatted message.
	let message = messageFormatter({
		template: configuration.template,
		data: answers,
		options: {
			removeEmptyFields: true,
			trimWhitespace: true,
		},
	});

	if (configuration.validateCommitBadWords) {
		const { clearMessage, checkHasProfaneWords, replaceProfaneWords, options = {} } = configuration.badWordsOptions ?? {};

		const { hasProfaneWords, maskProfanity, cleanString } = BadWordFilterPlugin(options);

		// Find and return bad words in the input string.
		if (checkHasProfaneWords) {
			const foundBadWords = hasProfaneWords(message);

			if (foundBadWords.length > 0) {
				console.error(`Input contains prohibited words: ${foundBadWords.join(', ')}. Please remove them.`);

				return false;
			}
		}

		// Replace the bad words in the input string on placeholder.
		if (replaceProfaneWords) {
			message = maskProfanity(message);
		}

		// Clean the input string from bad words.
		if (clearMessage) {
			message = cleanString(message);
		}
	}

	// Commit the message.
	commitMessage(message);
};

export default { prompter: CommitJazzerPrompter };
