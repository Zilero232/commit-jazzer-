import { z } from 'zod';
import type { ZodType } from 'zod';

import { ZCommitActionType } from './modules/ZodEnums';

import type { CommitJazzerPrompterOptions } from '../types';

const CommitTypesSchema: ZodType<CommitJazzerPrompterOptions['baseCommitTypes']> = z
	.record(
		ZCommitActionType,
		z.object({
			emoji: z.string().optional(),
			code: z.string().optional(),
			description: z.string().optional(),
		}),
	)
	.optional();

export default CommitTypesSchema;
