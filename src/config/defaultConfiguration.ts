import type { CommitJazzerPrompterOptions } from '@/types/index';

import { LanguageEnum } from '@/types/modules/language';
import { CommitFieldsEnum } from '@/types/modules/commit';

// Define base template format.
const BASE_TEMPLATE_FORMAT = `{{${CommitFieldsEnum.ActionType}}}: {{emoji}} - {{${CommitFieldsEnum.Title}}}`;

// Define default configuration.
const DEFAULT_CONFIGURATION: CommitJazzerPrompterOptions = {
	language: LanguageEnum.English,
	template: BASE_TEMPLATE_FORMAT,
	disableEmoji: false,
	validateCommitBadWords: true,
	badWordsOptions: {
		checkHasProfaneWords: true,
		replaceProfaneWords: false,
		clearMessage: false,
	},
};

export default DEFAULT_CONFIGURATION;
