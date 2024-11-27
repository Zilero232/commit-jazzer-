import DEFAULT_COMMIT_TYPES from '@/constants/emojiCommit';

import type { CommitJazzerPrompterOptions } from '../types';

interface FilterCommitTypes {
	availableCommitTypes?: CommitJazzerPrompterOptions['availableCommitTypes'];
	baseCommitTypes?: CommitJazzerPrompterOptions['baseCommitTypes'];
	addCustomCommitTypes?: CommitJazzerPrompterOptions['addCustomCommitTypes'];
}

/**
 * Filters and customizes commit types based on provided options.
 *
 * @param {object} options - The options for filtering commit types.
 * @param {string[]} [options.availableCommitTypes] - A list of commit types that are available.
 * @param {object} [options.baseCommitTypes] - An object containing base commit types to apply modifications from.
 * @param {object} [options.addCustomCommitTypes] - An object containing custom commit types to be added.
 *
 * @returns {Array} - The filtered and customized list of commit types, including any default, modified, and custom commit types.
 */
const filterCommitTypes = ({ availableCommitTypes = [], baseCommitTypes = {}, addCustomCommitTypes = {} }: FilterCommitTypes) => {
	// Фильтруем стандартные типы коммитов на основе доступных commitTypes
	let filteredCommitTypes = DEFAULT_COMMIT_TYPES;

	// Если availableCommitTypes не пустой, фильтруем итоговый список по доступным типам
	if (availableCommitTypes.length > 0) {
		filteredCommitTypes = filteredCommitTypes.filter(commitType => {
			if (!commitType.name) {
				return false;
			}

			return availableCommitTypes.includes(commitType.name);
		});
	}

	// Применяем изменения из baseCommitTypes
	filteredCommitTypes = filteredCommitTypes.map(commitType => {
		const baseCommitType = baseCommitTypes[commitType.name as keyof typeof baseCommitTypes];

		if (baseCommitType) {
			return {
				...commitType,
				...baseCommitType,
			};
		}

		return commitType;
	});

	// Добавляем кастомные типы из addCustomCommitTypes
	const customCommitTypes = Object.keys(addCustomCommitTypes).map(key => ({
		name: key,
		...addCustomCommitTypes[key],
	}));

	// Объединяем стандартные типы и кастомные
	filteredCommitTypes = [...filteredCommitTypes, ...customCommitTypes];

	return filteredCommitTypes;
};

export default filterCommitTypes;
