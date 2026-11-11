import { useTranslation } from 'react-i18next'
import Eyebrow from '../components/Eyebrow'

export default function Placeholder({ titleKey }) {
  const { t } = useTranslation()

  return (
    <section className="wrap flex min-h-[60vh] flex-col justify-center gap-6 py-24">
      <Eyebrow>{t('common.underConstruction')}</Eyebrow>
      <h1 className="font-display text-6xl font-bold uppercase text-navy">{t(titleKey)}</h1>
    </section>
  )
}
