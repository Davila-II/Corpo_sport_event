import axios from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const api = axios.create({ baseURL: '/api' })

// Charge une adresse de l'API dans la langue courante (fr ou en).
// Renvoie { data, loading, error }.
export function useApi(path) {
  const { i18n } = useTranslation()
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr'
  const [state, setState] = useState({ data: null, loading: true, error: null })

  useEffect(() => {
    const controller = new AbortController()
    setState((s) => ({ ...s, loading: true, error: null }))

    api
      .get(path, { params: { lang }, signal: controller.signal })
      .then((res) => setState({ data: res.data, loading: false, error: null }))
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setState({ data: null, loading: false, error: err })
        }
      })

    return () => controller.abort()
  }, [path, lang])

  return state
}
