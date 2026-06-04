"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from '@/i18n/routing';

export function Hero() {
  const t = useTranslations('HomePage.hero');

  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-32">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-brand-500 opacity-20 blur-[100px]"></div>
      
      <div className="container relative mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 px-7 py-2 backdrop-blur-md"
        >
          <Sparkles className="h-5 w-5 text-brand-500" />
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {t('brand')}
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white sm:text-6xl lg:text-7xl leading-tight"
        >
          {t('title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400 sm:text-xl"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#contact"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-slate-800 dark:bg-white px-8 py-3.5 text-sm font-semibold text-white dark:text-slate-900 shadow-sm hover:bg-slate-700 dark:hover:bg-slate-200 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            {t('getStarted')}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#services"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-slate-800 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            {t('viewServices')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
