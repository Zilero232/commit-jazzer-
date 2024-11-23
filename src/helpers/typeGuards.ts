/**
 * Checks if given value is string.
 *
 * @param {unknown} value - value to check.
 *
 * @returns {value is string} whether value is string or not.
 */
export const isString = (value: unknown): value is string => {
	return typeof value === 'string';
};

/**
 * Checks if given value is a number and not NaN.
 *
 * @param {unknown} value - value to check.
 *
 * @returns {value is number} whether value is a valid number or not.
 */
export const isNumber = (value: unknown): value is number => {
	return typeof value === 'number' && !Number.isNaN(value);
};

/**
 * Checks if given value is a boolean.
 *
 * @param {unknown} value - value to check.
 *
 * @returns {value is boolean} whether value is a boolean or not.
 */
export const isBoolean = (value: unknown): value is boolean => {
	return typeof value === 'boolean';
};

/**
 * Checks if given value is an array.
 *
 * @param {unknown} value - value to check.
 *
 * @returns {value is T[]} whether value is an array or not.
 *
 * @template T the type of the elements in the array.
 */
export const isArray = <T = unknown>(value: unknown): value is T[] => {
	return Array.isArray(value);
};

/**
 * Checks if given value is an object.
 *
 * @param {unknown} value - value to check.
 *
 * @returns {value is Record<string, unknown>} whether value is an object or not.
 */
export const isObject = (value: unknown): value is Record<string, unknown> => {
	return typeof value === 'object' && !isArray(value);
};

/**
 * Checks if given value is an empty object.
 *
 * @param {unknown} value - value to check.
 *
 * @returns {value is Record<string, unknown>} whether value is an empty object or not.
 */
export const isEmptyObject = (value: unknown): value is Record<string, unknown> => {
	return isObject(value) && Object.keys(value).length === 0;
};
