// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import cs from "./locales/cs/common"
import en from "./locales/en/common"

i18n
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'cs'],
    fallbackLng: 'cs',
    lng:"cs",
    resources:{
        en: {translation: en},
        cs: {translation: cs},
    },
  });

export default i18n;
