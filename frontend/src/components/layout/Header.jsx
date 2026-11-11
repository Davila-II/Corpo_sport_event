import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Menu, X } from 'lucide-react'
import Logo from '../Logo'
import { NAV_ITEMS } from '../../lib/nav'

export default function Header() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr'

  // L'en-tête rétrécit quand on descend dans la page
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass = ({ isActive }) =>
    'relative py-2 text-[12px] font-bold uppercase tracking-wide transition-colors ' +
    (isActive
      ? 'text-sky after:absolute after:inset-x-0 after:-bottom-1 after:h-[2px] after:bg-sky'
      : 'text-navy hover:text-sky')

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
      <div
        className={`flex items-center justify-between px-6 transition-all duration-300 lg:px-[86px] ${
          scrolled ? 'h-[68px]' : 'h-[84px]'
        }`}
      >
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo className={`${scrolled ? 'h-10 w-10' : 'h-12 w-12'} transition-all`} />
          <span className="leading-none">
            <span className="block font-display text-[22px] font-bold uppercase tracking-wide text-navy">
              Corpo
            </span>
            <span className="block font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-sky">
              Sport Event
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex border border-black/15 text-[11px] font-bold">
            {['fr', 'en'].map((code) => (
              <button
                key={code}
                onClick={() => i18n.changeLanguage(code)}
                className={`px-2.5 py-1.5 uppercase transition-colors ${
                  lang === code ? 'text-navy' : 'text-navy/35 hover:text-navy'
                }`}
                aria-pressed={lang === code}
              >
                {code}
              </button>
            ))}
          </div>

          <Link
            to="/contact"
            className="hidden items-center gap-3 bg-navy px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-sky hover:text-navy md:inline-flex"
          >
            {t('cta.projectTalk')}
            <ArrowRight size={16} />
          </Link>

          <button
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t('common.closeMenu') : t('common.openMenu')}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-black/5 bg-white px-6 pb-6 pt-3 lg:hidden">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `py-3 text-sm font-bold uppercase tracking-wide ${
                  isActive ? 'text-sky' : 'text-navy'
                }`
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center gap-3 bg-navy px-6 py-3.5 text-sm font-bold text-white"
          >
            {t('cta.projectTalk')}
            <ArrowRight size={16} />
          </Link>
        </nav>
      )}
    </header>
  )
}
