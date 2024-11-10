import { compile } from 'handlebars';

import type { Entries } from '@/types/helpers';
import type { PromptAnswers } from '@/types/modules/prompt';

interface MessageFormatterOptions {
	defaultEmptyValue?: string;
	removeEmptyFields?: boolean;
	trimWhitespace?: boolean;
}

interface FormatMessageProps {
	template: string;
	data: PromptAnswers;
	options?: MessageFormatterOptions;
}

/**
 * Formats a commit message by applying a given template to provided data.
 *
 * @param {object} props - The properties required for message formatting.
 * @param {string} props.template - The Handlebars template string.
 * @param {CommitData} props.data - The data to be formatted within the template.
 *
 * @param {MessageFormatterOptions} [props.options] - Configuration options for formatting.
 * @param {string} [props.options.defaultEmptyValue] - The value to use for empty fields.
 * @param {boolean} [props.options.removeEmptyFields] - Whether to exclude empty fields from the output.
 * @param {boolean} [props.options.trimWhitespace] - Whether to trim whitespace from field values.
 *
 * @returns {string} - The formatted message string.
 */
export const messageFormatter = ({ template, data, options = {} }: FormatMessageProps): string => {
	const { defaultEmptyValue = '', removeEmptyFields = true, trimWhitespace = true } = options;

	// Preparation of the function template.
	const compiledTemplate = compile(template);

	// Data preparation based on options.
	const processedData = (Object.entries(data) as Entries<typeof data>).reduce((acc, [key, value]) => {
		if (value || !removeEmptyFields) {
			const preparedValue = trimWhitespace ? value?.trim() : value;

			acc[key] = preparedValue || defaultEmptyValue;
		}

		return acc;
	}, {} as Partial<PromptAnswers>);

	// Compilation and application of the template.
	return compiledTemplate(processedData);
};
