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

> **Commitizen adapter** for formatting commit messages with style and rhythm. 🎸🎤

🎸 Add style and rhythm to your commits! With commit-jazzer, every commit becomes more than just a message—it's a true masterpiece. Follow best practices and format your messages with emojis that add fun and professionalism to your development process.

## Table of Contents

1. [🎥 Demo](#demo)
2. [🔍 Description](#description)
3. [⚡ Features](#features)
4. [💻 Installation and Usage](#installation-and-usage)
5. [⚙️ Configuration](#configuration)
6. [🤝 Contributing](#contributing)
7. [📜 Code of Conduct](#code-of-conduct)
8. [🔒 Security Policy](#security-policy)
9. [👥 Team](#team)
10. [📄 License](#license)

## 🎥 Demo {#demo}

![commit-jazzer](public/commit-demo.gif)

## 🔍 Description {#description}

**`commit-jazzer`** is a tool that introduces a touch of musical flair into your Git commit messages. Built on the solid foundation of Commitizen, it allows you to follow commit conventions and spice up your messages with emojis. Instead of just typing standard commit texts, you'll choose commit types, write descriptions, and—just like in jazz—improvise to create a symphony of commits.

🎷 **Jazz your commits**: It's not just about structure—it's about creativity. Transform your commits into something dynamic, creative, and fun!

## ⚡ Features {#description}

- 🎶 **Musical Commit Messages**: Format your commits with delightful emojis like 🎸, 🐛, 💄, and more.
- ⚡ **Quick Setup**: Easy installation and integration into your project.
- 🎼 **Predefined Commit Types**: Choose from predefined types and descriptions to maintain consistency.
- 🛠 **Bad Word Handling**: Automatically handles undesirable words in commit messages and helps you avoid inappropriate expressions.
- 🔧 **Flexible Configuration**: Customize commit templates and type schemes for a personal touch.

## 💻 Installation and Usage {#installation-and-usage}

### Globally

Install `commitizen` globally, if you have not already.

```sh
npm install commitizen -g
```

Install your preferred `commitizen` adapter globally (for example [`commit-jazzer`](https://www.npmjs.com/package/commit-jazzer)).

```sh
npm install commit-jazzer -g
```

Create a `.czrc` file in your `home` directory, with `path` referring to the preferred, globally-installed, `commitizen` adapter

```sh
echo '{ "path": "commit-jazzer" }' > ~/.czrc
```

You are all set! Now `cd` into any `git` repository and use `git cz` and you will find the `commit-jazzer` prompt.

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

After installation, simply run:

```bash
git cz
```

## ⚙️ Configuration {#configuration}

### Configuration Types Support

These configuration files is used to customize the behavior of commit-jazzer without modifying the source code.

`commit-jazzer` supports three languages JavaScript, TypeScript and JSON for configuration.

#### TypeScript

```typescript
import type { CommitJazzerPrompterOptions } from 'commit-jazzer';

const CommitJazzerConfig: CommitJazzerPrompterOptions = {
  language: 'en',
  template: '{{type}}: {{emoji}} - {{title}}',
  availableCommitTypes: ['init', 'fix', 'refactor'],
  availablePromptQuestions: ['type', 'title']
};

export default CommitJazzerConfig;
```

#### JavaScript

```javascript
/** @type {import('commit-jazzer').CommitJazzerPrompterOptions} */

const CommitJazzerConfig = {
  language: 'en',
  template: '{{type}}: {{emoji}} - {{title}}',
  availableCommitTypes: ['init', 'fix', 'refactor'],
  availablePromptQuestions: ['type', 'title']
};

export default CommitJazzerConfig;
```

### Example Configuration File

```json
{
  "$schema": "https://zilero232.github.io/commit-jazzer/commit-jazzer-schema.json",
  "language": "en",
  "template": "{{type}}: {{emoji}} - {{title}}",
  "availableCommitTypes": ["init", "fix", "refactor"],
  "availablePromptQuestions": ["type", "title"],
  "baseCommitTypes": {
    "init": {
      "description": "Custom deploying message"
    }
  },
  "addCustomCommitTypes": {
    "custom": {
      "emoji": "🚀",
      "code": ":rocket:",
      "description": "Deploying application"
    }
  },
  "baseQuestionsOptions": [
    {
      "key": "title",
      "message": "My custom message",
      "options": {
        "required": true,
        "skip": false,
        "validations": {
          "length": {
            "minMessageLength": 0,
            "maxMessageLength": 200
          }
        }
      }
    }
  ],
  "validateCommitBadWords": true,
  "badWordsOptions": {
    "checkHasProfaneWords": true,
    "clearMessage": true,
    "replaceProfaneWords": true,
    "options": {
      "additionalBlockWords": ["bogdan", "oleg", "nikita"],
      "excludedWords": ["fool"],
      "placeholder": "*",
      "overrideBlockWords": false
    }
  },
  "showBanner": true,
  "showBannerOptions": {
    "bannerText": "Look, I can change the name."
  }
}
```

## 🤝 Contributing {#contributing}

We'd love for you to contribute to `commit-jazzer`! Whether it's reporting bugs, suggesting features, or submitting pull requests, your help is always appreciated.

### How to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

## 📜 Code of Conduct {#code-of-conduct}

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md) when participating in this project to ensure a welcoming and productive atmosphere.

## 🔒 Security Policy {#security-policy}

Security is our priority. If you encounter any issues, please read our full [Security Policy](SECURITY.md) to report vulnerabilities safely and responsibly.

## 👥 Team {#team}

These folks keep the project moving and are resources for help.

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="11%">
        <a href="https://career.habr.com/zilero">
          <img src="https://avatars.githubusercontent.com/u/68345676?s=400&u=eb7df22c29a8aca48def78ec54a7526601c9fd8f&v=4" width="100" height="100" alt="Artemev Alexandr - Avatar">
          <br />
          Artemev A. A.
        </a>
      </td>
    </tr>
  </tbody>
</table>

## 📄 License {#license}

License commit-jazzer is licensed under the [MIT License](LICENSE).

Be part of the musical process! 🎶
Add some rhythm and style to your commits with commit-jazzer and turn your workflow into a masterpiece! 🎸
