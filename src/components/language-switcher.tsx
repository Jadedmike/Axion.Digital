"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    // Preserve the current path, just switch locale
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="relative flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-full overflow-hidden border border-slate-200/30 dark:border-slate-700/30">
      <button
        onClick={() => switchLanguage('en')}
        className={clsx(
          "relative px-3.5 py-1 rounded-full text-xs font-bold transition-colors duration-300 z-10 cursor-pointer",
          locale === 'en' 
            ? "text-brand-600 dark:text-brand-400" 
            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
        )}
      >
        {locale === 'en' && (
          <motion.div
            layoutId="activeLanguagePill"
            className="absolute inset-0 bg-white dark:bg-slate-900 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.05)] -z-10"
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          />
        )}
        EN
      </button>
      <button
        onClick={() => switchLanguage('ar')}
        className={clsx(
          "relative px-3.5 py-1 rounded-full text-xs font-bold transition-colors duration-300 z-10 cursor-pointer",
          locale === 'ar' 
            ? "text-brand-600 dark:text-brand-400" 
            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
        )}
      >
        {locale === 'ar' && (
          <motion.div
            layoutId="activeLanguagePill"
            className="absolute inset-0 bg-white dark:bg-slate-900 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.05)] -z-10"
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          />
        )}
        عربي
      </button>
      <button
        onClick={() => switchLanguage('tr')}
        className={clsx(
          "relative px-3.5 py-1 rounded-full text-xs font-bold transition-colors duration-300 z-10 cursor-pointer",
          locale === 'tr' 
            ? "text-brand-600 dark:text-brand-400" 
            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
        )}
      >
        {locale === 'tr' && (
          <motion.div
            layoutId="activeLanguagePill"
            className="absolute inset-0 bg-white dark:bg-slate-900 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.05)] -z-10"
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          />
        )}
        Türkçe
      </button>
    </div>
  );
}
