"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Globe, Bot, Workflow } from 'lucide-react';
import { Link } from '@/i18n/routing';

export function Services() {
  const t = useTranslations('HomePage.services');

  const services = [
    {
      id: 'websites',
      icon: <Globe className="h-8 w-8 text-brand-500" />,
      title: t('websites.title'),
      description: t('websites.description'),
    },
    {
      id: 'ai-chatbots',
      icon: <Bot className="h-8 w-8 text-brand-500" />,
      title: t('chatbots.title'),
      description: t('chatbots.description'),
    },
    {
      id: 'automation',
      icon: <Workflow className="h-8 w-8 text-brand-500" />,
      title: t('automation.title'),
      description: t('automation.description'),
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-50 dark:bg-slate-950/50">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="h-full"
            >
              <Link href={`/services/${service.id}`} className="block h-full group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm transition-all hover:shadow-md dark:hover:shadow-brand-500/10 hover:border-brand-500/30">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/10 transition-colors group-hover:bg-brand-100 dark:group-hover:bg-brand-500/20">
                  {service.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-800 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {service.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
