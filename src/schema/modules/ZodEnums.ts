import { z } from 'zod';

import { LanguageEnum } from '@/types/modules/language';
import { CommitActionsEnum } from '@/types/modules/actions';
import { CommitFieldsEnum } from '@/types/modules/commit';

// Get the enumeration values and convert them to an array of strings.
export const ZLanguage = z.enum(Object.values(LanguageEnum) as unknown as readonly [string, ...string[]]);

// Get the enumeration values and convert them to an array of strings.
export const ZCommitActionType = z.enum(Object.values(CommitActionsEnum) as unknown as readonly [string, ...string[]]);

// Get the enumeration values and convert them to an array of strings.
export const ZCommitFields = z.enum(Object.values(CommitFieldsEnum) as unknown as readonly [string, ...string[]]);
