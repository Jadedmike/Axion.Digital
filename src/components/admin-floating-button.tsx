'use client';

import { usePathname, Link } from '@/i18n/routing';
import { Lock } from 'lucide-react';

export function AdminFloatingButton() {
  const pathname = usePathname();

  // Hide the floating button on the admin page itself
  if (pathname.includes('/admin')) {
    return null;
  }

  return (
    <Link
      href="/admin"
      className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-full border border-slate-200/80 bg-white/80 text-slate-500 hover:text-brand-500 hover:border-brand-500/30 hover:bg-white shadow-md shadow-slate-200/10 backdrop-blur-md transition-all hover:scale-105 active:scale-[0.98] dark:border-slate-800/80 dark:bg-navy-950/80 dark:text-slate-400 dark:hover:text-brand-400 dark:hover:border-brand-500/30 dark:hover:bg-navy-900 dark:shadow-none"
    >
      <Lock className="w-3.5 h-3.5" />
      <span>Admin</span>
    </Link>
  );
}
