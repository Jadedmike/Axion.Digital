"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function Contact() {
  const t = useTranslations('HomePage.contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      service_type: formData.get('service'),
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
                  <label htmlFor="service" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('service')}</label>
                  <select id="service" name="service" className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow">
                    <option value="websites">{t('services.websites')}</option>
                    <option value="chatbots">{t('services.chatbots')}</option>
                    <option value="automation">{t('services.automation')}</option>
                    <option value="other">{t('services.other')}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('budget')}</label>
                  <select id="budget" name="budget" className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow">
                    <option value="under_1k">{t('budgets.under_1k')}</option>
                    <option value="1k_5k">{t('budgets.1k_5k')}</option>
                    <option value="5k_10k">{t('budgets.5k_10k')}</option>
                    <option value="10k_plus">{t('budgets.10k_plus')}</option>
                  </select>
                </div>
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
