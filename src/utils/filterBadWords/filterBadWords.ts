import BadWordFilterPlugin from '@/lib/BadWordFilter';

import type { BadWordsOptions } from '@/types/modules/badWords';

interface FilterBadWordsProps {
	message: string;
	configuration: BadWordsOptions;
}

/**
 * Function for filtering messages with checking and clearing of forbidden words.
 *
 * @param message - The original message to be processed.
 * @param configuration - Configuration for working with the forbidden word filter.
 *
 * @returns A filtered or cleared message, or false if forbidden words were found.
 */
export const filterBadWords = ({ message = '', configuration = {} }: FilterBadWordsProps): string | boolean => {
	const { clearMessage, checkHasProfaneWords, replaceProfaneWords, options = {} } = configuration;

	const { hasProfaneWords, maskProfanity, cleanString } = BadWordFilterPlugin(options);

	// Checking for prohibited words.
	if (checkHasProfaneWords) {
		const foundBadWords = hasProfaneWords(message);

		if (foundBadWords.length > 0) {
			console.error(`Input contains prohibited words: ${foundBadWords.join(', ')}. Please remove them.`);

			// Return false if forbidden words are found.
			return false;
		}
	}

	// Replacing forbidden words with disguises.
	if (replaceProfaneWords) {
		message = maskProfanity(message);
	}

	// Clearing the message of forbidden words
	if (clearMessage) {
		message = cleanString(message);
	}

	return message;
};
