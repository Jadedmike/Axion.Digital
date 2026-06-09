import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Check, ArrowRight } from 'lucide-react';
import { Contact } from '@/components/sections/contact';
import { Services } from '@/components/sections/services';

export default function AIChatbotsServicePage() {
  const t = useTranslations('ServicePages.aiChatbots');
  const types = t.raw('types') as string[];
  const benefits = t.raw('benefits') as string[];

  return (
    <main className="flex-1 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-32 pb-24 border-b border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-800 dark:text-white mb-6">
            {t('heroTitle')}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
            {types.join(' • ')}
          </p>
          <Link
            href="?service=chatbots#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            {t('ctaButton')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Types & Benefits */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">
                {t('typesTitle')}
              </h2>
              <ul className="space-y-4">
                {types.map((type, index) => (
                  <li key={index} className="flex gap-x-3 text-slate-600 dark:text-slate-400 text-lg">
                    <Check className="h-6 w-5 flex-none text-brand-500" />
                    {type}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">
                {t('benefitsTitle')}
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-x-3 text-slate-600 dark:text-slate-400 text-lg">
                    <Check className="h-6 w-5 flex-none text-brand-500" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <div className="pt-12">
        <Services />
      </div>

      {/* Conversion Section */}
      <Contact />
    </main>
  );
}
