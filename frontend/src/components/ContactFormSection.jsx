import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { api } from '../lib/api'
import Eyebrow from './Eyebrow'
import Title from './Title'

// Style commun des champs : fond blanc, texte et placeholder petits
const FIELD =
  'w-full border border-black/15 bg-white px-4 py-3 text-xs text-navy outline-none placeholder:text-[11px] placeholder:font-semibold placeholder:text-navy/40 focus:border-sky'

const LABEL =
  'mb-2 block text-[9.5px] font-bold uppercase tracking-[0.08em] text-navy'

export default function ContactFormSection({ services = [], isStandalone = true }) {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service_id: '',
    project: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMsg(null)
    setSuccess(false)

    try {
      await api.post('/contact', {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        service: formData.service_id,
        message: formData.project,
      })
      setSuccess(true)
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        service_id: '',
        project: '',
      })
    } catch (err) {
      console.error(err)
      setErrorMsg(t('common.error'))
    } finally {
      setSubmitting(false)
    }
  }

  const formCard = (
    <div className="bg-mist p-9 shadow-[0_24px_60px_rgba(7,27,44,0.10)]">
      {success ? (
        <div className="border-l-4 border-sky bg-sky/10 p-6 text-navy">
          <h4 className="font-display text-xl font-bold uppercase">{t('contact.success')}</h4>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {errorMsg && (
            <div className="border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {errorMsg}
            </div>
          )}

          <div className="grid gap-5 min-[900px]:grid-cols-2">
            <div>
              <label className={LABEL}>{t('contact.fullName')}</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t('contact.fullNamePlaceholder')}
                className={FIELD}
              />
            </div>

            <div>
              <label className={LABEL}>{t('contact.company')}</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder={t('contact.companyPlaceholder')}
                className={FIELD}
              />
            </div>
          </div>

          <div className="grid gap-5 min-[900px]:grid-cols-2">
            <div>
              <label className={LABEL}>{t('contact.email')}</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={t('contact.emailPlaceholder')}
                className={FIELD}
              />
            </div>

            <div>
              <label className={LABEL}>{t('contact.phone')}</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={t('contact.phonePlaceholder')}
                className={FIELD}
              />
            </div>
          </div>

          <div>
            <label className={LABEL}>{t('contact.serviceType')}</label>
            <select
              value={formData.service_id}
              onChange={(e) => setFormData({ ...formData, service_id: e.target.value })}
              className={`${FIELD} font-semibold`}
            >
              <option value="">{t('contact.selectService')}</option>
              {services.map((s) => (
                <option key={s.id || s.title} value={s.title}>
                  {s.title}
                </option>
              ))}
              <option value="Autre">Autre projet</option>
            </select>
          </div>

          <div>
            <label className={LABEL}>{t('contact.yourProject')}</label>
            <textarea
              required
              rows={4}
              value={formData.project}
              onChange={(e) => setFormData({ ...formData, project: e.target.value })}
              placeholder={t('contact.projectPlaceholder')}
              className={FIELD}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-3 bg-sky py-4 text-xs font-bold text-navy transition-colors hover:bg-navy hover:text-white disabled:opacity-50"
          >
            {submitting ? t('contact.sending') : t('contact.sendDemand')}
            <ArrowRight size={16} />
          </button>
        </form>
      )}
    </div>
  )

  if (!isStandalone) {
    return formCard
  }

  return (
    <section className="bg-paper py-20 lg:py-28">
      <div className="wrap grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:items-start md:gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-24">
        <div>
          <div className="space-y-6">
            <Eyebrow>{t('contact.sectionEyebrow')}</Eyebrow>
            <Title
              white={t('contact.sectionWhite')}
              blue={t('contact.sectionBlue')}
              dark
              className="text-[clamp(2.25rem,6vw,4.75rem)]"
            />
          </div>
          <p className="mt-4 max-w-md text-base leading-relaxed text-navy/70">
            {t('contact.sectionSubtitle')}
          </p>
        </div>

        {formCard}
      </div>
    </section>
  )
}
