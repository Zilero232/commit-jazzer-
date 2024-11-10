// Define BadWordFilter options.
export interface BadWordFilterOptions {
	additionalBlockWords?: string[]; // List of bad words to block.
	excludedWords?: string[]; // A list of words that do not need to be blocked, even if they are in the blocklist.
	placeholder?: string; // A character or string that replaces bad words.
	overrideBlockWords?: boolean; // Redefine the list of bad words.
}
