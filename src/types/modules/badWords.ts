import type { BadWordFilterOptions } from '../../../lib/BadWordFilter/types';

// Define bad words options.
export interface BadWordsOptions {
	/**
	 * Check has profane words in the message.
	 *
	 * @default true
	 */
	checkHasProfaneWords?: boolean;

	/**
	 * Clear message from profane words.
	 *
	 * @default true
	 */
	clearMessage?: boolean;

	/**
	 * Replace profane words in the message on placeholder.
	 *
	 * @default true
	 */
	replaceProfaneWords?: boolean;

	/**
	 * Bad words validation options.
	 *
	 * @default {}
	 */
	options?: BadWordFilterOptions;
}
