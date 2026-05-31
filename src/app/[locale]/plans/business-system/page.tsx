import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { Contact } from '@/components/sections/contact';
import { Portfolio } from '@/components/sections/portfolio';
import { Pricing } from '@/components/sections/pricing';

export default function BusinessPlanPage() {
  const tPlan = useTranslations('PlanPages.business');
  const tPricing = useTranslations('HomePage.pricing');
  const features = tPricing.raw('business.features') as string[];

  return (
    <main className="flex-1 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 dark:bg-slate-950 pt-32 pb-24 border-b border-slate-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[400px] w-[400px] rounded-full bg-brand-500 opacity-20 blur-[120px]"></div>
        <div className="container relative mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-brand-500/20 text-brand-300 px-4 py-1.5 text-sm font-semibold mb-6 ring-1 ring-brand-500/30">
            <ShieldCheck className="w-4 h-4 mr-2" />
            {tPricing('business.title')}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            {tPlan('heroTitle')}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            {tPlan('heroSubtitle')}
          </p>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 italic">
            &quot;{tPlan('idealFor')}&quot;
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-brand-400 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            {tPlan('ctaButton')}
            <ArrowRight className="h-5 w-5" />
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
              <div key={index} className="flex items-start gap-x-4 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 transition-colors">
                <Check className="h-6 w-6 flex-none text-brand-500 mt-1" />
                <span className="text-xl text-slate-800 dark:text-slate-200 font-semibold">{feature}</span>
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
