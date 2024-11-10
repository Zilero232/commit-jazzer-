import type Inquirer from 'inquirer';

import type { BadWordFilterOptions } from '../../lib/BadWordFilter/types/index';

import type { CommitFieldsValues, CommitType } from './modules/commit';
import type { CommitActionNames } from './modules/actions';
import type { PromptQuestion } from './modules/prompt';
import type { LanguageValues } from './modules/language';

// Define Inquirer types.
export type TypeInquirer = typeof Inquirer;

// Define commit function type.
export type ICommitFunc = (commitMessage: string) => void;

// Define bad words options.
export interface BadWordsOptions {
	checkHasProfaneWords?: boolean;
	clearMessage?: boolean;
	replaceProfaneWords?: boolean;
	options?: BadWordFilterOptions;
}

// Define commit jazzer prompter commitizen options.
export interface CommitJazzerPrompterOptions {
	/**
	 * Language.
	 *
	 * @default en
	 */
	language?: LanguageValues;

	/**
	 * Format message.
	 *
	 * @default "{{type}}: {{emoji}} - {{title}}";
	 */
	template: string;

	/**
	 * Disable emoji.
	 *
	 * @default false
	 */
	disableEmoji?: boolean;

	/**
	 * Global minimum message length.
	 *
	 * @default 70
	 */
	minMessageLength?: number;

	/**
	 * Global maximum message length.
	 *
	 * @default 70
	 */
	maxMessageLength?: number;

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
	availablePromptQuestions?: CommitFieldsValues[];

	/**
	 * Can change the basic types here or add your own type.
	 *
	 * @default {}
	 */
	commitTypes?: Record<CommitFieldsValues, CommitType>;

	/**
	 * Can change the basic questions here or add your own question.
	 *
	 * @default []
	 */
	promptQuestions?: PromptQuestion[];

	/**
	 * Bad words validation options.
	 *
	 * @default {}
	 */
	badWordsOptions?: BadWordsOptions;

	/**
	 * Check commit message for bad words
	 *
	 * @default true
	 */
	validateCommitBadWords?: boolean;
}
