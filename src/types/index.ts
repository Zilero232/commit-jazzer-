import type Inquirer from 'inquirer';

import type { CommitFieldsValues } from './modules/commit';
import type { BaseCommitType, CommitActionNames, CommitActionsEnum } from './modules/actions';
import type { BaseQuestion } from './modules/prompt';
import type { LanguageValues } from './modules/language';
import type { BadWordsOptions } from './modules/badWords';
import type { ShowBannerOptions } from './modules/banner';

// Define Inquirer types.
export type TypeInquirer = typeof Inquirer;

// Define commit function type.
export type CommitMessageFunc = (commitMessage: string) => void;

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
	 * The types that will be shown in the list of type selections.
	 *
	 * @default []
	 */
	availableCommitTypes?: (CommitActionNames | string)[];

	/**
	 * The types that will be shown in the list of type selections.
	 *
	 * @default []
	 */
	availablePromptQuestions?: CommitFieldsValues[];

	/**
	 * Can change the basic types here.
	 *
	 * @default {}
	 */
	baseCommitTypes?: Partial<Record<CommitActionsEnum, Partial<BaseCommitType>>>;

	/**
	 * Create custom commit types.
	 *
	 * @default {}
	 */
	addCustomCommitTypes?: Record<string, BaseCommitType>;

	/**
	 * Change options of the basic questions.
	 *
	 * @default []
	 */
	baseQuestionsOptions?: BaseQuestion[];

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

	/**
	 * Show the banner before starting the commit process.
	 *
	 * @default true
	 */
	showBanner?: boolean;

	/**
	 * Show the banner before starting the commit process.
	 *
	 * @default {}
	 */
	showBannerOptions?: ShowBannerOptions;
}
