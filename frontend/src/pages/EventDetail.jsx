import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Calendar, Download, MapPin, Trophy } from 'lucide-react'
import { useApi } from '../lib/api'
import PageState from '../components/PageState'
import Media from '../components/Media'
import Eyebrow from '../components/Eyebrow'
import Title from '../components/Title'
import { getEventFallbackImage } from '../lib/eventImages'

const STATUS_BADGE = {
  ongoing: 'bg-[#087ba9]',
  upcoming: 'bg-sky',
  finished: 'bg-[#55635d]',
}

const SECTION_TITLE = 'text-[clamp(2.5rem,4.2vw,4.75rem)]'

const BUTTON =
  'inline-flex items-center gap-6 bg-navy px-4 py-3 text-[11px] font-bold text-white transition-colors hover:bg-sky hover:text-navy disabled:opacity-60'

// Bouton "Télécharger le dossier"
function DossierButton({ event }) {
  const { t } = useTranslation()
  const [busy, setBusy] = useState(false)

  // Dossier propre à la compétition, enregistré dans l'admin
  if (event.dossier_url) {
    return (
      <a href={event.dossier_url} download target="_blank" rel="noreferrer" className={BUTTON}>
        {t('events.downloadDossier')}
        <Download size={14} />
      </a>
    )
  }

  // Sinon : la présentation générale, téléchargée sous un vrai nom .pdf
  const download = async () => {
    setBusy(true)
    try {
      const response = await fetch('/archives-doc.bin')
      const blob = await response.blob()
      const url = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }))
      const link = document.createElement('a')
      link.href = url
      link.download = `${event.slug}-dossier.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch (err) {
      console.error('Erreur téléchargement du dossier:', err)
    } finally {
      setBusy(false)
    }
  }

  return (
    <button type="button" onClick={download} disabled={busy} className={BUTTON}>
      {t('events.downloadDossier')}
      <Download size={14} />
    </button>
  )
}

function NotFound() {
  const { t } = useTranslation()

  return (
    <section className="wrap flex min-h-[60vh] flex-col items-start justify-center gap-6 py-24">
      <Eyebrow>{t('events.backToAll')}</Eyebrow>
      <h1 className="font-display text-5xl font-bold uppercase text-navy">
        {t('events.competitionNotFound')}
      </h1>
      <Link
        to="/evenements"
        className="inline-flex items-center gap-2 bg-navy px-5 py-3 text-xs font-bold text-white hover:bg-sky hover:text-navy"
      >
        <ArrowLeft size={14} />
        {t('events.backToAll')}
      </Link>
    </section>
  )
}

export default function EventDetail() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const { data, loading, error } = useApi(`/events/${slug}`)

  if (error?.response?.status === 404) return <NotFound />
  if (!data) return <PageState loading={loading} error={error} />

  const event = data.data ?? data
  const editions = Array.isArray(event.editions) ? event.editions : []
  const distinctions = Array.isArray(event.distinctions) ? event.distinctions : []

  return (
    <>
      {/* En-tête : photo, statut, titre et informations clés */}
      <section className="relative flex min-h-[70vh] flex-col overflow-hidden bg-forest text-white">
        <Media
          src={event.cover_url || getEventFallbackImage(event)}
          alt={event.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/85 via-forest/45 to-forest/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-forest/30" />

        <div className="wrap relative z-10 flex flex-1 flex-col">
          <Link
            to="/evenements"
            className="inline-flex w-fit items-center gap-1.5 pt-8 text-[11px] text-white/85 transition-colors hover:text-sky"
          >
            <ArrowLeft size={12} />
            {t('events.backToAll')}
          </Link>

          <div className="mt-auto pb-14 pt-24">
            <span
              className={`inline-block px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.15em] text-white ${
                STATUS_BADGE[event.status] || 'bg-sky'
              }`}
            >
              {t(`status.${event.status}`)}
            </span>

            <h1 className="mt-5 max-w-[6.7em] font-display text-[clamp(3.25rem,6.8vw,8.25rem)] font-medium uppercase leading-[0.92]">
              {event.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 text-[11px] uppercase tracking-[0.12em]">
              {event.city && (
                <span className="flex items-center gap-2">
                  <MapPin size={15} /> {event.city}
                </span>
              )}
              {event.period_label && (
                <span className="flex items-center gap-2">
                  <Calendar size={15} /> {event.period_label}
                </span>
              )}
              {event.edition_label && (
                <span className="flex items-center gap-2">
                  <Trophy size={15} /> {event.edition_label}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* La compétition : texte, dossier et distinctions */}
      <section className="bg-paper py-20 lg:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-20">
          <div>
            <Eyebrow>{t('events.theCompetition')}</Eyebrow>
            <Title
              white={t('events.aboutPrefix')}
              blue={event.title}
              dark
              className={`mt-6 ${SECTION_TITLE}`}
            />

            {event.description && (
              <p className="mt-3 max-w-[52rem] text-lg leading-snug text-[#2f433a]">
                {event.description}
              </p>
            )}
            <p className="mt-2 max-w-[52rem] text-[11.5px] leading-[1.8] text-navy/55">
              {t('events.aboutExtra')}
            </p>

            <div className="mt-6">
              <DossierButton event={event} />
            </div>
          </div>

          {distinctions.length > 0 && (
            <aside className="h-fit bg-mist p-6 lg:p-7">
              <h3 className="font-display text-[26px] font-medium uppercase leading-none text-navy">
                {t('events.distinctions')}
              </h3>
              <ul className="mt-5">
                {distinctions.map((item, i) => (
                  <li
                    key={`${item}-${i}`}
                    className="flex items-center gap-3 border-t border-black/10 py-4 text-[11px] text-navy"
                  >
                    <Trophy size={14} className="shrink-0 text-sky" />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </section>

      {/* Archives : les différentes éditions */}
      <section className="bg-mist py-20 lg:py-24">
        <div className="wrap">
          <div className="space-y-6">
            <Eyebrow>{t('events.archivesEyebrow')}</Eyebrow>
            <Title
              white={t('events.editionsWhite')}
              blue={t('events.editionsBlue')}
              dark
              className={SECTION_TITLE}
            />
          </div>

          {editions.length > 0 ? (
            <ul className="mt-14 grid border-t border-black/15 sm:grid-cols-2 lg:grid-cols-4">
              {editions.map((edition, i) => (
                <li
                  key={`${edition.period}-${i}`}
                  className="flex min-h-[180px] flex-col justify-between border-b border-r border-black/15 px-5 py-6 lg:border-b-0"
                >
                  <span className="font-display text-[26px] font-semibold leading-none text-[#087ba9]">
                    {edition.period}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold uppercase leading-tight text-navy">
                      {edition.title}
                    </h3>
                    <p className="mt-1.5 text-[8px] text-navy/40">{t('events.dossierSub')}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-14 border-t border-black/15 pt-6 text-sm text-navy/50">
              {t('events.noEditions')}
            </p>
          )}
        </div>
      </section>
    </>
  )
}
