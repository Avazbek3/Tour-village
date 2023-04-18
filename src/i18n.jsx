import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import XHR from 'i18next-xhr-backend';
import Ru from './language/ru/translate.json';
import Uz from './language/uz/translate.json';
import En from './language/en/translate.json';

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ru: Ru,
      uz: Uz,
      en: En,
    },
    lng: window.localStorage.getItem('language') || 'uz',
    fallbackLng: 'uz',
    debug: true,
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    react: {
      wait: true,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default',
      // useSuspense: false,
    },
  });

export default i18n;
