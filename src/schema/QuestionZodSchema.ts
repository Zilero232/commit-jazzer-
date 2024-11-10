import { z } from 'zod';
import type { ZodType } from 'zod';

import type { PromptQuestion } from '@/types/modules/prompt';

import { ZCommitFields, ZQuestionTypes } from './modules/ZodEnums';

// Define prompt question type with updated key type.
export interface ZodPromptQuestion extends Omit<PromptQuestion, 'type' | 'key'> {
	type: string;
	key: string;
}

const QuestionZodSchema: ZodType<ZodPromptQuestion> = z.object({
	type: ZQuestionTypes,
	key: ZCommitFields,
	message: z.string(),
	options: z
		.object({
			required: z.boolean().optional(),
			skip: z.boolean().optional(),
			validations: z
				.object({
					length: z
						.object({
							minMessageLength: z.number().optional(),
							maxMessageLength: z.number().optional(),
						})
						.optional(),
				})
				.optional(),
		})
		.optional(),
});

export default QuestionZodSchema;
