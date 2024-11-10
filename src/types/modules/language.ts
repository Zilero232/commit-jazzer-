import type { CommitFieldsValues } from './commit';

// Define language enum.
export enum LanguageEnum {
	English = 'en',
	Russian = 'ru',
	Spanish = 'es',
}

// Define language values.
export type LanguageValues = `${LanguageEnum}`;

// Define translations json.
export type TranslationsJson = Record<CommitFieldsValues, string>;
