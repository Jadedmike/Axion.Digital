import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';
import { Inter, Cairo } from 'next/font/google';
import clsx from 'clsx';
import { ThemeProvider } from '@/components/theme-provider';
import { AdminFloatingButton } from '@/components/admin-floating-button';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo' });

export const metadata: Metadata = {
  title: 'Axion Digital - Build. Automate. Scale.',
  description: 'We design websites, AI systems, and automation solutions that grow your business.',
  verification: {
    google: '1cp0CAmsbXNPjaOSkFv7Y3dXWHZ8jh3QA0YbLKozeMs',
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  const messages = await getMessages();
  const isRtl = locale === 'ar';

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={clsx(
        "min-h-screen bg-background text-foreground antialiased selection:bg-brand-500/30",
        isRtl ? cairo.className : inter.className
      )}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <AdminFloatingButton />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}