import { LogLevel } from '@/types/modules/winston';

import logMessage from '@/helpers/logMessage';

import { PLUGIN_NAME } from '.';

const LOG_MESSAGES = {
	GENERIC_INFO: (message: string) =>
		logMessage({
			level: LogLevel.INFO,
			message: `[${PLUGIN_NAME}] - ${message}`,
		}),
	GENERIC_WARN: (message: string) =>
		logMessage({
			level: LogLevel.WARN,
			message: `[${PLUGIN_NAME}] - ${message}`,
		}),
	GENERIC_ERROR: (message: string) =>
		logMessage({
			level: LogLevel.ERROR,
			message: `[${PLUGIN_NAME}] - ${message}`,
		}),
	CONFIG_LOADER_WARN: () =>
		logMessage({
			level: LogLevel.WARN,
			message: `[${PLUGIN_NAME}] - [ConfigLoader] No valid configuration file found. Using default configuration.`,
		}),
	CONFIG_LOADER_ERROR: (error: Error) =>
		logMessage({
			level: LogLevel.ERROR,
			message: `[${PLUGIN_NAME}] - Unexpected error while loading configuration: ${error.message}.`,
		}),
	PROHIBITED_WORDS_ERROR: (foundBadWords: string[]) =>
		logMessage({
			level: LogLevel.ERROR,
			message: `[${PLUGIN_NAME}] - Input contains prohibited words: ${foundBadWords.join(', ')}. Please remove them.`,
		}),
};

export default LOG_MESSAGES;
