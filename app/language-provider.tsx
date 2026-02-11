"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "fr" | "ar";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    dir: "ltr" | "rtl"; // <-- Add dir here
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
    en: { welcome: "Welcome", login: "Login", logout: "Logout" },
    fr: { welcome: "Bienvenue", login: "Connexion", logout: "Déconnexion" },
    ar: { welcome: "مرحبا", login: "تسجيل الدخول", logout: "تسجيل الخروج" },
};

interface LanguageProviderProps {
    children: ReactNode;
    defaultLanguage?: Language;
}

export const LanguageProvider = ({
    children,
    defaultLanguage = "en",
}: LanguageProviderProps) => {
    const [language, setLanguage] = useState<Language>(defaultLanguage);

    const t = (key: string) => translations[language][key] || key;

    // Determine direction
    const dir: "ltr" | "rtl" = language === "ar" ? "rtl" : "ltr";

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
    return context;
};
