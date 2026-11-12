import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Eyebrow from '../Eyebrow'

export default function Testimonials({ items }) {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)

  if (!items.length) return null

  const current = items[index % items.length]
  const pad = (n) => String(n).padStart(2, '0')
  const go = (step) => setIndex((i) => (i + step + items.length) % items.length)

  const arrowClass =
    'flex h-10 w-10 items-center justify-center border border-navy/20 bg-white text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white'

  return (
    <section className="bg-white py-24">
      <div className="wrap relative">
        <div className="grid gap-6 lg:grid-cols-[80px_1fr] lg:gap-10">
          <div
            aria-hidden="true"
            className="hidden font-display text-8xl font-black leading-none text-sky lg:block select-none"
          >
            “
          </div>

          <div className="max-w-4xl">
            <Eyebrow>{t('home.testimonial')}</Eyebrow>

            <blockquote
              key={current.id}
              className="mt-8 font-display text-[clamp(1.9rem,3.6vw,3.5rem)] font-bold uppercase leading-[1.08] text-navy"
            >
              {current.quote}
            </blockquote>

            <p className="mt-6 text-[11px] uppercase tracking-wider text-navy/50">
              {current.author_role}
            </p>

            <div className="mt-8 flex gap-2">
              <button className={arrowClass} onClick={() => go(-1)} aria-label={t('common.previous')}>
                <ArrowLeft size={16} />
              </button>
              <button className={arrowClass} onClick={() => go(1)} aria-label={t('common.next')}>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-right font-display text-lg font-semibold text-navy lg:absolute lg:bottom-0 lg:right-0 lg:mt-0">
          {pad((index % items.length) + 1)}
          <span className="text-[11px] text-navy/40"> / {pad(items.length)}</span>
        </div>
      </div>
    </section>
  )
}
