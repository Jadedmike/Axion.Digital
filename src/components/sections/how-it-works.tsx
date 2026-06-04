"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { PhoneCall, Cpu, Rocket } from 'lucide-react';

export function HowItWorks() {
  const t = useTranslations('HomePage.howItWorks');
  const steps = t.raw('steps') as { title: string, description: string }[];

  const icons = [
    <PhoneCall className="h-6 w-6 text-brand-500" key="phone" />,
    <Cpu className="h-6 w-6 text-brand-500" key="cpu" />,
    <Rocket className="h-6 w-6 text-brand-500" key="rocket" />
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-slate-950/50 relative overflow-hidden">
      {/* Visual top/bottom separator borders */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block rounded-full bg-brand-50 dark:bg-brand-500/10 px-4 py-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 mb-4 uppercase tracking-wider"
          >
            آلية العمل / The Process
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white sm:text-4xl"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-slate-600 dark:text-slate-400"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connector Line (Horizontal on desktop, hidden on mobile) */}
          <div className="absolute top-[32px] left-4 right-4 h-0.5 bg-slate-200 dark:bg-slate-800 hidden md:block z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Step Icon Container */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md transition-all duration-300 group-hover:border-brand-500 group-hover:shadow-brand-500/15 group-hover:scale-105">
                  {icons[index % icons.length]}
                </div>

                {/* Step Title */}
                <h3 className="mb-3 text-xl font-bold text-slate-800 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm max-w-sm px-4">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
