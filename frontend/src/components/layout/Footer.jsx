import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Logo from '../Logo'
import { useApi } from '../../lib/api'
import { NAV_ITEMS } from '../../lib/nav'

export default function Footer() {
  const { t } = useTranslation()
  const { data } = useApi('/settings')

  const site = data?.site ?? {}
  const cities = site.cities ?? ['Douala, Cameroun', 'Yaoundé, Cameroun']
  const links = NAV_ITEMS.filter((item) => item.to !== '/' && item.to !== '/contact')

  return (
    <footer className="bg-forest text-white">
      <div className="wrap grid gap-12 pb-10 pt-16 md:grid-cols-[1fr_auto_auto] md:gap-24">
        <div className="flex items-start gap-4">
          <div className="bg-white p-1">
            <Logo className="h-[54px] w-[54px]" />
          </div>
          <div>
            <div className="font-display text-2xl font-bold uppercase leading-none">
              Corpo Sport Event
            </div>
            <div className="mt-2 text-[12px] text-white/60">
              {site.tagline ?? 'L’événement au cœur de l’action'}
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em]">
            {t('footer.navigation')}
          </h3>
          <ul className="space-y-3 text-[12px] text-white/60">
            {links.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition-colors hover:text-sky">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em]">
            {t('footer.findUs')}
          </h3>
          <ul className="space-y-3 text-[12px] text-white/60">
            {cities.map((city) => (
              <li key={city}>{city}</li>
            ))}
            {site.membership && <li>{site.membership}</li>}
          </ul>
        </div>
      </div>

      <div className="wrap">
        <div className="flex flex-col justify-between gap-2 border-t border-white/10 py-6 text-[10px] uppercase tracking-wider text-white/40 md:flex-row">
          <span>{t('footer.rights', { year: new Date().getFullYear() })}</span>
          <span>{site.legal ?? 'CORPO EVENT SARL · ASSOCIATION CORPO SPORT EVENT'}</span>
        </div>
      </div>
    </footer>
  )
}
