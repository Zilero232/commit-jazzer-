import { createWordRegex } from '../../helpers';

interface ContainsProfaneWordsProps {
	blocklist: string[];
	input: string;
}

/**
 * Checks if the input string contains any words from the blocklist.
 *
 * @param {ContainsProfaneWordsProps} props - The input properties.
 * @param {string} props.input - The input string to be checked.
 * @param {string[]} props.blocklist - The list of words to check against.
 *
 * @returns {string[]} - An array of blocklist words found in the input string.
 */
export const containsProfaneWords = ({ input, blocklist }: ContainsProfaneWordsProps): Array<string> => {
	// Initialize the array for the bad words found.
	const foundWords: string[] = [];

	if (!input || !blocklist) {
		return foundWords;
	}

	blocklist.forEach((blockedWord: string) => {
		const regex = createWordRegex(blockedWord);

		// If a word is found in input, add it to the array.
		if (regex.test(input)) {
			foundWords.push(blockedWord);
		}
	});

	return foundWords;
};
