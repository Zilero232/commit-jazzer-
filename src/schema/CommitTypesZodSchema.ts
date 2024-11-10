import { z } from 'zod';
import type { ZodType } from 'zod';

import { ZCommitActionType } from './modules/ZodEnums';

import type { CommitJazzerPrompterOptions } from '../types';

const CommitTypesZodSchema: ZodType<CommitJazzerPrompterOptions['commitTypes']> = z
	.record(
		ZCommitActionType,
		z.object({
			name: z.string(),
			emoji: z.string(),
			code: z.string(),
			description: z.string(),
		}),
	)
	.optional();

export default CommitTypesZodSchema;
