import { z } from 'zod';
import type { ZodType } from 'zod';

import type { ZodPromptQuestion } from './QuestionZodSchema';
import type { CommitJazzerPrompterOptions } from '@/types/index';

import { ZCommitActionType, ZLanguage } from './modules/ZodEnums';

import QuestionZodSchema from './QuestionZodSchema';
import CommitTypesZodSchema from './CommitTypesZodSchema';

// Define options with updated availableCommitTypes type.
type CommitJazzerZodOptions = Omit<CommitJazzerPrompterOptions, 'language' | 'availableCommitTypes' | 'promptQuestions'> & {
	language?: string;
	availableCommitTypes?: string[];
	promptQuestions?: ZodPromptQuestion[];
};

const CommitJazzerPrompterOptionsSchema: ZodType<CommitJazzerZodOptions> = z.object({
	language: ZLanguage.optional(),
	template: z.string(),
	disableEmoji: z.boolean().optional(),
	minMessageLength: z.number().optional(),
	maxMessageLength: z.number().optional(),
	availableCommitTypes: z.array(ZCommitActionType).optional(),
	commitTypes: CommitTypesZodSchema.optional(),
	promptQuestions: z.array(QuestionZodSchema).optional(),
	badWordsOptions: z
		.object({
			checkHasProfaneWords: z.boolean().optional(),
			clearMessage: z.boolean().optional(),
			replaceProfaneWords: z.boolean().optional(),
			options: z
				.object({
					additionalWords: z.array(z.string()).optional(),
					excludedWords: z.array(z.string()).optional(),
					placeholder: z.string().optional(),
					overrideBlockWords: z.boolean().optional(),
				})
				.optional(),
		})
		.optional(),
	validateCommitBadWords: z.boolean().optional(),
});

export default CommitJazzerPrompterOptionsSchema;
