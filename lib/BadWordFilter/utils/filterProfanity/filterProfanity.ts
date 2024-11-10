import { maskProfaneWord } from '..';

interface FilterProfanityProps {
	blocklist: string[];
	input: string;
}

/**
 * Replace profane words with a empty symbol.
 *
 * @param {FilterProfanityProps} props - The input properties.
 * @param {string} props.input - The input string to be processed.
 * @param {string[]} props.blocklist - The list of words to be filtered in the input string.
 *
 * @returns {string} - The processed string with profane words filtered.
 */
export const filterProfanity = ({ input, blocklist }: FilterProfanityProps): string => {
	if (!input || !blocklist) {
		return input;
	}

	// Replace profane words with a empty symbol.
	return maskProfaneWord({ input, blocklist, placeholder: '' });
};
