import { Fragment, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  ChevronRight,
  MapPin,
  Search,
} from 'lucide-react'
import { useApi } from '../lib/api'
import PageState from '../components/PageState'
import PageHero from '../components/PageHero'
import Media from '../components/Media'
import { getEventFallbackImage } from '../lib/eventImages'

const CATEGORIES = ['football', 'basketball', 'futsal', 'culture']

// Ces villes sont toujours proposées dans le filtre, même sans événement
const FIXED_CITIES = ['Douala', 'Yaoundé', 'National']

// Filtres de statut affichés à droite du compteur
const STATUS_FILTERS = [
  { value: 'ongoing', key: 'events.legendOngoing' },
  { value: 'upcoming', key: 'events.legendUpcoming' },
  { value: 'finished', key: 'events.legendArchives' },
]

const STATUS_BADGE = {
  ongoing: 'bg-[#087ba9]',
  upcoming: 'bg-sky',
  finished: 'bg-[#55635d]',
}

// Recherche sans tenir compte des accents ni des majuscules
const normalize = (text = '') =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

function FilterSelect({ value, onChange, label, children }) {
  return (
    <div className="relative md:w-[206px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="h-[43px] w-full appearance-none border border-black/15 bg-white px-4 pr-9 text-[11px] text-navy outline-none focus:border-sky"
      >
        {children}
      </select>
      <ChevronDown
        size={12}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-navy"
      />
    </div>
  )
}

function EventBlock({ event }) {
  const { t } = useTranslation()
  const editions = Array.isArray(event.editions) ? event.editions : []

  // Page de détail de la compétition (le bouton et les éditions mènent ici)
  const detailPath = `/evenements/${event.slug}`

  return (
    <article id={event.slug} className="border-t border-black/10 pt-9">
      {/* Ligne de titre : catégorie, nom, numéro d'édition */}
      <header className="flex flex-col gap-2 pb-5 sm:grid sm:grid-cols-[135px_1fr_auto] sm:items-end sm:gap-x-4">
        <span className="pb-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-sky-dark">
          {t(`category.${event.category}`)}
        </span>
        <h2 className="font-display text-4xl font-semibold uppercase leading-none text-navy md:text-[2.6rem]">
          {event.title}
        </h2>
        {event.edition_label && (
          <span className="pb-1.5 text-[10px] font-bold uppercase text-navy/60">
            {event.edition_label}
          </span>
        )}
      </header>

      <div className="grid bg-white md:grid-cols-[300px_1fr] lg:grid-cols-[21%_1fr]">
        {/* Carte de la compétition */}
        <div className="flex flex-col border-black/10 md:border-r">
          <div className="relative aspect-[1.4/1] overflow-hidden bg-forest">
            <Media
              src={event.cover_url || getEventFallbackImage(event)}
              alt={event.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

            <span
              className={`absolute left-4 top-4 px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.15em] text-white ${
                STATUS_BADGE[event.status] || 'bg-sky'
              }`}
            >
              {t(`status.${event.status}`)}
            </span>

            <span className="absolute bottom-3 left-4 text-[8px] font-bold uppercase tracking-[0.2em] text-white">
              {t(`category.${event.category}`)}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-5">
            <div className="flex flex-wrap items-center gap-4 text-[8px] uppercase tracking-wider text-navy/50">
              {event.city && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={11} /> {event.city}
                </span>
              )}
              {event.period_label && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={11} /> {event.period_label}
                </span>
              )}
            </div>

            <h3 className="mt-4 font-display text-[26px] font-semibold uppercase leading-none text-navy">
              {event.title}
            </h3>

            {event.description && (
              <p className="mt-3 flex-1 text-xs leading-[1.5] text-navy/60">
                {event.description}
              </p>
            )}

            <Link
              to={detailPath}
              className="group mt-5 flex items-center justify-between border-t border-black/10 pt-4 text-[10px] font-bold text-navy transition-colors hover:text-sky"
            >
              {t('cta.viewCompetition')}
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* Éditions répertoriées : chaque ligne ouvre la page de la compétition */}
        <div className="p-6 pt-8 md:p-8 md:pt-9">
          <p className="text-[8px] uppercase tracking-[0.2em] text-navy/45">
            {t('events.editionsListed')}
          </p>

          {editions.length > 0 ? (
            <ul className="mt-5">
              {editions.map((edition, i) => (
                <li
                  key={`${edition.period}-${i}`}
                  className="border-t border-black/10"
                >
                  <Link
                    to={detailPath}
                    className="group flex items-center py-[18px] transition-colors hover:bg-mist/70"
                  >
                    <span className="w-20 shrink-0 font-display text-2xl font-semibold leading-none text-sky sm:w-[102px]">
                      {edition.period}
                    </span>
                    <span className="flex-1 text-[11px] font-bold text-navy">
                      {edition.title}
                    </span>
                    <ChevronRight
                      size={14}
                      className="shrink-0 text-navy transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 border-t border-black/10 pt-5 text-xs text-navy/50">
              {t('events.noEditions')}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Events() {
  const { t } = useTranslation()
  const { data, loading, error } = useApi('/events')

  const [query, setQuery] = useState('')
  const [city, setCity] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')

  // Normalise la liste des événements
  const events = useMemo(() => {
    if (Array.isArray(data)) return data
    if (Array.isArray(data?.data)) return data.data
    if (Array.isArray(data?.events)) return data.events
    return []
  }, [data])

  // Douala, Yaoundé et National d'abord, puis les autres villes éventuelles
  const cities = useMemo(() => {
    const others = [...new Set(events.map((e) => e.city).filter(Boolean))]
      .filter((c) => !FIXED_CITIES.includes(c))
      .sort((a, b) => a.localeCompare(b))

    return [...FIXED_CITIES, ...others]
  }, [events])

  const filtered = useMemo(() => {
    const q = normalize(query)

    return events.filter(
      (e) =>
        (!q || normalize(e.title).includes(q)) &&
        (!city || e.city === city) &&
        (!category || e.category === category) &&
        (!status || e.status === status),
    )
  }, [events, query, city, category, status])

  if (!data) return <PageState loading={loading} error={error} />

  return (
    <>
      <PageHero
        eyebrow={t('events.heroEyebrow')}
        titleWhite={t('events.heroWhite')}
        titleBlue={t('events.heroBlue')}
        subtitle={t('events.heroSubtitle')}
        image="/accueil-1.jpg"
      />

      <section className="bg-paper py-20 lg:py-24">
        <div className="wrap">
          {/* Barre de recherche et filtres */}
          <div className="flex flex-col gap-3 border border-black/10 bg-white p-4 md:flex-row">
            <label className="relative flex-1">
              <Search
                size={14}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy/60"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('events.searchPlaceholder')}
                aria-label={t('events.searchPlaceholder')}
                className="h-[43px] w-full border border-black/15 bg-white pl-10 pr-4 text-[11px] text-navy outline-none placeholder:text-navy/45 focus:border-sky"
              />
            </label>

            <FilterSelect value={city} onChange={setCity} label={t('events.allCities')}>
              <option value="">{t('events.allCities')}</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </FilterSelect>

            <FilterSelect
              value={category}
              onChange={setCategory}
              label={t('events.allCategories')}
            >
              <option value="">{t('events.allCategories')}</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {t(`category.${c}`)}
                </option>
              ))}
            </FilterSelect>
          </div>

          {/* Compteur et filtres de statut */}
          <div className="flex flex-wrap items-center justify-between gap-3 py-5 text-[8px] font-medium uppercase tracking-[0.2em]">
            <span className="text-navy/50">
              {t('events.results', { count: filtered.length })}
            </span>

            <div className="flex items-center gap-2 font-bold text-sky-dark">
              {STATUS_FILTERS.map((s, i) => (
                <Fragment key={s.value}>
                  {i > 0 && <span aria-hidden="true">·</span>}
                  <button
                    type="button"
                    aria-pressed={status === s.value}
                    onClick={() => setStatus(status === s.value ? '' : s.value)}
                    className={`uppercase tracking-[0.2em] transition-colors hover:text-navy ${
                      status === s.value ? 'text-navy underline underline-offset-4' : ''
                    }`}
                  >
                    {t(s.key)}
                  </button>
                </Fragment>
              ))}
            </div>
          </div>

          {/* Un bloc par compétition */}
          {filtered.length === 0 ? (
            <div className="border-t border-black/10 py-16 text-center text-navy/50">
              {t('events.empty')}
            </div>
          ) : (
            <div className="space-y-14">
              {filtered.map((event) => (
                <EventBlock key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
