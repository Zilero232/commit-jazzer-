import { describe, expect, it } from 'vitest';

import { filterProfanity } from './filterProfanity';

describe('filterProfanity', () => {
	it('should return input unchanged if input is empty', () => {
		const result = filterProfanity({ input: '', blocklist: ['badword'] });

		expect(result).toBe('');
	});

	it('should return input unchanged if blocklist is empty', () => {
		const result = filterProfanity({ input: 'This is a test.', blocklist: [] });

		expect(result).toBe('This is a test.');
	});

	it('should return input unchanged if both input and blocklist are empty', () => {
		const result = filterProfanity({ input: '', blocklist: [] });

		expect(result).toBe('');
	});

	it('should handle input without blocklist words', () => {
		const input = 'This is a clean sentence.';
		const blocklist = ['badword', 'evil'];

		const result = filterProfanity({ input, blocklist });

		expect(result).toBe('This is a clean sentence.');
	});
});
