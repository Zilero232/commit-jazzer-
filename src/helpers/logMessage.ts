import { createLogger } from 'winston';

import { LogLevel, type LogLevelValues } from '@/types/modules/winston';

import loggerWinstonConfig from '@/config/loggerWinstonConfig';

interface LogMessageProps {
	level?: LogLevelValues;
	message: string;
}

/**
 * Logs a message with a given level.
 *
 * @param {LogMessageProps} props - Props to log a message.
 * @param {LogLevelValues} [props.level] - The level of the message.
 * @param {string} props.message - The message to log.
 */
const logMessage = ({ level = LogLevel.INFO, message }: LogMessageProps) => {
	const logger = createLogger(loggerWinstonConfig);

	logger.log(level, message);
};

export default logMessage;
