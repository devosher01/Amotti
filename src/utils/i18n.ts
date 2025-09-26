import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import english from '../utils/languages/en.json';
import french from '../utils/languages/fr.json';
import arabic from '../utils/languages/ar.json';
import chinese from '../utils/languages/ch.json';

const resources = {
  en: {
    translation: english,
  },
  fr: {
    translation: french,
  },
  ar: {
    translation: arabic,
  },
  ch: {
    translation: chinese,
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en',
      fallbackLng: 'en',
      debug: false,
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
      missingKeyHandler: false,
      saveMissing: false,
    })
    .catch((error) => {
      console.error('Error inicializando i18n:', error);
    });
}

export default i18n;
