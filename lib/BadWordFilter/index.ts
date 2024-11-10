import type { BadWordFilterOptions } from './types';

import { containsProfaneWords, filterProfanity, maskProfaneWord } from './utils';

import baseListBadWords from './constants/badWords';

/**
 * Plugin for filtering profane words in strings.
 *
 * @param {BadWordFilterOptions} [options] - Options for the plugin.
 * @param {string[]} [options.blocklist] - List of words to be filtered.
 * @param {string[]} [options.excludedWords] - List of words to be allowed.
 * @param {string} [options.placeholder] - Placeholder string used for masking profane words.
 * @param {boolean} [options.overrideBlocklist] - Flag to override the base list of words.
 *
 * @returns {object} - Object with methods for filtering profane words.
 */
const BadWordFilter = ({ additionalBlockWords = [], excludedWords = [], placeholder = '*', overrideBlockWords = false }: BadWordFilterOptions) => {
	let listBadWords = [...additionalBlockWords, ...(!overrideBlockWords ? baseListBadWords : [])];

	if (excludedWords.length > 0) {
		listBadWords = listBadWords.filter((word: string) => !excludedWords.includes(word));
	}

	return {
		// Method for checking if a string contains profane words.
		hasProfaneWords: (input: string): Array<string> => containsProfaneWords({ input, blocklist: listBadWords }),

		// Method for masking profane words.
		maskProfanity: (input: string): string => maskProfaneWord({ input, placeholder, blocklist: listBadWords }),

		// Method for cleaning a string.
		cleanString: (input: string): string => filterProfanity({ input, blocklist: listBadWords }),

		// Method for getting a list of bad words.
		getBlockWords: (): string[] => listBadWords,

		// Method for getting the list of excluded words.
		getExcludedWords: (): string[] => excludedWords,

		// Method for getting the base list.
		getBaseList: (): string[] => baseListBadWords,
	};
};

export default BadWordFilter;
