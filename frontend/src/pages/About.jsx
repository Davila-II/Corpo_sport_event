import { useTranslation } from 'react-i18next'
import { useApi } from '../lib/api'
import PageState from '../components/PageState'
import PageHero from '../components/PageHero'
import Eyebrow from '../components/Eyebrow'
import Title from '../components/Title'
import Media from '../components/Media'

export default function About() {
  const { t } = useTranslation()
  const { data, loading, error } = useApi('/about')

  if (!data) return <PageState loading={loading} error={error} />

  const { president, goals, values } = data

  return (
    <>
      <PageHero
        eyebrow={t('about.heroEyebrow')}
        titleWhite={t('about.heroWhite')}
        titleBlue={t('about.heroBlue')}
        subtitle={t('about.heroSubtitle')}
        image="/accueil-1.jpg"
      />

      {/* Mot du président */}
      {president && (
        <section className="bg-white py-20 lg:py-28">
          <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:items-center lg:gap-20">
            <div className="bg-[#f8f9fa] p-8 md:p-12 flex items-center justify-center">
              <div className="relative flex flex-col items-center justify-center p-8 bg-white rounded-full aspect-square w-full max-w-[340px] shadow-sm border border-black/5">
                {president.photo_url ? (
                  <Media
                    src={president.photo_url}
                    alt={president.name}
                    className="h-36 w-36 rounded-full object-cover"
                  />
                ) : (
                  <img
                    src="/logo.png"
                    alt="Corpo Sport Event"
                    className="h-36 w-36 object-contain"
                  />
                )}
                <h4 className="mt-4 font-display text-base font-bold uppercase text-navy tracking-wider text-center">
                  {president.name}
                </h4>
                <p className="text-[10px] uppercase tracking-widest text-navy/40 text-center">
                  {president.role}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Eyebrow>{t('about.presidentEyebrow')}</Eyebrow>
              <Title
                white={president.title_white}
                blue={president.title_blue}
                dark
                className="text-[clamp(2.5rem,4.5vw,4.5rem)]"
              />
              <div className="whitespace-pre-line text-sm leading-relaxed text-navy/70 md:text-base">
                {president.text}
              </div>
              <p className="font-display text-xl font-bold uppercase text-navy pt-2">
                {president.name}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Cap : Ambition, Mission, Objectif */}
      {goals && (
        <section className="bg-navy py-20 text-white lg:py-28">
          <div className="wrap">
            <div className="max-w-2xl space-y-6 mb-16">
              <Eyebrow light>{t('about.capEyebrow')}</Eyebrow>
              <Title
                white={t('about.capWhite')}
                blue={t('about.capBlue')}
                className="text-[clamp(2.5rem,4.5vw,4.5rem)]"
              />
            </div>

            <div className="grid gap-8 border-t border-white/15 pt-12 md:grid-cols-3">
              <div className="space-y-4">
                <span className="font-display text-2xl font-bold text-sky">01</span>
                <h3 className="font-display text-2xl font-bold uppercase tracking-wide">
                  {t('about.ambition')}
                </h3>
                <p className="text-sm leading-relaxed text-white/70">{goals.ambition}</p>
              </div>

              <div className="space-y-4 border-t border-white/15 pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                <span className="font-display text-2xl font-bold text-sky">02</span>
                <h3 className="font-display text-2xl font-bold uppercase tracking-wide">
                  {t('about.mission')}
                </h3>
                <p className="text-sm leading-relaxed text-white/70">{goals.mission}</p>
              </div>

              <div className="space-y-4 border-t border-white/15 pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                <span className="font-display text-2xl font-bold text-sky">03</span>
                <h3 className="font-display text-2xl font-bold uppercase tracking-wide">
                  {t('about.objective')}
                </h3>
                <p className="text-sm leading-relaxed text-white/70">{goals.objective}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Nos valeurs */}
      {values && values.length > 0 && (
        <section className="bg-white py-20 lg:py-28">
          <div className="wrap">
            <div className="max-w-2xl space-y-6 mb-16">
              <Eyebrow>{t('about.valuesEyebrow')}</Eyebrow>
              <Title
                white={t('about.valuesWhite')}
                blue={t('about.valuesBlue')}
                dark
                className="text-[clamp(2.5rem,4.5vw,4.5rem)]"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {values.map((v, i) => (
                <div
                  key={v.title}
                  className="flex flex-col justify-between border border-black/10 bg-white p-8 transition-shadow hover:shadow-lg min-h-[300px]"
                >
                  <span className="font-display text-xl font-bold text-sky">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="mt-12">
                    <h3 className="font-display text-2xl font-bold uppercase text-navy mb-3">
                      {v.title}
                    </h3>
                    <p className="text-xs text-navy/70 leading-relaxed">{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
