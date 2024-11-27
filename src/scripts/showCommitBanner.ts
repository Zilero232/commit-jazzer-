import figlet from 'figlet';
import chalk from 'chalk';

import type { ShowBannerOptions } from '@/types/modules/banner';
import DEFAULT_CONFIG_BANNER from '@/config/defaultConfigBanner';

/**
 * Shows a formatted banner with the given options.
 *
 * @param {ShowBannerOptions} [options] - The options for the banner.
 * @param {string} [options.bannerText] - The text to be displayed in the banner.
 * @param {import('figlet').Options} [options.figletOptions] - The options for figlet.
 * @param {string} [options.color] - The color of the banner text.
 * @param {string} [options.separator] - The separator to be used.
 * @param {string} [options.separatorColor] - The color of the separator.
 * @param {Array<{ text: string; color?: string }>} [options.footerMessages] - The footer messages to be displayed.
 * @param {string} [options.footerSeparator] - The separator to be used for the footer messages.
 */
const showBanner = async ({ bannerText = '', figletOptions, options = {} }: ShowBannerOptions = DEFAULT_CONFIG_BANNER): Promise<void> => {
	const { color = 'white', separator = '*', separatorColor = 'bgGray', footerMessages = [], footerSeparator = '*', bottomSpacing = 1 } = options;

	// Calculate the maximum footer message length to determine the appropriate width for the figlet banner.
	const maxFooterLength = footerMessages.reduce((maxLength, message) => {
		return Math.max(maxLength, message.text.length);
	}, 0);

	return new Promise<void>((resolve, reject) => {
		figlet.text(bannerText, figletOptions, function (error: Error | null, data?: string) {
			if (error) {
				return reject(console.error(chalk.red('Something went wrong while generating the banner.'), error));
			}

			// Generate the separator with custom color.
			const separatorChalk = chalk[separatorColor](separator.repeat(maxFooterLength));

			// Output the generated banner with custom color.
			const banner = chalk[color](data);

			// Show the banner.
			console.log(banner);

			// Show the separator.
			console.log(separatorChalk);

			// Output the footer messages with their respective colors.
			footerMessages.forEach(message => {
				const footerMessage = chalk[message.color || 'white'](message.text);

				console.log(footerMessage);
			});

			// Footer separator.
			const footerSeparatorChalk = chalk[separatorColor](footerSeparator.repeat(maxFooterLength));

			// End separator.
			console.log(footerSeparatorChalk);

			// Add bottom spacing (optional empty lines).
			for (let i = 0; i < bottomSpacing; i++) {
				console.log(); // Outputs a blank line for spacing.
			}

			// Resolve the promise after the banner has been displayed.
			resolve();
		});
	});
};

export default showBanner;
