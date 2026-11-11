import { useTranslation } from 'react-i18next'

export default function PartnersStrip({ partners }) {
  const { t } = useTranslation()

  if (!partners.length) return null

  // La liste est répétée pour que le défilement paraisse infini
  const loop = [...partners, ...partners, ...partners, ...partners]

  return (
    <section className="overflow-hidden border-t border-black/5 bg-white py-10">
      <p className="mb-6 text-center text-[10px] uppercase tracking-[0.25em] text-navy/45">
        {t('home.trusted')}
      </p>

      <div className="flex w-max animate-marquee items-center gap-16 pr-16">
        {loop.map((partner, i) =>
          partner.logo_url ? (
            <img
              key={`${partner.id}-${i}`}
              src={partner.logo_url}
              alt={partner.name}
              className="h-10 w-auto object-contain opacity-60 grayscale"
            />
          ) : (
            <span
              key={`${partner.id}-${i}`}
              className="font-display text-2xl font-bold uppercase tracking-wide text-slate-400"
            >
              {partner.name}
            </span>
          ),
        )}
      </div>
    </section>
  )
}
