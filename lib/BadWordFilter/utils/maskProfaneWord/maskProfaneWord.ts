import type { BadWordFilterOptions } from '../../types';

import { createWordRegex } from '../../helpers';

interface MaskProfaneWordProps extends Pick<BadWordFilterOptions, 'placeholder'> {
	blocklist: string[];
	input: string;
}

/**
 * Replaces all occurrences of words from the blocklist in the input string with a placeholder.
 *
 * @param {MaskProfaneWordProps} props - The input properties.
 * @param {string} props.input - The input string to be processed.
 * @param {string[]} props.blocklist - The list of words to be masked in the input string.
 * @param {string} props.placeholder - The string used to replace each character of a blocklist word.
 *
 * @returns {string} - The processed string with blocklist words masked.
 */
export const maskProfaneWord = ({ input, blocklist, placeholder }: MaskProfaneWordProps): string => {
	if (!input || !blocklist || !placeholder) {
		return input;
	}

	blocklist.forEach((badWord: string) => {
		const regex = createWordRegex(badWord);

		input = input.replace(regex, placeholder.repeat(badWord.length));
	});

	return input;
};
