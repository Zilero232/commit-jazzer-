import { CommitFieldsEnum, CommitFieldsValues } from './commit';

// Define prompt question types.
export enum PromptQuestionTypeEnum {
	Autocomplete = 'autocomplete',
	MaxLengthInput = 'maxlength-input',
}

// Define prompt question type values.
export type PromptQuestionTypeValues = `${PromptQuestionTypeEnum}`;

// Define base interface question.
export interface BaseInterfaceQuestion {
	/**
	 * Question message.
	 *
	 * @default "For example message"
	 */
	message?: string;

	/**
	 * Question options.
	 *
	 * @default {}
	 */
	options?: PromptQuestionOptions;
}

export interface PromptQuestionOptions {
	/**
	 * Required question.
	 *
	 * @default boolean
	 */
	required?: boolean;

	/**
	 * Skip question.
	 *
	 * @default boolean
	 */
	skip?: boolean;

	/**
	 * Validation options.
	 *
	 * @default {}
	 */
	validations?: {
		length?: {
			/**
			 * Minimum message length.
			 *
			 * @default 0
			 */
			minMessageLength?: number;

			/**
			 * Maximum message length.
			 *
			 * @default 70
			 */
			maxMessageLength?: number;
		};
	};
}

// Define prompt question.
export interface BaseQuestionsOptions extends BaseInterfaceQuestion {
	/**
	 * Question key.
	 *
	 * @default "type"
	 */
	key: CommitFieldsValues;
}

// Define prompt questions.
export interface PromptQuestions extends BaseInterfaceQuestion {
	/**
	 * Question type.
	 *
	 * @default "input"
	 */
	type: PromptQuestionTypeValues | string;

	/**
	 * Question key.
	 *
	 * @default "random"
	 */
	key: CommitFieldsValues | string;
}

// Исключаем ActionType из CommitFieldsEnum
type CommitFieldsWithoutActionType = Exclude<CommitFieldsValues, 'type'>;

// Define prompt answers type.
export type PromptAnswers = {
	readonly [key in CommitFieldsWithoutActionType]?: string;
	readonly [CommitFieldsEnum.ActionType]?: number;
}
