import { describe, expect, it } from 'vitest';

import { maskProfaneWord } from './maskProfaneWord';

describe('maskProfaneWord', () => {
	it('should return input unchanged if input is empty', () => {
		const result = maskProfaneWord({ input: '', blocklist: ['badword'], placeholder: '*' });

		expect(result).toBe('');
	});

	it('should return input unchanged if blocklist is empty', () => {
		const result = maskProfaneWord({ input: 'This is a test.', blocklist: [], placeholder: '*' });

		expect(result).toBe('This is a test.');
	});

	it('should return input unchanged if placeholder is empty', () => {
		const result = maskProfaneWord({ input: 'This is a badword.', blocklist: ['badword'], placeholder: '' });

		expect(result).toBe('This is a badword.');
	});

	it('should replace words from blocklist with placeholders', () => {
		const input = 'This is a badword and anotherbadword.';
		const blocklist = ['badword', 'anotherbadword'];
		const placeholder = '*';

		const result = maskProfaneWord({ input, blocklist, placeholder });

		expect(result).toBe('This is a ******* and **************.');
	});

	it('should replace words from blocklist with placeholder, respecting word length', () => {
		const input = 'This is a badword and longword.';
		const blocklist = ['badword', 'longword'];
		const placeholder = '#';

		const result = maskProfaneWord({ input, blocklist, placeholder });

		expect(result).toBe('This is a ####### and ########.');
	});

	it('should work with multiple occurrences of the same word', () => {
		const input = 'badword badword badword';
		const blocklist = ['badword'];
		const placeholder = '-';

		const result = maskProfaneWord({ input, blocklist, placeholder });

		expect(result).toBe('------- ------- -------');
	});

	it('should handle input with special characters and spaces correctly', () => {
		const input = 'This is a badword! What about anotherbadword?';
		const blocklist = ['badword', 'anotherbadword'];
		const placeholder = '*';

		const result = maskProfaneWord({ input, blocklist, placeholder });

		expect(result).toBe('This is a *******! What about **************?');
	});
});
