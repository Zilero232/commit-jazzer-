import { LanguageEnum, type LanguageValues, type TranslationsJson } from '@/types/modules/language';

import en from './modules/en.json';
import ru from './modules/ru.json';
import es from './modules/es.json';

export const translations: Record<LanguageValues, Partial<TranslationsJson>> = {
	[LanguageEnum.English]: en,
	[LanguageEnum.Russian]: ru,
	[LanguageEnum.Spanish]: es,
};
