import { describe, expect, it } from 'vitest';

import { containsProfaneWords } from './containsProfaneWords';

describe('containsProfaneWords', () => {
	it('should return an empty array if input is empty', () => {
		const result = containsProfaneWords({ input: '', blocklist: ['badword', 'evil'] });

		expect(result).toEqual([]);
	});

	it('should return an empty array if blocklist is empty', () => {
		const result = containsProfaneWords({ input: 'This is a test string', blocklist: [] });

		expect(result).toEqual([]);
	});

	it('should return the found blocked words', () => {
		const result = containsProfaneWords({ input: 'This is a badword and evil', blocklist: ['badword', 'evil'] });

		expect(result).toEqual(['badword', 'evil']);
	});

	it('should return an empty array if no blocked words are found', () => {
		const result = containsProfaneWords({ input: 'This is a clean sentence', blocklist: ['badword', 'evil'] });

		expect(result).toEqual([]);
	});

	it('should detect blocked words regardless of case', () => {
		const result = containsProfaneWords({ input: 'This is a BadWord and Evil', blocklist: ['badword', 'evil'] });

		expect(result).toEqual(['badword', 'evil']);
	});

	it('should not detect partial matches when the word is not whole', () => {
		const result = containsProfaneWords({ input: 'Thiswordisbad', blocklist: ['word'] });

		expect(result).toEqual([]);
	});

	it('should return the correct words if blocklist contains more than one word', () => {
		const result = containsProfaneWords({ input: 'This is evil and badword', blocklist: ['evil', 'badword', 'curse'] });

		expect(result).toEqual(['evil', 'badword']);
	});
});
