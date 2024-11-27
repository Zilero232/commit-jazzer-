import type { ShowBannerOptions } from '@/types/modules/banner';

const DEFAULT_CONFIG_BANNER: ShowBannerOptions = {
	bannerText: 'Welcome to Commit Jazzer!',
	figletOptions: {
		font: 'Standard',
		horizontalLayout: 'default',
		verticalLayout: 'default',
		whitespaceBreak: true,
	},
	options: {
		color: 'blue',
		separator: '⭐',
		separatorColor: 'bgGrey',
		footerMessages: [
			{ text: '✨ Like this repo? Give us a star! ⭐ - https://github.com/Zilero232/commit-jazzer 🚀', color: 'green' },
			{ text: '✨ Stay tuned for more updates! ✨', color: 'yellow' },
		],
		footerSeparator: '⭐',
		bottomSpacing: 1,
	},
};

export default DEFAULT_CONFIG_BANNER;
