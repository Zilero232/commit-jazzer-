import type { IFuseOptions } from 'fuse.js';
import Fuse from 'fuse.js';

import createFormattedOptions from '@/helpers/createFormattedOptions';

interface CreateAutocompleteSourceProps<T> {
	data: T[];
	keys: (keyof T)[];
	formatOptions: {
		templateShowFormat?: string;
		templateValueFormat?: Record<string, keyof T>;
	};
	fuseOptions?: IFuseOptions<T>;
}

/**
 * Creates an autocomplete source function for searching and formatting data.
 *
 * @template T - The type of the data elements.
 * @param {CreateAutocompleteSourceProps<T>} props - The properties for creating the autocomplete source.
 * @param {T[]} props.data - The data array to search through.
 * @param {(keyof T)[]} props.keys - The keys to search within each data item.
 * @param {object} props.formatOptions - Options for formatting the search results.
 * @param {string} [props.formatOptions.templateShowFormat] - Template for displaying the search result.
 * @param {Record<string, keyof T>} [props.formatOptions.templateValueFormat] - Template for values in the search result.
 * @param {IFuseOptions<T>} [props.fuseOptions] - Options for Fuse.js configuration.
 *
 * @returns {Function} - A function that accepts a query string and returns formatted search results.
 */
export const createAutocompleteSource = <T>({ data, keys, formatOptions, fuseOptions }: CreateAutocompleteSourceProps<T>) => {
	const stringKeys: string[] = keys.map((key: unknown) => key as string);

	const fuse = new Fuse(data, { ...fuseOptions, keys: stringKeys });

	return (_: unknown, query: string) => {
		if (!query) {
			// If there is no request, we return formatted data for the entire array.
			return createFormattedOptions({ data, formatOptions });
		}

		try {
			// Performing a search with filtering.
			const results = fuse.search(query);

			// Return formatted data for the search results.
			return createFormattedOptions({ data: results as T[], formatOptions });
		} catch (error) {
			console.error('Error during search or sorting:', error);

			// Return formatted data for the entire array.
			return createFormattedOptions({ data, formatOptions });
		}
	};
};
