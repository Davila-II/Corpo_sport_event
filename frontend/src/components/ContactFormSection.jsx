import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { api } from '../lib/api'
import Eyebrow from './Eyebrow'
import Title from './Title'

export default function ContactFormSection({ services = [] }) {
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

  return (
    <section className="bg-paper py-20 lg:py-28">
      <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-20">
        <div className="space-y-6">
          <Eyebrow>{t('contact.sectionEyebrow')}</Eyebrow>
          <Title
            white={t('contact.sectionWhite')}
            blue={t('contact.sectionBlue')}
            dark
            className="text-[clamp(2.5rem,4.5vw,4.5rem)]"
          />
          <p className="max-w-md text-base leading-relaxed text-navy/70">
            {t('contact.sectionSubtitle')}
          </p>
        </div>

        <div className="border border-black/10 bg-white p-8 shadow-sm lg:p-12">
          {success ? (
            <div className="bg-sky/10 border-l-4 border-sky p-6 text-navy">
              <h4 className="font-display text-xl font-bold uppercase">{t('contact.success')}</h4>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="bg-red-50 p-4 text-sm text-red-600 border border-red-200">
                  {errorMsg}
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-navy/70 mb-2">
                    {t('contact.fullName')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('contact.fullNamePlaceholder')}
                    className="w-full border border-black/15 bg-paper px-4 py-3 text-sm text-navy outline-none focus:border-sky"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-navy/70 mb-2">
                    {t('contact.company')}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder={t('contact.companyPlaceholder')}
                    className="w-full border border-black/15 bg-paper px-4 py-3 text-sm text-navy outline-none focus:border-sky"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-navy/70 mb-2">
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t('contact.emailPlaceholder')}
                    className="w-full border border-black/15 bg-paper px-4 py-3 text-sm text-navy outline-none focus:border-sky"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-navy/70 mb-2">
                    {t('contact.phone')}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t('contact.phonePlaceholder')}
                    className="w-full border border-black/15 bg-paper px-4 py-3 text-sm text-navy outline-none focus:border-sky"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-navy/70 mb-2">
                  {t('contact.serviceType')}
                </label>
                <select
                  value={formData.service_id}
                  onChange={(e) => setFormData({ ...formData, service_id: e.target.value })}
                  className="w-full border border-black/15 bg-paper px-4 py-3 text-sm text-navy outline-none focus:border-sky"
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
                <label className="block text-[11px] font-bold uppercase tracking-wider text-navy/70 mb-2">
                  {t('contact.yourProject')}
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  placeholder={t('contact.projectPlaceholder')}
                  className="w-full border border-black/15 bg-paper px-4 py-3 text-sm text-navy outline-none focus:border-sky"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-sky py-4 text-center text-sm font-bold uppercase tracking-wider text-navy transition-colors hover:bg-navy hover:text-white disabled:opacity-50"
              >
                {submitting ? t('contact.sending') : t('contact.sendDemand')} &rarr;
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
