"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from '@/i18n/routing';

export function Pricing() {
  const t = useTranslations('HomePage.pricing');

  const plans = [
    {
      id: 'starter',
      name: t('starter.title'),
      tagline: t('starter.tagline'),
      description: t('starter.description'),
      features: t.raw('starter.features') as string[],
      cta: t('starter.cta'),
      popular: false,
      serviceType: 'starter',
    },
    {
      id: 'growth',
      name: t('growth.title'),
      tagline: t('growth.tagline'),
      description: t('growth.description'),
      features: t.raw('growth.features') as string[],
      cta: t('growth.cta'),
      popular: true,
      serviceType: 'growth',
    },
    {
      id: 'business-system',
      name: t('business.title'),
      tagline: t('business.tagline'),
      description: t('business.description'),
      features: t.raw('business.features') as string[],
      cta: t('business.cta'),
      popular: false,
      serviceType: 'business-system',
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className={`relative flex flex-col rounded-3xl p-8 shadow-xl ring-1 transition-all duration-300 ease-out hover:z-20 ${
                plan.popular 
                  ? 'bg-slate-800 dark:bg-white ring-slate-800 dark:ring-white scale-105 z-10 hover:scale-[1.08] hover:shadow-2xl hover:shadow-slate-950/20 dark:hover:shadow-brand-500/15 dark:hover:ring-white/95' 
                  : 'bg-white dark:bg-slate-900 ring-slate-200 dark:ring-slate-800 hover:scale-[1.03] hover:shadow-2xl dark:hover:shadow-brand-500/10 hover:ring-brand-500/30 dark:hover:ring-brand-500/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 inset-x-0 mx-auto w-32 rounded-full bg-gradient-to-r from-brand-500 to-brand-400 px-3 py-1 text-center text-xs font-semibold leading-5 text-white shadow-sm">
                  {t('mostPopular')}
                </div>
              )}
              <div className="mb-6">
                <h3 className={`text-2xl font-bold ${plan.popular ? 'text-white dark:text-slate-800' : 'text-slate-800 dark:text-white'}`}>
                  {plan.name}
                </h3>
                <p className={`mt-2 text-sm ${plan.popular ? 'text-slate-300 dark:text-slate-600' : 'text-slate-600 dark:text-slate-400'}`}>
                  {plan.description}
                </p>
                {plan.tagline && (
                  <p className={`mt-3 text-xs italic font-medium leading-relaxed border-s-2 ps-3 ${
                    plan.popular 
                      ? 'text-brand-300 border-brand-400 dark:text-slate-600 dark:border-slate-400' 
                      : 'text-slate-500 border-brand-500 dark:text-slate-400'
                  }`}>
                    {plan.tagline}
                  </p>
                )}
              </div>
              <ul className={`flex-1 space-y-4 text-sm leading-6 ${plan.popular ? 'text-slate-300 dark:text-slate-600' : 'text-slate-600 dark:text-slate-400'}`}>
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className={`h-6 w-5 flex-none ${plan.popular ? 'text-brand-400 dark:text-brand-600' : 'text-brand-500'}`} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={`/plans/${plan.id}?service=${plan.serviceType}`}
                className={`mt-8 block rounded-full px-3.5 py-3 text-center text-sm font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-brand-500 text-white hover:bg-brand-400 dark:bg-brand-600 dark:hover:bg-brand-500 shadow-sm'
                    : 'bg-brand-50 text-brand-600 hover:bg-brand-100 dark:bg-slate-800 dark:text-brand-400 dark:hover:bg-slate-700 ring-1 ring-inset ring-brand-200 dark:ring-slate-700'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
