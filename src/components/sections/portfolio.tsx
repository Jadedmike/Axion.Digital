"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function Portfolio() {
  const t = useTranslations('HomePage.portfolio');
  const projectsData = t.raw('projects') as { title: string, category: string }[];

  const projects = [
    {
      id: 1,
      title: projectsData[0].title,
      category: projectsData[0].category,
      color: 'bg-blue-500',
    },
    {
      id: 2,
      title: projectsData[1].title,
      category: projectsData[1].category,
      color: 'bg-indigo-500',
    },
    {
      id: 3,
      title: projectsData[2].title,
      category: projectsData[2].category,
      color: 'bg-purple-500',
    },
    {
      id: 4,
      title: projectsData[3].title,
      category: projectsData[3].category,
      color: 'bg-emerald-500',
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-slate-50 dark:bg-slate-950/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl bg-slate-200 dark:bg-slate-800 aspect-[4/3] sm:aspect-[16/9]"
            >
              <div className={`absolute inset-0 opacity-20 transition-opacity group-hover:opacity-40 ${project.color}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 transition-transform group-hover:translate-y-0">
                <span className="inline-block px-3 py-1 mb-3 text-xs font-medium text-white bg-white/20 backdrop-blur-md rounded-full">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
