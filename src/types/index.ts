import type Inquirer from 'inquirer';

import type { CommitFieldsValues, CommitType } from './modules/commit';
import type { CommitActionNames } from './modules/actions';
import type { BaseQuestionsOptions } from './modules/prompt';
import type { LanguageValues } from './modules/language';
import type { BadWordsOptions } from './modules/badWords';

// Define Inquirer types.
export type TypeInquirer = typeof Inquirer;

// Define commit function type.
export type ICommitFunc = (commitMessage: string) => void;

// Define commit jazzer prompter commitizen options.
export interface CommitJazzerPrompterOptions {
	/**
	 * Language.
	 *
	 * @default "en"
	 */
	language?: LanguageValues;

	/**
	 * Format message.
	 *
	 * @default "{{type}}: {{emoji}} - {{title}}";
	 */
	template?: string;

	/**
	 * Disable emoji.
	 *
	 * @default false
	 */
	disableEmoji?: boolean;

	/**
	 * The types that will be shown in the list of type selections.
	 *
	 * @default []
	 */
	availableCommitTypes?: CommitActionNames[];

	/**
	 * The types that will be shown in the list of type selections.
	 *
	 * @default []
	 */
	availablePromptQuestions?: (CommitFieldsValues | string)[];

	/**
	 * Can change the basic types here or add your own type.
	 *
	 * @default {}
	 */
	commitTypes?: Record<CommitFieldsValues, CommitType>;

	/**
	 * Change options of the basic questions.
	 *
	 * @default []
	 */
	baseQuestionsOptions?: BaseQuestionsOptions[];

	/**
	 * Check commit message for bad words
	 *
	 * @default true
	 */
	validateCommitBadWords?: boolean;

	/**
	 * Bad words validation options.
	 *
	 * @default {}
	 */
	badWordsOptions?: BadWordsOptions;
}
