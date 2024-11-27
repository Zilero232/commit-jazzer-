import type * as chalk from 'chalk';

// Define types color.
export type Color = typeof chalk.Color;

// Define show banner options.
export interface ShowBannerOptions {
	bannerText: string;
	figletOptions?: figlet.Options;
	options?: {
		color?: Color;
		separator?: string;
		separatorColor?: Color;
		footerMessages?: { text: string; color?: Color }[];
		footerSeparator?: string;
		bottomSpacing?: number;
	};
}
