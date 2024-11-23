import { describe, expect, it } from 'vitest';

import { messageFormatter } from './messageFormatter';

describe('messageFormatter', () => {
	it('should return empty string if data is not an object', () => {
		const result = messageFormatter({ template: 'Hello {{name}}', data: null });

		expect(result).toBe('');
	});

	it('should return empty string if data is empty object', () => {
		const result = messageFormatter({ template: 'Hello {{name}}', data: {} });

		expect(result).toBe('');
	});

	it('should return empty string if data is a number', () => {
		const result = messageFormatter({ template: 'Hello {{name}}', data: 42 });

		expect(result).toBe('');
	});

	it('should return formatted message if data is a valid object', () => {
		const result = messageFormatter({
			template: 'Hello, i am {{name}}, {{surname}}. I am {{age}} years old',
			data: { name: 'Alexander', surname: 'Artemev', age: 22 },
		});

		expect(result).toBe('Hello, i am Alexander, Artemev. I am 22 years old');
	});

	it('should use defaultEmptyValue for missing values', () => {
		const result = messageFormatter({
			template: 'Hello, i am {{name}}, {{surname}}. I am {{age}} years old',
			data: { name: 'Alexander', surname: '', age: 22 },
			options: { defaultEmptyValue: 'Unknown', removeEmptyFields: false },
		});

		expect(result).toBe('Hello, i am Alexander, Unknown. I am 22 years old');
	});

	it('should remove empty fields when removeEmptyFields is true', () => {
		const result = messageFormatter({
			template: 'Hello {{name}} {{surname}} {{age}}',
			data: { name: 'Alexander', surname: '', age: null },
			options: { removeEmptyFields: true, trimWhitespace: true },
		});

		expect(result).toBe('Hello Alexander');
	});

	it('should handle complex templates correctly', () => {
		const result = messageFormatter({
			template: 'Hello {{person.name}}, you are {{person.age}} years old and live in {{location.city}}, {{location.country}}.',
			data: { person: { name: 'Alexander', age: 22 }, location: { city: 'Moscow', country: 'Russia' } },
		});

		expect(result).toBe('Hello Alexander, you are 22 years old and live in Moscow, Russia.');
	});
});
