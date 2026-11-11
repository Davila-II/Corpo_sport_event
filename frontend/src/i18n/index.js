import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import fr from './locales/fr.json'
import en from './locales/en.json'

let saved = 'fr'
try {
  saved = localStorage.getItem('lang') === 'en' ? 'en' : 'fr'
} catch {
  // stockage indisponible : on garde le français
}

i18n.use(initReactI18next).init({
  resources: { fr: { translation: fr }, en: { translation: en } },
  lng: saved,
  fallbackLng: 'fr',
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (lang) => {
  document.documentElement.lang = lang
  try {
    localStorage.setItem('lang', lang)
  } catch {
    // ignoré
  }
})

document.documentElement.lang = saved

export default i18n
