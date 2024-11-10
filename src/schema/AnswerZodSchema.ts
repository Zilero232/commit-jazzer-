import { z } from 'zod';
import type { ZodString } from 'zod';

import type { PromptQuestionOptions } from '@/types/modules/prompt';

/**
 * Creates a Zod schema based on the passed options.
 *
 * @param {PromptQuestionOptions} options - The options for the prompt question.
 *
 * @returns {ZodString | z.ZodOptional<ZodString>} - The Zod schema.
 */
const AnswerZodSchema = (options: PromptQuestionOptions) => {
	let schema: ZodString | z.ZodOptional<ZodString> = z.string();

	const lengthOptions = options.validations?.length;

	if (lengthOptions) {
		// Apply the maximum length.
		if (lengthOptions.minMessageLength) {
			schema = schema.min(lengthOptions.minMessageLength);
		}

		// Apply the minimum length.
		if (lengthOptions.maxMessageLength) {
			schema = schema.max(lengthOptions.maxMessageLength);
		}
	}

	// Adding required.
	if (!options.required) {
		schema = schema.optional();
	}

	return schema;
};

export default AnswerZodSchema;
