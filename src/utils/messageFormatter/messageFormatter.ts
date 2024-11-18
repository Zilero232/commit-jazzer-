import { compile } from 'handlebars';

import type { Entries } from '@/types/helpers';
import { isObject } from '@/helpers/typeGuards';

interface MessageFormatterOptions {
	defaultEmptyValue?: string;
	removeEmptyFields?: boolean;
	trimWhitespace?: boolean;
}

interface FormatMessageProps<T> {
	template: string;
	data: T;
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
export const messageFormatter = <T>({ template, data, options = {} }: FormatMessageProps<T>): string => {
	if (!data || !isObject(data)) {
		return '';
	}

	const { defaultEmptyValue = '', removeEmptyFields = true, trimWhitespace = true } = options;

	// Preparation of the function template.
	const compiledTemplate = compile(template);

	// Data preparation based on options.
	const processedData = (Object.entries(data) as Entries<typeof data>).reduce((acc, [key, value]) => {
		if (value || !removeEmptyFields) {
			// Check if value is a string before calling .trim()
			const preparedValue = trimWhitespace && typeof value === 'string' ? value.trim() : value;

			acc[key as keyof T] = (preparedValue || defaultEmptyValue) as NonNullable<T[keyof T]>;
		}

		return acc;
	}, {} as Partial<T>);

	// Compilation and application of the template.
	return compiledTemplate(processedData);
};
