import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Calendar, MapPin } from 'lucide-react'
import Media from '../Media'
import Eyebrow from '../Eyebrow'
import Title from '../Title'

function EventCard({ event }) {
  const { t } = useTranslation()

  return (
    <Link
      to="/evenements"
      className="group flex flex-col overflow-hidden border border-black/10 bg-white transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-[2.15/1] overflow-hidden">
        <Media
          src={event.cover_url}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <span
          className={`absolute left-4 top-4 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white ${
            event.status === 'finished' ? 'bg-black/55' : 'bg-sky'
          }`}
        >
          {t(`status.${event.status}`)}
        </span>

        <span className="absolute bottom-3 left-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
          {t(`category.${event.category}`)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-5 text-[10px] uppercase tracking-wider text-navy/50">
          {event.city && (
            <span className="flex items-center gap-1.5">
              <MapPin size={12} /> {event.city}
            </span>
          )}
          {event.period_label && (
            <span className="flex items-center gap-1.5">
              <Calendar size={12} /> {event.period_label}
            </span>
          )}
        </div>

        <h3 className="mt-4 font-display text-[28px] font-semibold uppercase leading-none text-navy">
          {event.title}
        </h3>

        {event.description && (
          <p className="mt-3 flex-1 text-[13px] leading-relaxed text-navy/60">
            {event.description}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5 text-[12px] font-bold text-navy">
          {t('cta.viewCompetition')}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

export default function EventsSection({ events }) {
  const { t } = useTranslation()

  if (!events.length) return null

  return (
    <section className="bg-paper py-24">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="space-y-6">
            <Eyebrow>{t('home.latestEvents')}</Eyebrow>
            <Title white={t('home.disciplineWhite')} blue={t('home.disciplineBlue')} dark />
          </div>
          <p className="max-w-xs text-[15px] leading-relaxed text-navy/60">
            {t('home.disciplineText')}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}
