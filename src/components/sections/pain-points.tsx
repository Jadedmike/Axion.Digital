"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Clock, UserX, Layers, TrendingDown } from 'lucide-react';

export function PainPoints() {
  const t = useTranslations('HomePage.painPoints');
  const pointsData = t.raw('points') as string[];

  const icons = [
    <Clock className="h-6 w-6 text-red-500" key="clock" />,
    <UserX className="h-6 w-6 text-red-500" key="userx" />,
    <Layers className="h-6 w-6 text-red-500" key="layers" />,
    <TrendingDown className="h-6 w-6 text-red-500" key="trending" />
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute right-0 top-1/4 -z-10 h-[250px] w-[250px] rounded-full bg-red-500 opacity-5 blur-[80px]"></div>

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block rounded-full bg-red-50 dark:bg-red-500/10 px-4 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 mb-4 uppercase tracking-wider"
          >
            الوضع الحالي / Current State
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {pointsData.map((pointText, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all hover:border-red-500/20"
            >
              <div className="flex-none flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 dark:bg-red-500/10">
                {icons[index % icons.length]}
              </div>
              <div className="flex-1">
                <p className="text-slate-700 dark:text-slate-300 font-medium text-base leading-relaxed">
                  {pointText}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
