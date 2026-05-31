'use client';

import { useState } from 'react';
import { useRouter, Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, AlertCircle, Loader2 } from 'lucide-react';

export function AdminLoginForm() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Refresh the page so the Server Component Layout detects the updated session cookie
        router.refresh();
      } else {
        setError(data.error || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during authentication. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      {/* Decorative Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-brand-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-blue-600/5 blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        {/* Logo/Branding Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-500 mb-4 shadow-sm"
          >
            <Lock className="w-6 h-6" />
          </motion.div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Access Portal
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Enter your secret key to manage Axion Digital
          </p>
        </div>

        {/* Login Card */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/70 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-navy-900/40 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 p-3 text-xs font-medium rounded-xl border border-red-200 bg-red-50 text-red-800 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-400"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Password Input Group */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider"
              >
                Admin Password
              </label>
              <div className="relative rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 focus-within:border-brand-500/50 focus-within:ring-2 focus-within:ring-brand-500/15 transition-all">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full h-11 pl-4 pr-11 text-sm bg-transparent outline-none text-slate-800 dark:text-slate-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full h-11 flex items-center justify-center font-semibold text-sm rounded-xl text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-md shadow-brand-500/10 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Verifying...
                </>
              ) : (
                'Unlock Dashboard'
              )}
            </button>
          </form>
        </div>

        {/* Footer/Help Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs font-semibold text-brand-500 hover:underline transition-all"
          >
            ← Return to Homepage
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
