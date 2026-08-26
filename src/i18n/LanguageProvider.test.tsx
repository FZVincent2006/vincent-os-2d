import { translate } from './LanguageProvider';
import { Language, TranslationTree } from './translations';

test('falls back to English when the active language omits a key', () => {
    const source: Record<Language, TranslationTree> = {
        en: { sample: { label: 'English fallback' } },
        zh: { sample: {} },
    };

    expect(translate('zh', 'sample.label', source)).toBe('English fallback');
});

test('preserves an intentionally empty active translation', () => {
    const source: Record<Language, TranslationTree> = {
        en: { sample: { label: 'English fallback' } },
        zh: { sample: { label: '' } },
    };

    expect(translate('zh', 'sample.label', source)).toBe('');
});
