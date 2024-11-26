import { format, transports } from 'winston';
import type { LoggerOptions } from 'winston';

import { LogLevel } from '@/types/modules/winston';

const { colorize, prettyPrint, json, combine, timestamp, printf } = format;

const loggerWinstonConfig: LoggerOptions = {
	level: LogLevel.INFO,
	transports: [
		new transports.Console({
			format: combine(
				colorize({
					level: true,
					message: true,
				}),
				prettyPrint(),
				timestamp({
					format: 'YYYY-MM-DD HH:mm:ss',
				}),
				printf(info => {
					return `${info.timestamp as string} ${info.level}: ${info.message as string}`;
				}),
			),
		}),
		new transports.File({
			filename: 'logger/winston-logger.log',
			format: combine(
				timestamp({
					format: 'YYYY-MM-DD HH:mm:ss',
				}),
				json(),
				printf(({ timestamp, level, message }) => {
					return `${JSON.stringify({ timestamp, level, message })}\n`;
				}),
			),
		}),
	],
};

export default loggerWinstonConfig;
