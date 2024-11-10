/**
 * Creates a regular expression for matching a word in a string, ignoring case.
 *
 * @param {string} word - The word to create the regex for.
 *
 * @returns {RegExp} A regular expression that will match the word in a string,
 * ignoring case, and using word boundaries so that only complete words are matched.
 */
export const createWordRegex = (word: string): RegExp => {
	return new RegExp(`\\b${word.replace(/(\W)/g, '\\$1')}\\b`, 'gi');
};
