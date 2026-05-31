import { isAdminAuthenticated } from '@/lib/admin-auth';
import { AdminLoginForm } from '@/components/admin-login-form';

export const metadata = {
  title: 'Admin Dashboard - Axion Digital',
  description: 'Manage leads and projects',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isAdminAuthenticated();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-900">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {authenticated ? children : <AdminLoginForm />}
      </div>
    </div>
  );
}
