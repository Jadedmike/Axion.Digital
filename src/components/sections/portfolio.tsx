"use client";

import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, CheckCircle2, Quote } from 'lucide-react';
import { GlowCard } from '@/components/ui/glow-card';

export function Portfolio() {
  const t = useTranslations('HomePage.portfolio');
  const locale = useLocale();
  const projectsData = t.raw('projects') as { title: string, category: string, description?: string }[];

  const projects = [
    {
      id: 1,
      title: projectsData[0].title,
      category: projectsData[0].category,
      description: projectsData[0].description,
      color: 'bg-blue-500',
      glow: 'rgba(59, 130, 246, 0.15)',
      metrics: locale === 'ar' 
        ? ["تقليص وقت الكتابة بنسبة 90٪", "3.2 ضعف التفاعل على وسائل التواصل الاجتماعي", "نشر آلي على مدار الساعة"]
        : ["90% reduction in content writing time", "3.2x social media engagement", "24/7 automated posting pipeline"],
      tech: ["Next.js", "OpenAI GPT-4", "Python", "Supabase", "Tailwind CSS"],
      feedback: locale === 'ar'
        ? "وفر لنا هذا الوكيل الآلي 15 ساعة كل أسبوع. محتوانا الآن متسق ويجذب عملاء محتملين مؤهلين تلقائيًا."
        : "This AI agent saved us 15 hours every single week. Our content is now consistent, on-brand, and generating qualified leads automatically.",
      demoUrl: "https://demo.axion.digital/content-agent",
      caseStudyUrl: "#case-study-content-agent"
    },
    {
      id: 2,
      title: projectsData[1].title,
      category: projectsData[1].category,
      description: projectsData[1].description,
      color: 'bg-indigo-500',
      glow: 'rgba(99, 102, 241, 0.15)',
      metrics: locale === 'ar'
        ? ["تسريع دورات المعاملات بنسبة 40٪", "أكثر من 150 ألف باحث نشط شهريًا", "جاهزية بنسبة 99.9٪ لخدمة العملاء"]
        : ["40% faster real estate transaction cycles", "150k+ monthly active property searchers", "99.9% uptime performance"],
      tech: ["React", "PostgreSQL", "Google Maps API", "Redis", "Framer Motion"],
      feedback: locale === 'ar'
        ? "محرك تصفية العقارات سريع للغاية، والعملاء يعشقون أدوات البحث الجغرافي. الصفقات بدأت تكتمل بشكل أسرع."
        : "The property filtering logic is lightning fast, and clients love the spatial search tools. Transactions started closing significantly faster.",
      demoUrl: "https://demo.axion.digital/real-estate",
      caseStudyUrl: "#case-study-real-estate"
    },
    {
      id: 3,
      title: projectsData[2].title,
      category: projectsData[2].category,
      description: projectsData[2].description,
      color: 'bg-purple-500',
      glow: 'rgba(168, 85, 247, 0.15)',
      metrics: locale === 'ar'
        ? ["مزامنة العملاء تلقائيًا بنسبة 100٪", "صفر عملاء مفقودين", "توفير 18 ساعة أسبوعيًا من العمل الإداري"]
        : ["100% automated lead syncing accuracy", "Zero leads lost in transition", "Save 18 hours/week of admin task work"],
      tech: ["Zapier", "Make.com", "HubSpot API", "Node.js", "Slack Webhooks"],
      feedback: locale === 'ar'
        ? "كنا نفقد العديد من العملاء في جداول البيانات اليدوية. الآن، كل شيء يتزامن فورًا وتصل التنبيهات في Slack."
        : "We used to lose leads in manual spreadsheets. Now, everything syncs instantly, notifications ping in Slack, and deals move in real-time.",
      demoUrl: "https://demo.axion.digital/crm-sync",
      caseStudyUrl: "#case-study-crm-sync"
    },
    {
      id: 4,
      title: projectsData[3].title,
      category: projectsData[3].category,
      description: projectsData[3].description,
      color: 'bg-emerald-500',
      glow: 'rgba(16, 185, 129, 0.15)',
      metrics: locale === 'ar'
        ? ["انخفاض بنسبة 50٪ في الغيابات عن المواعيد", "أكثر من 15 ألف حجز شهري نشط", "تنبيهات تلقائية عبر البريد والرسائل القصيره"]
        : ["50% drop in booking no-shows", "15,000+ monthly active reservations", "Automated SMS/Email alert reminders"],
      tech: ["Next.js", "Twilio API", "Tailwind CSS", "Prisma", "NodeMailer"],
      feedback: locale === 'ar'
        ? "التذكيرات التلقائية للمرضى غيرت كل شيء. استعدنا ساعات عمل الاستقبال وانخفضت المقاعد الفارغة بشكل كبير."
        : "The automated patient reminders are a game changer. We reclaimed hours of receptionist time and dramatically reduced empty appointment slots.",
      demoUrl: "https://demo.axion.digital/scheduler",
      caseStudyUrl: "#case-study-scheduler"
    }
  ];

  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const easeOutCubic = [0.215, 0.61, 0.355, 1] as const;

  // Localized titles
  const textMetrics = locale === 'ar' ? 'النتائج والمؤشرات' : 'Key Metrics & Impact';
  const textTech = locale === 'ar' ? 'التقنيات المستخدمة' : 'Technologies Used';
  const textFeedback = locale === 'ar' ? 'رأي العميل' : 'Client Feedback';

  return (
    <section id="portfolio" className="py-24 bg-slate-50 dark:bg-slate-950/50 relative">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.45, 
                ease: easeOutCubic,
                delay: index * 0.08 
              }}
              layoutId={`card-container-${project.id}`}
              onClick={() => setSelectedProject(project)}
              className="h-full cursor-pointer group"
            >
              <GlowCard className="h-full aspect-[4/3] sm:aspect-[16/9]" glowColor={project.glow}>
                <div className="h-full w-full relative overflow-hidden group">
                  <div className={`absolute inset-0 opacity-20 transition-opacity group-hover:opacity-40 ${project.color}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-bold text-white bg-white/20 backdrop-blur-md rounded-full">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Popup Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              layoutId={`card-container-${selectedProject.id}`}
              className="relative w-full max-w-3xl bg-slate-900 dark:bg-navy-950 border border-slate-200/10 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
            >
              {/* Colored Glow Header Bar */}
              <div className={`h-2.5 w-full ${selectedProject.color}`} />

              <div className="p-6 md:p-10 overflow-y-auto flex-1">
                {/* Header Content */}
                <div className="flex justify-between items-start gap-4 mb-6">
                  <div>
                    <span className="inline-block px-3 py-1 mb-2.5 text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 rounded-full">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white leading-tight">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-full border border-slate-200/10 hover:border-slate-300/20 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Main Content Details */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="space-y-8"
                >
                  {/* Detailed Description */}
                  <div>
                    <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed font-normal">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Two-Column Detail Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-200/10 dark:border-slate-800/80">
                    
                    {/* Left Column: Metrics & Stack */}
                    <div className="space-y-6">
                      {/* Metrics */}
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-400 mb-3.5">
                          {textMetrics}
                        </h4>
                        <ul className="space-y-2.5">
                          {selectedProject.metrics.map((metric, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                              <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="font-semibold leading-snug">{metric}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack */}
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-400 mb-3">
                          {textTech}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tech.map((techItem, i) => (
                            <span 
                              key={i} 
                              className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border border-slate-200/30 dark:border-slate-700/30"
                            >
                              {techItem}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Client Feedback */}
                    <div className="space-y-6">
                      {/* Feedback */}
                      <div className="bg-slate-100/50 dark:bg-slate-800/20 border border-slate-200/10 dark:border-slate-800/50 rounded-2xl p-5 relative">
                        <Quote className="absolute -top-3.5 left-4 h-7 w-7 text-brand-500/20 dark:text-brand-500/10 fill-current rotate-180" />
                        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-400 mb-3.5">
                          {textFeedback}
                        </h4>
                        <p className="text-sm italic text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                          "{selectedProject.feedback}"
                        </p>
                      </div>
                    </div>

                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
