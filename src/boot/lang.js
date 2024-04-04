import { createI18n } from 'vue-i18n'

// Languages
import en from 'src/lang/en'
import id from 'src/lang/id'
import jp from 'src/lang/jp'
import my from 'src/lang/my'
import fr from 'src/lang/fr'
import es from 'src/lang/es'
import ru from 'src/lang/ru'
import zh from 'src/lang/zh'
import sa from 'src/lang/sa'
import th from 'src/lang/th'

const messages = {
  en,
  id,
  jp,
  my,
  fr,
  es,
  ru,
  zh,
  sa,
  th
}

const lang = localStorage.getItem('lang') || 'en'

const i18n = createI18n({
  legacy: false,
  locale: lang,
  fallbackLocale: 'en',
  messages
})

export default ({ app }) => {
  app.use(i18n)
}

export { lang }
