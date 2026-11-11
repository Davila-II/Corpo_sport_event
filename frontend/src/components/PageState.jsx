import { useTranslation } from 'react-i18next'

// Affiché pendant le chargement d'une page, ou si l'API ne répond pas
export default function PageState({ loading, error }) {
  const { t } = useTranslation()

  if (error && !loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-navy/70">{t('common.error')}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-navy px-6 py-3 text-sm font-bold text-white hover:bg-sky hover:text-navy"
        >
          {t('common.retry')}
        </button>
      </div>
    )
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center text-sm text-navy/50">
      {t('common.loading')}
    </div>
  )
}
