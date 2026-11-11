import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import Media from '../Media'
import Eyebrow from '../Eyebrow'

function Stat({ value, label }) {
  const hasPlus = value.endsWith('+')

  return (
    <div>
      <div className="font-display text-4xl font-semibold leading-none text-white">
        {hasPlus ? value.slice(0, -1) : value}
        {hasPlus && <span className="text-sky">+</span>}
      </div>
      <div className="mt-2 text-[11px] uppercase tracking-[0.12em] text-white/60">{label}</div>
    </div>
  )
}

export default function Hero({ slides, stats }) {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)

  // Passe au slide suivant toutes les 6,5 secondes
  useEffect(() => {
    if (slides.length < 2) return
    const timer = setTimeout(() => setIndex((i) => (i + 1) % slides.length), 6500)
    return () => clearTimeout(timer)
  }, [index, slides.length])

  if (!slides.length) return null

  const slide = slides[index]

  return (
    <section className="relative flex min-h-[calc(100svh-84px)] flex-col overflow-hidden bg-forest text-white">
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Media src={s.image_url} className="h-full w-full object-cover" />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/55 to-forest/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent" />

      <div className="wrap relative z-10 flex flex-1 flex-col">
        <div key={slide.id} className="flex flex-1 flex-col justify-center py-16">
          {slide.eyebrow && <Eyebrow light>{slide.eyebrow}</Eyebrow>}

          <h1 className="mt-6 font-display text-[clamp(3.25rem,7vw,8.25rem)] font-bold uppercase leading-[0.9]">
            <span className="block">{slide.title_white}</span>
            <span className="block italic text-sky">{slide.title_blue}</span>
          </h1>

          {slide.subtitle && (
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/80">{slide.subtitle}</p>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-8">
            <Link
              to="/evenements"
              className="inline-flex items-center gap-4 bg-sky px-8 py-4 text-sm font-bold text-navy transition-colors hover:bg-white"
            >
              {t('cta.discoverEvents')}
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/domaines"
              className="inline-flex items-center gap-3 border-b border-white/50 pb-1 text-sm font-bold transition-colors hover:border-sky hover:text-sky"
            >
              {t('cta.ourServices')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="flex items-end justify-between gap-8 pb-10">
          <div className="grid w-full max-w-xl grid-cols-3 gap-6 border-t border-white/25 pt-6">
            {stats.map((stat) => (
              <Stat key={stat.value} value={stat.value} label={stat.label} />
            ))}
          </div>

          {slides.length > 1 && (
            <div className="flex gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-[3px] w-8 transition-colors ${
                    i === index ? 'bg-sky' : 'bg-white/35 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
