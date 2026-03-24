"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language, TranslationDict } from '@/lib/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: TranslationDict;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('ja');
    const [mounted, setMounted] = useState(false);

    // Load language preference from localStorage if available
    useEffect(() => {
        const savedLang = localStorage.getItem('preferred_language') as Language;
        setTimeout(() => {
            if (savedLang && (savedLang === 'ja' || savedLang === 'en')) {
                setLanguage(savedLang);
            }
            setMounted(true);
        }, 0);
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('preferred_language', lang);
    };

    const t = translations[language];

    // Prevent hydration mismatch by not rendering anything until mounted
    if (!mounted) {
        return null;
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
