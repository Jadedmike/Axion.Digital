"use client";

import { useState, useEffect, Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

function ContactForm() {
  const t = useTranslations('HomePage.contact');
  const tPricing = useTranslations('HomePage.pricing');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');
  
  const [selectedService, setSelectedService] = useState('websites');

  // Sync state if query parameter changes
  useEffect(() => {
    if (serviceParam) {
      if (['websites', 'chatbots', 'automation', 'starter', 'growth', 'business-system', 'other'].includes(serviceParam)) {
        setSelectedService(serviceParam);
      }
    }
  }, [serviceParam]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const serviceType = formData.get('service');
    const specifyService = formData.get('specifyService');
    const countryCode = formData.get('countryCode');
    const phoneNumber = formData.get('phone');
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: `${countryCode} ${phoneNumber}`,
      service_type: serviceType === 'other' && specifyService ? `Other: ${specifyService}` : serviceType,
      budget: formData.get('budget'),
      details: formData.get('message'),
    };

    try {
      const response = await fetch('/api/request-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch {
      setError(t('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white sm:text-4xl"
          >
            {t('title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-slate-600 dark:text-slate-400"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800"
        >
          {success ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{t('successTitle')}</h3>
              <p className="text-slate-600 dark:text-slate-400">{t('successMessage')}</p>
              <button 
                onClick={() => setSuccess(false)}
                className="mt-8 text-brand-600 dark:text-brand-400 hover:underline font-medium"
              >
                {t('submitAnother')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('name')}</label>
                  <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow" placeholder={t('name')} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('email')}</label>
                  <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow" placeholder={t('email')} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('phone')}</label>
                  <div className="flex rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 overflow-hidden focus-within:ring-2 focus-within:ring-brand-500 transition-shadow">
                    <select
                      name="countryCode"
                      defaultValue="+90"
                      className="px-3 py-3 border-r border-slate-300 dark:border-slate-700 bg-transparent text-slate-800 dark:text-white outline-none cursor-pointer text-sm font-semibold max-w-[100px] dark:bg-slate-950"
                    >
                      <option value="+90" className="bg-white dark:bg-slate-950">TR (+90)</option>
                      <option value="+966" className="bg-white dark:bg-slate-950">SA (+966)</option>
                      <option value="+962" className="bg-white dark:bg-slate-950">JO (+962)</option>
                      <option value="+1" className="bg-white dark:bg-slate-950">US (+1)</option>
                      <option value="+44" className="bg-white dark:bg-slate-950">UK (+44)</option>
                      <option value="+971" className="bg-white dark:bg-slate-950">AE (+971)</option>
                      <option value="+20" className="bg-white dark:bg-slate-950">EG (+20)</option>
                      <option value="+974" className="bg-white dark:bg-slate-950">QA (+974)</option>
                      <option value="+965" className="bg-white dark:bg-slate-950">KW (+965)</option>
                      <option value="+973" className="bg-white dark:bg-slate-950">BH (+973)</option>
                      <option value="+968" className="bg-white dark:bg-slate-950">OM (+968)</option>
                    </select>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      required 
                      pattern="[0-9\s\-]{6,12}"
                      className="w-full px-4 py-3 bg-transparent text-slate-800 dark:text-white outline-none border-none focus:ring-0" 
                      placeholder={t('phonePlaceholder')} 
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('budget')}</label>
                  <select id="budget" name="budget" className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow cursor-pointer">
                    <option value="under_1k">{t('budgets.under_1k')}</option>
                    <option value="1k_5k">{t('budgets.1k_5k')}</option>
                    <option value="5k_10k">{t('budgets.5k_10k')}</option>
                    <option value="10k_plus">{t('budgets.10k_plus')}</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div className={selectedService === 'other' ? "col-span-1" : "col-span-1 md:col-span-2"}>
                  <label htmlFor="service" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('service')}</label>
                  <select 
                    id="service" 
                    name="service" 
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow cursor-pointer"
                  >
                    <option value="websites">{t('services.websites')}</option>
                    <option value="chatbots">{t('services.chatbots')}</option>
                    <option value="automation">{t('services.automation')}</option>
                    <option value="starter">{tPricing('starter.title')}</option>
                    <option value="growth">{tPricing('growth.title')}</option>
                    <option value="business-system">{tPricing('business.title')}</option>
                    <option value="other">{t('services.other')}</option>
                  </select>
                </div>

                {selectedService === 'other' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="col-span-1"
                  >
                    <label htmlFor="specifyService" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('specifyService')}</label>
                    <input 
                      type="text" 
                      id="specifyService" 
                      name="specifyService" 
                      required 
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow" 
                      placeholder={t('specifyServicePlaceholder')} 
                    />
                  </motion.div>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('details')}</label>
                <textarea id="message" name="message" required rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow resize-none" placeholder={t('details')}></textarea>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-semibold shadow-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('submitting') : t('submit')}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <Suspense fallback={null}>
      <ContactForm />
    </Suspense>
  );
}
