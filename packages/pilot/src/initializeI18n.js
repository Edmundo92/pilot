import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { reactI18nextModule } from 'react-i18next'

import moment from 'moment-timezone'
import 'moment/locale/pt-br'

moment.locale('pt-br')
moment.tz.setDefault('America/Sao_Paulo')

const basePath = process.env.PUBLIC_URL || ''

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    backend: {
      loadPath: `${basePath}/locales/{{lng}}/{{ns}}.json`,
    },
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false,
    },
    lng: 'pt',
    ns: ['translations'],
    react: {
      wait: true,
    },
    whitelist: ['pt'],
  })

export default i18n
