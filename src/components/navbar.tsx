import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ThemeToggle } from './theme-toggle';
import { LanguageSwitcher } from './language-switcher';

export function Navbar() {
  const t = useTranslations('Navigation');

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
            <Link href="#services" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              {t('services')}
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              {t('pricing')}
            </Link>
            <Link href="#portfolio" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              {t('about')}
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
