import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { useApi } from '../lib/api'
import PageState from '../components/PageState'
import PageHero from '../components/PageHero'
import Eyebrow from '../components/Eyebrow'
import Title from '../components/Title'
import Media from '../components/Media'
import ContactFormSection from '../components/ContactFormSection'

// Taille des grands titres : environ 57 px sur tablette, 76 px sur grand écran
const TITLE_SIZE = 'text-[clamp(2.25rem,6vw,4.75rem)]'

export default function Services() {
  const { t } = useTranslation()
  const { data, loading, error } = useApi('/services')

  if (!data) return <PageState loading={loading} error={error} />

  const { services = [], editions = [] } = data

  return (
    <>
      <PageHero
        eyebrow={t('services.heroEyebrow')}
        titleWhite={t('services.heroWhite')}
        titleBlue={t('services.heroBlue')}
        subtitle={t('services.heroSubtitle')}
        image="/accueil-1.jpg"
      />

      {/* Introduction + cartes des services, sur fond gris clair */}
      <section className="bg-mist py-20 lg:py-28">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="space-y-6 md:max-w-[24rem] lg:max-w-none">
              <Eyebrow>{t('services.expertiseEyebrow')}</Eyebrow>
              <Title
                white={t('services.expertiseWhite')}
                blue={t('services.expertiseBlue')}
                dark
                className={TITLE_SIZE}
              />
            </div>
            <p className="max-w-[21rem] pb-1 text-[13px] leading-relaxed text-navy/60 md:text-sm">
              {t('services.expertiseDesc')}
            </p>
          </div>

          {/* Une carte par service : image et texte côte à côte, en alternance */}
          <div className="mt-12 space-y-[72px] lg:mt-16">
            {services.map((service, idx) => {
              const isEven = idx % 2 === 1
              const number = String(idx + 1).padStart(2, '0')
              const bullets = Array.isArray(service.bullets)
                ? service.bullets
                : (service.bullets || '').split('\n').filter(Boolean)

              return (
                <article
                  key={service.id || idx}
                  className="grid overflow-hidden bg-white shadow-[0_20px_60px_rgba(7,27,44,0.08)] md:grid-cols-2"
                >
                  {/* Image & numéro */}
                  <div
                    className={`relative min-h-[260px] md:min-h-[400px] ${
                      isEven ? 'md:order-2' : ''
                    }`}
                  >
                    <Media
                      src={service.image_url || `/accueil-${(idx % 4) + 1}.${idx === 2 ? 'png' : idx === 3 ? 'jpeg' : 'jpg'}`}
                      alt={service.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy/55 to-transparent" />
                    <span className="absolute bottom-4 left-6 font-display text-6xl font-bold leading-none text-white">
                      {number}
                    </span>
                  </div>

                  {/* Contenu textuel */}
                  <div className="flex flex-col justify-center gap-6 p-8 md:p-11">
                    <Eyebrow>CORPO EVENT</Eyebrow>

                    <h3 className="font-display text-3xl font-semibold uppercase leading-[1.02] text-navy md:text-4xl">
                      {service.title}
                    </h3>

                    <div className="whitespace-pre-line text-xs leading-[1.7] text-navy/60 lg:text-[13px]">
                      {service.description}
                    </div>

                    {bullets.length > 0 && (
                      <ul className="space-y-2.5">
                        {bullets.map((b, bi) => (
                          <li
                            key={bi}
                            className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.08em] text-navy"
                          >
                            <span className="inline-block h-px w-2.5 shrink-0 bg-sky" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link
                      to="/contact"
                      className="group mt-2 flex items-center justify-between border-t border-black/10 pt-5 text-[11px] font-bold text-navy transition-colors hover:text-sky"
                    >
                      {t('cta.discussService')}
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bandeau bleu : "Des éditions qui construisent une histoire" */}
      {editions.length > 0 && (
        <section className="bg-sky-dark py-20 text-white lg:py-28">
          <div className="wrap">
            <div className="mb-14 space-y-6">
              <Eyebrow light>{t('services.editionsEyebrow')}</Eyebrow>
              <Title
                white={t('services.editionsWhite')}
                blue={t('services.editionsBlue')}
                className={TITLE_SIZE}
              />
            </div>

            <div className="divide-y divide-white/30 border-y border-white/30">
              {editions.map((ed) => (
                <Link
                  key={ed.id}
                  to="/evenements"
                  className="group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-1 py-[17px] transition-colors hover:bg-white/10 sm:grid-cols-[135px_1fr_auto]"
                >
                  <span className="col-span-2 text-[8px] font-medium uppercase tracking-[0.15em] text-white/65 sm:col-span-1">
                    {t(`category.${ed.category}`)}
                  </span>
                  <span className="font-display text-[1.75rem] font-semibold uppercase leading-none text-white">
                    {ed.title}
                  </span>
                  <span className="flex items-center gap-4 text-[10px] font-bold uppercase text-white">
                    {ed.edition_label || ed.period_label || ''}
                    <ChevronRight
                      size={16}
                      strokeWidth={1.5}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Formulaire de contact en bas */}
      <ContactFormSection services={services} />
    </>
  )
}
