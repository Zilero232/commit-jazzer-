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
