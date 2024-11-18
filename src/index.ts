import inquirerPrompt from 'inquirer-autocomplete-prompt';
import InquirerMaxLength from 'inquirer-maxlength-input-prompt';

import { filterBadWords, generateQuestionPrompts, loadJazzerConfig, messageFormatter } from './utils';

import { isString } from './helpers/typeGuards';

import type { ICommitFunc, TypeInquirer } from './types';
import { type PromptAnswers, PromptQuestionTypeEnum } from './types/modules/prompt';

const CommitJazzerPrompter = async (cz: TypeInquirer, commitMessage: ICommitFunc) => {
	cz.prompt.registerPrompt(PromptQuestionTypeEnum.Autocomplete, inquirerPrompt);
	cz.prompt.registerPrompt(PromptQuestionTypeEnum.MaxLengthInput, InquirerMaxLength);

	// Load the configuration.
	const configuration = await loadJazzerConfig();

	// Get the questions.

	const questions = await generateQuestionPrompts({
		language: configuration.language,
		baseQuestionsOptions: configuration.baseQuestionsOptions,
	});

	// Get the answers.
	const answers = await cz.prompt<PromptAnswers>(questions);

	// Get the formatted message.
	let message = messageFormatter({
		template: configuration.template ?? '',
		data: answers,
		options: {
			removeEmptyFields: true,
			trimWhitespace: true,
		},
	});

	// Check if bad words should be filtered.
	if (configuration.validateCommitBadWords) {
		// Filter the message.
		const filteredMessage = filterBadWords({ message, configuration: configuration.badWordsOptions ?? {} });

		if (isString(filteredMessage)) {
			message = filteredMessage;
		} else {
			return;
		}
	}

	// Commit the message.
	commitMessage(message);
};

export default { prompter: CommitJazzerPrompter };
