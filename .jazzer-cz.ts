import type { CommitJazzerPrompterOptions } from './src/types';

const CommitJazzerConfig: CommitJazzerPrompterOptions = {
	language: 'en',
	availableCommitTypes: ['init', 'feat', 'fix', 'refactor', 'docs', 'remove', 'test', 'breaking'],
	availablePromptQuestions: ['type', 'title'],
	baseQuestionsOptions: [
		{
			key: 'title',
			options: {
				validations: {
					length: {
						minMessageLength: 0,
						maxMessageLength: 200,
					},
				},
			},
		},
	],
	baseCommitTypes: {
		init: {
			description: 'Custom deploying message',
		},
	},
	addCustomCommitTypes: {
		custom: {
			emoji: '🚀',
			code: ':rocket:',
			description: 'Deploying application',
		},
	},
	badWordsOptions: {
		clearMessage: true,
		options: {
			additionalBlockWords: ['bogdan', 'dasdasd', 'asdadas'],
			overrideBlockWords: true,
			excludedWords: ['fool'],
		},
	},
	showBanner: true,
	showBannerOptions: {
		bannerText: 'Look, I can change the name.',
	},
};

export default CommitJazzerConfig;
