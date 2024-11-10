import { translations } from '@/translations/index';

import type { CommitJazzerPrompterOptions } from '@/types/index';
import type { TranslationsJson } from '@/types/modules/language';

import { LanguageEnum } from '@/types/modules/language';
import { CommitFieldsEnum } from '@/types/modules/commit';
import { PromptQuestionTypeEnum } from '@/types/modules/prompt';

// Define current translations.
const CURRENT_TRANSLATIONS: TranslationsJson = translations[LanguageEnum.Russian];

// Define base template format.
const BASE_TEMPLATE_FORMAT = `{{${CommitFieldsEnum.ActionType}}: {{emoji}} - {{${CommitFieldsEnum.Title}}`;

// Define default configuration.
const DEFAULT_CONFIGURATION: CommitJazzerPrompterOptions = {
	language: LanguageEnum.Russian,
	template: BASE_TEMPLATE_FORMAT,
	disableEmoji: false,
	minMessageLength: 0,
	maxMessageLength: 70,
	validateCommitBadWords: true,
	badWordsOptions: {
		checkHasProfaneWords: true,
		clearMessage: true,
		replaceProfaneWords: true,
	},
	promptQuestions: [
		{
			type: PromptQuestionTypeEnum.Autocomplete,
			key: CommitFieldsEnum.ActionType,
			message: CURRENT_TRANSLATIONS.type,
			options: {
				required: true,
			},
		},
		{
			type: PromptQuestionTypeEnum.Input,
			key: CommitFieldsEnum.Component,
			message: CURRENT_TRANSLATIONS.component,
		},
		{
			type: PromptQuestionTypeEnum.Input,
			key: CommitFieldsEnum.Title,
			message: CURRENT_TRANSLATIONS.title,
			options: {
				required: true,
			},
		},
		{
			type: PromptQuestionTypeEnum.Input,
			key: CommitFieldsEnum.Description,
			message: CURRENT_TRANSLATIONS.description,
		},
		{
			type: PromptQuestionTypeEnum.Input,
			key: CommitFieldsEnum.BreakingChanges,
			message: CURRENT_TRANSLATIONS.breaking,
		},
		{
			type: PromptQuestionTypeEnum.Input,
			key: CommitFieldsEnum.RelatedIssues,
			message: CURRENT_TRANSLATIONS.issues,
		},
		{
			type: PromptQuestionTypeEnum.Input,
			key: CommitFieldsEnum.Comment,
			message: CURRENT_TRANSLATIONS.comment,
		},
	],
};

export default DEFAULT_CONFIGURATION;
