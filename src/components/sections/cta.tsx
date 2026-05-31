"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

export function Cta() {
  const t = useTranslations('HomePage.cta');

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-brand-600 dark:bg-brand-900"></div>
      <div className="absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[100px] bg-white rounded-full"></div>
      
      <div className="container relative mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-8">
            {t('title')}
          </h2>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-brand-600 shadow-sm hover:bg-slate-50 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t('button')}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
