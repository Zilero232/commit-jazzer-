// Define BadWordFilter options.
export interface BadWordFilterOptions {
	/**
	 * List of bad words to block.
	 *
	 * @default ["fuck"]
	 */
	additionalBlockWords?: string[];

	/**
	 * A list of words that do not need to be blocked, even if they are in the blocklist.
	 *
	 * @default ["fool"]
	 */
	excludedWords?: string[];

	/**
	 * A character or string that replaces bad words.
	 *
	 * @default "*"
	 */
	placeholder?: string;

	/**
	 * Redefine the list of bad words.
	 *
	 * @default false
	 */
	overrideBlockWords?: boolean;
}
