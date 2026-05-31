import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Check, ArrowRight, Zap } from 'lucide-react';
import { Contact } from '@/components/sections/contact';
import { Portfolio } from '@/components/sections/portfolio';
import { Pricing } from '@/components/sections/pricing';

export default function GrowthPlanPage() {
  const tPlan = useTranslations('PlanPages.growth');
  const tPricing = useTranslations('HomePage.pricing');
  const features = tPricing.raw('growth.features') as string[];

  return (
    <main className="flex-1 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-32 pb-24 border-b border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-brand-500 opacity-20 blur-[100px]"></div>
        <div className="container relative mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-500 to-brand-400 text-white px-4 py-1.5 text-sm font-semibold mb-6 shadow-sm">
            <Zap className="w-4 h-4 mr-2" />
            {tPricing('growth.title')} - {tPricing('mostPopular')}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-800 dark:text-white mb-6">
            {tPlan('heroTitle')}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
            {tPlan('heroSubtitle')}
          </p>
          <p className="text-lg text-slate-500 dark:text-slate-500 max-w-2xl mx-auto mb-10 italic">
            &quot;{tPlan('idealFor')}&quot;
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            {tPlan('ctaButton')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Included Features */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950/50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-12">
            {tPlan('includedTitle')}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-x-4 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-brand-200 dark:border-brand-900/30">
                <Check className="h-6 w-6 flex-none text-brand-500" />
                <span className="text-lg text-slate-700 dark:text-slate-300 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <Portfolio />

      {/* Compare Plans */}
      <div className="pt-12">
        <Pricing />
      </div>

      {/* Conversion Section */}
      <Contact />
    </main>
  );
}
