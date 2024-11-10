import type { CommitFieldsValues } from './commit';

// Define prompt question types.
export enum PromptQuestionTypeEnum {
	List = 'list',
	Rawlist = 'rawlist',
	Expand = 'expand',
	Checkbox = 'checkbox',
	Confirm = 'confirm',
	Input = 'input',
	Number = 'number',
	Editor = 'editor',
	Toggle = 'toggle',
	Password = 'password',
	Autocomplete = 'autocomplete',
	MaxLengthInput = 'maxlength-input',
}

// Define prompt question type values.
export type PromptQuestionTypeValues = `${PromptQuestionTypeEnum}`;

// Define bad words validation options.
export interface BadWordsValidationOptions {
	clean?: boolean;
	additionalWords?: string[];
	excludedWords?: string[];
}

export interface PromptQuestionOptions {
	required?: boolean;
	skip?: boolean;
	validations?: {
		length?: {
			minMessageLength?: number;
			maxMessageLength?: number;
		};
	};
	filter?: (input: string) => string;
}

// Define prompt question.
export interface PromptQuestion {
	type: PromptQuestionTypeValues;
	key: CommitFieldsValues;
	message: string;
	options?: PromptQuestionOptions;
}

// Define prompt answers type.
export type PromptAnswers = Record<CommitFieldsValues, string>;
