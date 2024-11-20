import DEFAULT_COMMIT_TYPES from '@/constants/emojiCommit';

import type { CommitJazzerPrompterOptions } from '../types';

/**
 * Filters the default commit types based on the provided available commit types.
 *
 * @param availableCommitTypes - An array of commit action names to filter the default commit types.
 *
 * @returns An array of commit types that match the provided available commit types, or all default commit types if none are provided.
 */
const filterCommitTypes = (availableCommitTypes: CommitJazzerPrompterOptions['availableCommitTypes'] = []) => {
	if (availableCommitTypes.length === 0) {
		return DEFAULT_COMMIT_TYPES;
	}

	return DEFAULT_COMMIT_TYPES.filter((commitType) => {
		if (!commitType.name) {
			return false;
		}

		return availableCommitTypes.includes(commitType.name);
	});
};

export default filterCommitTypes;
