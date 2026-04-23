import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Language, translations, TranslationTree } from './translations';

interface LanguageContextValue {
    language: Language;
    setLanguage: (language: Language) => void;
    toggleLanguage: () => void;
    t: (key: string) => string;
}

const STORAGE_KEY = 'site.language';

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const getNestedValue = (obj: TranslationTree, key: string): string | undefined => {
    const value = key.split('.').reduce<string | TranslationTree | undefined>((acc, part) => {
        if (!acc || typeof acc === 'string') {
            return undefined;
        }
        return acc[part];
    }, obj);

    return typeof value === 'string' ? value : undefined;
};

const getInitialLanguage = (): Language => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'zh') {
        return stored;
    }

    const browserLanguage = navigator.language.toLowerCase();
    return browserLanguage.startsWith('zh') ? 'zh' : 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => getInitialLanguage());

    const setLanguage = useCallback((nextLanguage: Language) => {
        setLanguageState(nextLanguage);
    }, []);

    const toggleLanguage = useCallback(() => {
        setLanguageState((current) => (current === 'en' ? 'zh' : 'en'));
    }, []);

    const t = useCallback(
        (key: string) => {
            const languageValue = getNestedValue(translations[language], key);
            if (languageValue) {
                return languageValue;
            }

            const fallbackValue = getNestedValue(translations.en, key);
            return fallbackValue || key;
        },
        [language]
    );

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, language);
        document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    }, [language]);

    const value = useMemo(
        () => ({
            language,
            setLanguage,
            toggleLanguage,
            t,
        }),
        [language, setLanguage, toggleLanguage, t]
    );

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextValue => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }

    return context;
};
