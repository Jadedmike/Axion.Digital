"use client";

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Globe, Bot, Workflow, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { GlowCard } from '@/components/ui/glow-card';
import { useState } from 'react';

export function Services() {
  const t = useTranslations('HomePage.services');
  const locale = useLocale();

  const services = [
    {
      id: 'websites',
      icon: <Globe className="h-8 w-8 text-brand-500" />,
      title: t('websites.title'),
      description: t('websites.description'),
    },
    {
      id: 'ai-chatbots',
      icon: <Bot className="h-8 w-8 text-brand-500" />,
      title: t('chatbots.title'),
      description: t('chatbots.description'),
    },
    {
      id: 'automation',
      icon: <Workflow className="h-8 w-8 text-brand-500" />,
      title: t('automation.title'),
      description: t('automation.description'),
    }
  ];

  const easeOutCubic = [0.215, 0.61, 0.355, 1] as const;
  const learnMoreText = locale === 'ar' ? 'تعرف على المزيد' : 'Learn More';

  return (
    <section id="services" className="py-24 bg-slate-50 dark:bg-slate-950/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: easeOutCubic }}
            className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white sm:text-4xl"
          >
            {t('title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08, ease: easeOutCubic }}
            className="mt-4 text-lg text-slate-600 dark:text-slate-400"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceFlipCard 
              key={service.id} 
              service={service} 
              index={index} 
              easeOutCubic={easeOutCubic} 
              learnMoreText={learnMoreText} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceFlipCardProps {
  service: {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
  };
  index: number;
  easeOutCubic: readonly [number, number, number, number];
  learnMoreText: string;
}

function ServiceFlipCard({ service, index, easeOutCubic, learnMoreText }: ServiceFlipCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.45, 
        ease: easeOutCubic,
        delay: index * 0.08 
      }}
      className="h-[280px] w-full [perspective:1200px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{ duration: 0.45, ease: easeOutCubic }}
        className="relative w-full h-full [transform-style:preserve-3d] cursor-pointer"
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] z-10">
          <GlowCard className="h-full w-full">
            <div className="flex flex-col items-center justify-center text-center h-full p-8">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/10 transition-colors group-hover:bg-brand-100 dark:group-hover:bg-brand-500/20">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {service.title}
              </h3>
            </div>
          </GlowCard>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] z-20">
          <GlowCard className="h-full w-full" glowColor="rgba(59, 130, 246, 0.2)">
            <Link 
              href={`/services/${service.id}?service=${service.id === 'ai-chatbots' ? 'chatbots' : service.id}`}
              className="flex flex-col items-center justify-between text-center h-full p-8 group relative"
            >
              <div className="flex-1 flex items-center justify-center">
                <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-sm font-bold text-brand-600 dark:text-brand-400 group-hover:text-brand-500 dark:group-hover:text-brand-300 transition-colors">
                <span>{learnMoreText}</span>
                <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </div>
            </Link>
          </GlowCard>
        </div>
      </motion.div>
    </motion.div>
  );
}
