# commit-jazzer 🎶💥

<p align="center">
	<a href="https://github.com/Zilero232/commit-jazzer">
    	<img src="https://img.shields.io/github/actions/workflow/status/Zilero232/commit-jazzer/integrate.yaml?label=CI&logo=GitHub" alt="CI status">
  	</a>
	<a href="https://www.npmjs.com/package/commit-jazzer">
    	<img src="https://img.shields.io/npm/dm/commit-jazzer?logo=NPM" alt="npm downloads">
  	</a>
	<a href="https://github.com/Zilero232/cli">
    	<img src="https://img.shields.io/npm/l/cz-vinyl" alt="npm license">
  	</a>
	<a href="https://github.com/Zilero232/commit-jazzer">
    	<img src="https://img.shields.io/npm/v/commit-jazzer?label=version" alt="version">
  	</a>
</p>

🎸 Add style and rhythm to your commits! With commit-jazzer, every commit becomes more than just a message—it's a true masterpiece. Follow best practices and format your messages with emojis that add fun and professionalism to your development process.

## Description

`commit-jazzer` is a tool that brings style and a musical vibe to your Git commits. Built on the idea of Commitizen, it helps you format commit messages using conventions and add engaging emojis. Instead of simply writing text messages, you'll be able to choose commit types and descriptions, turning the process into something more than just adhering to standards.

Jazzer is a reference to jazz music, where it's not just about structure, but also improvisation and creativity. With commit-jazzer, your commits become as dynamic as a musical composition.

## Features

- 🎶 **Musical commit messages**: Format your commits with emojis like 🎸, 🐛, 💄, and more.
- ⚡ **Quick setup**: Easy installation and integration into your project.
- 🎼 **Commit types**: Choose from predefined types and descriptions that align with commit conventions.
- 🛠 **Bad word handling**: commit-jazzer automatically handles undesirable words in commit messages and helps you avoid inappropriate expressions.
- 🔧 **Configuration flexibility**: You can create your own configuration files and type schemes for commits.

## Installation

### Globally

To install `commit-jazzer` globally, run the following command:

```bash
npm install --global commit-jazzer
```

### Locally

To install `commit-jazzer` as a development dependency, run::

```bash
npm install --save-dev commit-jazzer
```

Then, add this configuration to your `package.json`:

```json
"config": {
  "commitizen": {
    "path": "commit-jazzer"
  }
}
```

### Usage

After installation, simply run:

```bash
git cz
```

### Set it as the default adapter for your projects:

To set `commit-jazzer` as the default adapter for your projects, run the following command:

```bash
echo '{ "path": "commit-jazzer" }' > ~/.czrc
```

## Bad Word Handling

`commit-jazzer` includes checking for inappropriate words in commit messages. You can configure a list of banned words and set up filtering to maintain code quality standards.

### Configuration options for bad words:

- **checkHasProfaneWords**: Enables the check for profane words in commit messages. Default is `true`.
- **clearMessage**: Automatically clears profane words from the message. Default is `true`.
- **replaceProfaneWords**: Replaces profane words with a placeholder (default is `*`). Default is `true`.
- **additionalBlockWords**: A list of additional words to block.
- **excludedWords**: Words that will not be blocked even if they appear in the blocklist.
- **placeholder**: The character or string used to replace profane words.
- **overrideBlockWords**: Redefine the list of bad words. Default is `false`.

## Contributing

We'd love for you to contribute to `commit-jazzer`! Whether it's reporting bugs, suggesting features, or submitting pull requests, your help is always appreciated.

### How to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

Please make sure to follow the [Code of Conduct](#code-of-conduct) and adhere to the project's style guide.

## Code of Conduct

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md) when participating in this project to ensure a welcoming and productive atmosphere.

## License

License
commit-jazzer is licensed under the MIT License.

Be part of the musical process! 🎶
Add some rhythm and style to your commits with commit-jazzer and turn your workflow into a masterpiece! 🎸
