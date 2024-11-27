const config = {
	// Specifies that the release will occur on the 'main' branch
	branches: ['main'],

	// The repository URL for the project
	repositoryUrl: 'git+https://github.com/Zilero232/commit-jazzer',

	plugins: [
		[
			'@semantic-release/commit-analyzer',
			{
				// Use the Angular preset for commit message analysis
				preset: 'angular',

				// Rules for commit types, defining which commit type will trigger which version bump
				releaseRules: [
					// A 'breaking' commit triggers a major version release (used for breaking changes)
					{ type: 'breaking', release: 'major' },

					// A 'feat' (feature) commit triggers a minor version release
					{ type: 'feat', release: 'minor' },

					// A 'fix' (bug fix) commit triggers a patch version release
					{ type: 'fix', release: 'patch' },

					// A 'perf' (performance improvement) commit triggers a patch version release
					{ type: 'perf', release: 'patch' },

					// A 'refactor' commit triggers a patch version release (for code refactoring that doesn't affect functionality)
					{ type: 'refactor', release: 'patch' },

					// A 'docs' commit triggers a patch version release (for documentation changes)
					{ type: 'docs', release: 'patch' },

					// A 'style' commit triggers a patch version release (for style changes, like CSS updates)
					{ type: 'style', release: 'patch' },

					// A 'build' commit triggers a patch version release (for build-related changes)
					{ type: 'build', release: 'patch' },

					// A 'ci' commit triggers a patch version release (for CI/CD pipeline changes)
					{ type: 'ci', release: 'patch' },

					// A 'security' commit triggers a patch version release (for security fixes)
					{ type: 'security', release: 'patch' },

					// A 'chore' commit triggers a patch version release (for minor tasks like updating dependencies)
					{ type: 'chore', release: 'patch' },

					// An 'init' commit triggers a patch version release (for initial project setup)
					{ type: 'init', release: 'patch' },
				],
			},
		],

		// Plugin for generating release notes based on commit messages.
		'@semantic-release/release-notes-generator',

		// Plugin for updating the changelog file based on the release notes.
		'@semantic-release/changelog',

		// Plugin for publishing the package to npm.
		'@semantic-release/npm',

		// Plugin for committing changes made by Semantic Release (like changelog updates) back to the repository.
		'@semantic-release/git',

		// Plugin for creating GitHub releases and notifying GitHub of the release.
		'@semantic-release/github',
	],
};

// Export the configuration to be used by Semantic Release
module.exports = config;
