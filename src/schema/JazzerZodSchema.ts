import { z } from 'zod';
import type { ZodType } from 'zod';

import type { ZodBaseQuestionsOptions } from './QuestionZodSchema';

import type { CommitJazzerPrompterOptions } from '@/types/index';
import { ZCommitActionType, ZLanguage } from './modules/ZodEnums';

import { BaseQuestionsOptionsSchema } from './QuestionZodSchema';
import CommitTypesZodSchema from './CommitTypesZodSchema';
import BadWordsOptionsSchema from './BadWordsOptionsSchema';

// Remove fields for override.
type OmitCommitJazzerPrompterOptions = Omit<
	CommitJazzerPrompterOptions,
	'language' | 'availableCommitTypes' | 'availablePromptQuestions' | 'baseQuestionsOptions' | 'createCustomQuestions'
>;

// Define options with updated availableCommitTypes type.
type CommitJazzerZodOptions = OmitCommitJazzerPrompterOptions & {
	language?: string;
	availableCommitTypes?: string[];
	availablePromptQuestions?: string[];
	baseQuestionsOptions?: ZodBaseQuestionsOptions[];
};

const CommitJazzerPrompterOptionsSchema: ZodType<CommitJazzerZodOptions> = z.object({
	language: ZLanguage.optional(),
	template: z.string().optional(),
	availableCommitTypes: z.array(ZCommitActionType).optional(),
	availablePromptQuestions: z.array(z.string()).optional(),
	commitTypes: CommitTypesZodSchema.optional(),
	baseQuestionsOptions: z.array(BaseQuestionsOptionsSchema).optional(),
	validateCommitBadWords: z.boolean().optional(),
	badWordsOptions: BadWordsOptionsSchema.optional(),
});

export default CommitJazzerPrompterOptionsSchema;
