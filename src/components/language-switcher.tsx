"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
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
    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-full">
      <button
        onClick={() => switchLanguage('en')}
        className={clsx(
          "px-3 py-1 rounded-full text-sm font-medium transition-colors",
          locale === 'en' 
            ? "bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-500 shadow-sm" 
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
        )}
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage('ar')}
        className={clsx(
          "px-3 py-1 rounded-full text-sm font-medium transition-colors",
          locale === 'ar' 
            ? "bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-500 shadow-sm" 
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
        )}
      >
        عربي
      </button>
    </div>
  );
}
