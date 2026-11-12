import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Calendar, MapPin } from 'lucide-react'
import { useApi } from '../lib/api'
import PageState from '../components/PageState'
import PageHero from '../components/PageHero'
import Media from '../components/Media'

export default function Events() {
  const { t } = useTranslation()
  const { data, loading, error } = useApi('/events')
  const [activeCategory, setActiveCategory] = useState('all')

  if (!data) return <PageState loading={loading} error={error} />

  const events = data.events || data || []

  const categories = ['all', 'football', 'basketball', 'futsal', 'culture']
  const filteredEvents =
    activeCategory === 'all'
      ? events
      : events.filter((e) => e.category === activeCategory)

  return (
    <>
      <PageHero
        eyebrow={t('events.heroEyebrow')}
        titleWhite={t('events.heroWhite')}
        titleBlue={t('events.heroBlue')}
        subtitle={t('events.heroSubtitle')}
        image="/src/assets/images/accueil 1.jpg"
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="wrap">
          {/* Filtres par catégorie */}
          <div className="flex flex-wrap items-center gap-3 border-b border-black/10 pb-6 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-navy text-white shadow-sm'
                    : 'bg-white text-navy/70 hover:bg-black/5 hover:text-navy border border-black/10'
                }`}
              >
                {cat === 'all' ? t('events.allFilter') : t(`category.${cat}`)}
              </button>
            ))}
          </div>

          {filteredEvents.length === 0 ? (
            <div className="py-16 text-center text-navy/50">
              {t('events.empty')}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="group flex flex-col overflow-hidden border border-black/10 bg-white transition-all hover:shadow-xl"
                >
                  <div className="relative aspect-[2.15/1] overflow-hidden bg-slate-100">
                    <Media
                      src={event.cover_url}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <span
                      className={`absolute left-4 top-4 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white ${
                        event.status === 'finished' ? 'bg-black/60' : 'bg-sky'
                      }`}
                    >
                      {t(`status.${event.status}`)}
                    </span>

                    <span className="absolute bottom-3 left-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                      {t(`category.${event.category}`) || event.category}
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

                    <h3 className="mt-4 font-display text-[28px] font-bold uppercase leading-none text-navy">
                      {event.title}
                    </h3>

                    {event.edition_label && (
                      <p className="mt-1 font-display text-xs font-semibold uppercase tracking-wider text-sky">
                        {event.edition_label}
                      </p>
                    )}

                    {event.description && (
                      <p className="mt-3 flex-1 text-[13px] leading-relaxed text-navy/70">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
