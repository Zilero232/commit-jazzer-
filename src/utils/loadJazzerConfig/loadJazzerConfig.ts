import process from 'node:process';
import { cosmiconfig } from 'cosmiconfig';

import CommitJazzerPrompterOptionsZodSchema from '@/schema/JazzerZodSchema';

import generateErrorReport from '@/helpers/generateErrorReport';
import { isObject } from '@/helpers/typeGuards';

import { CONFIG_FILE_NAMES, COSMICONFIG_MODULE_NAME } from '@/constants/index';

import DEFAULT_CONFIGURATION from '@/config/defaultConfiguration';

import type { CommitJazzerPrompterOptions } from '@/types/index';

/**
 * Loads the configuration for the CommitJazzerPrompter.
 *
 * The function returns a promise that resolves to either the loaded configuration or null if the configuration is invalid.
 *
 * The configuration is loaded using the `cosmiconfig` package, which searches for configuration files in the following order:
 * - `.jazzer-cz.json`
 * - `jazzer-cz.json`
 * - `jazzer-cz.js`
 *
 * The function returns the merged configuration with the default configuration.
 */
export const loadJazzerConfig = async (): Promise<CommitJazzerPrompterOptions> => {
	try {
		const explorer = cosmiconfig(COSMICONFIG_MODULE_NAME, {
			cache: true,
			searchPlaces: CONFIG_FILE_NAMES,
		});

		const foundedFile = await explorer.search();

		if (!foundedFile || foundedFile.isEmpty || !isObject(foundedFile)) {
			console.warn('[ConfigLoader] No valid configuration file found. Using default configuration.');

			return DEFAULT_CONFIGURATION;
		}

		const config: unknown = foundedFile.config;

		// Check the validity of the configuration using ZOD.
		const parseResult = await CommitJazzerPrompterOptionsZodSchema.safeParseAsync(config);

		// If the configuration is not valid, we print an error message and exit the process.
		if (!parseResult.success) {
			const errorMessage = generateErrorReport({
				issues: parseResult.error.issues,
			});

			console.error(errorMessage);

			process.exit(1);
		}

		const data = parseResult.data as CommitJazzerPrompterOptions;

		// If the configuration is valid, we merge it with the default configuration.
		return {
			...DEFAULT_CONFIGURATION,
			...data,
		};
	} catch (error: unknown) {
		console.error(`[ConfigLoader] Unexpected error while loading configuration: ${(error as Error).message}`);

		process.exit(1);
	}
};
