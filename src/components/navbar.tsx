"use client";

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { ThemeToggle } from './theme-toggle';
import { LanguageSwitcher } from './language-switcher';
import { motion } from 'framer-motion';

export function Navbar() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();

  if (pathname.includes('/admin')) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-400">
              AXION
            </span>
          </Link>
          <div className="hidden md:flex gap-6 items-center">
            <Link href="#services" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors py-1 block">
              <motion.span
                key={`services-${locale}`}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="inline-block"
              >
                {t('services')}
              </motion.span>
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors py-1 block">
              <motion.span
                key={`pricing-${locale}`}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="inline-block"
              >
                {t('pricing')}
              </motion.span>
            </Link>
            <Link href="#portfolio" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors py-1 block">
              <motion.span
                key={`portfolio-${locale}`}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="inline-block"
              >
                {t('about')}
              </motion.span>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
