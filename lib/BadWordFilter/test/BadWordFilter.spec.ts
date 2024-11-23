import { beforeEach, describe, expect, it, vi } from 'vitest';

import { containsProfaneWords, filterProfanity, maskProfaneWord } from '../utils';

import BadWordFilter from '../index';

vi.mock('../constants/badWords', () => ({
	default: ['badword1', 'badword2', 'evilword'],
}));

vi.mock('../utils', () => ({
	containsProfaneWords: vi.fn(),
	filterProfanity: vi.fn(),
	maskProfaneWord: vi.fn(),
}));

describe('BadWordFilter', () => {
	let filter: ReturnType<typeof BadWordFilter>;

	beforeEach(() => {
		filter = BadWordFilter({
			additionalBlockWords: ['custombadword'],
			excludedWords: ['goodword'],
			placeholder: '#',
			overrideBlockWords: false,
		});
	});

	it('should initialize with provided parameters', () => {
		expect(filter.getBlockWords()).toEqual(['custombadword', 'badword1', 'badword2', 'evilword']);
		expect(filter.getExcludedWords()).toEqual(['goodword']);
		expect(filter.getBaseList()).toEqual(['badword1', 'badword2', 'evilword']);
	});

	it('should call containsProfaneWords with the correct parameters', () => {
		const input = 'This is a badword1 and another evilword!';

		vi.mocked(containsProfaneWords).mockReturnValue(['badword1', 'evilword']);

		const result = filter.hasProfaneWords(input);

		expect(containsProfaneWords).toHaveBeenCalledWith({
			input,
			blocklist: ['custombadword', 'badword1', 'badword2', 'evilword'],
		});

		expect(result).toEqual(['badword1', 'evilword']);
	});

	it('should call maskProfaneWord with the correct parameters', () => {
		const input = 'This is a badword1 and another evilword!';

		vi.mocked(maskProfaneWord).mockReturnValue('This is a ###### and another ########!');

		const result = filter.maskProfanity(input);

		expect(maskProfaneWord).toHaveBeenCalledWith({
			input,
			placeholder: '#',
			blocklist: ['custombadword', 'badword1', 'badword2', 'evilword'],
		});

		expect(result).toBe('This is a ###### and another ########!');
	});

	it('should call filterProfanity with the correct parameters', () => {
		const input = 'This is a badword1 and another evilword!';

		vi.mocked(filterProfanity).mockReturnValue('This is a ***** and another *******!');

		const result = filter.cleanString(input);

		expect(filterProfanity).toHaveBeenCalledWith({
			input,
			blocklist: ['custombadword', 'badword1', 'badword2', 'evilword'],
		});

		expect(result).toBe('This is a ***** and another *******!');
	});

	it('should correctly handle the overrideBlockWords flag', () => {
		const customFilter = BadWordFilter({
			additionalBlockWords: ['custombadword'],
			excludedWords: [],
			placeholder: '#',
			overrideBlockWords: true,
		});

		expect(customFilter.getBlockWords()).toEqual(['custombadword']);
	});

	it('should return an empty array when no bad words are found in the input', () => {
		const input = 'This is a clean sentence without any bad words.';

		vi.mocked(containsProfaneWords).mockReturnValue([]);

		const result = filter.hasProfaneWords(input);

		expect(result).toEqual([]);
	});

	it('should replace profane words with placeholder correctly', () => {
		const input = 'This is a badword1 and another evilword!';

		vi.mocked(maskProfaneWord).mockReturnValue('This is a ###### and another ########!');

		const result = filter.maskProfanity(input);

		expect(result).toBe('This is a ###### and another ########!');
	});
});
