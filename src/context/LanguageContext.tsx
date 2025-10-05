// src/context/LanguageContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

type LanguageContextType = {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  selectedDateISO: string;
  setSelectedDateISO: (date: string) => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  selectedDateISO: new Date().toISOString().split('T')[0],
  setSelectedDateISO: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [selectedDateISO, setSelectedDateISO] = useState(
    new Date().toISOString().split('T')[0]
  );

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, selectedDateISO, setSelectedDateISO }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
