"use client";

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Briefcase, CheckCircle2, Trash2, Mail, Calendar, MessageSquare, AlertCircle, RefreshCw } from 'lucide-react';
import { Link, useRouter } from '@/i18n/routing';

interface Lead {
  id: string;
  name: string;
  email: string;
  message: string;
  service_type: string;
  status: 'new' | 'in_progress' | 'completed';
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'DELETE',
      });
      router.refresh();
    } catch (err) {
      console.error(err);
      alert('Failed to log out');
    }
  };
  const [error, setError] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // 🛠️ تم تعديل المسار هنا إلى /api/leads لجلب البيانات بشكل صحيح
  const fetchLeads = useCallback(async (showLoading = false) => {
    try {
      if (showLoading) {
        setIsLoading(true);
      }
      const response = await fetch('/api/leads');
      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }
      const data = await response.json();
      setLeads(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Could not connect to the database. Make sure your Supabase environment variables are configured.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLeads(false);
  }, [fetchLeads]);

  // 🛠️ تم تعديل المسار هنا لتحديث حالة الطلب في المكان الصحيح
  const handleUpdateStatus = async (id: string, newStatus: 'new' | 'in_progress' | 'completed') => {
    try {
      const response = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  // 🛠️ تم تعديل المسار هنا لحذف الطلب من المكان الصحيح
  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead? This action cannot be undone.')) {
      return;
    }
    try {
      const response = await fetch(`/api/leads?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete lead');
      }
      setLeads(prev => prev.filter(lead => lead.id !== id));
      setSelectedLead(null);
    } catch (err) {
      console.error(err);
      alert('Failed to delete lead');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">New</span>;
      case 'in_progress':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">In Progress</span>;
      case 'completed':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">Completed</span>;
      default:
        return null;
    }
  };

  // Calculate real stats
  const totalLeads = leads.length;
  const activeLeads = leads.filter(l => l.status === 'new' || l.status === 'in_progress').length;
  const completedLeads = leads.filter(l => l.status === 'completed').length;

  const stats = [
    {
      title: 'Total Leads',
      value: totalLeads.toString(),
      icon: <Users className="h-6 w-6 text-blue-500" />,
      description: 'Total submissions received',
    },
    {
      title: 'Active Requests',
      value: activeLeads.toString(),
      icon: <Briefcase className="h-6 w-6 text-amber-500" />,
      description: 'New or in progress requests',
    },
    {
      title: 'Completed Projects',
      value: completedLeads.toString(),
      icon: <CheckCircle2 className="h-6 w-6 text-emerald-500" />,
      description: 'Successfully archived projects',
    }
  ];

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchLeads(true)}
            disabled={isLoading}
            className="p-2 border border-slate-300 rounded-md hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <Link href="/" className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700">
            Back to Site
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 active:scale-[0.98]"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Connection Error Banner */}
      {error && (
        <div className="flex items-center gap-3 mt-6 p-4 text-sm rounded-xl border border-red-200 bg-red-50 text-red-800 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-400">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div>{error}</div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50 p-6"
          >
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</h3>
              {stat.icon}
            </div>
            <div>
              <div className="text-2xl font-bold">{isLoading ? '...' : stat.value}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stat.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Leads Table or Empty State */}
      <div className="grid gap-4 grid-cols-1 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 p-6"
        >
          <div className="flex flex-col space-y-1.5 pb-4">
            <h3 className="font-semibold leading-none tracking-tight text-slate-900 dark:text-white">Recent Leads</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Manage incoming service requests from the contact forms</p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <RefreshCw className="h-8 w-8 text-brand-500 animate-spin mb-3" />
              <p className="text-sm text-slate-500 dark:text-slate-400">Loading leads...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
              <MessageSquare className="h-10 w-10 text-slate-400 dark:text-slate-600 mb-4" />
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white mb-1">No Leads Yet</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-4">
                Submissions from the contact and request form will display here dynamically in real time.
              </p>
              <Link href="/" className="text-brand-500 text-sm font-semibold hover:underline">
                Go submit a test lead
              </Link>
            </div>
          ) : (
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b border-slate-200 dark:border-slate-800">
                  <tr className="border-b transition-colors hover:bg-slate-100/50 dark:hover:bg-slate-800/50">
                    <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Name</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Service Type</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Date</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-slate-500 dark:text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-slate-200 dark:border-slate-800 transition-colors hover:bg-slate-100/50 dark:hover:bg-slate-800/50">
                      <td className="p-4 align-middle font-medium text-slate-900 dark:text-slate-100">
                        <div className="flex flex-col">
                          <span>{lead.name}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">{lead.email}</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle text-slate-700 dark:text-slate-300 capitalize">{lead.service_type || 'general'}</td>
                      <td className="p-4 align-middle">{getStatusBadge(lead.status)}</td>
                      <td className="p-4 align-middle text-slate-700 dark:text-slate-300">
                        {new Date(lead.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="p-4 align-middle text-right space-x-2">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="text-brand-600 hover:underline dark:text-brand-400 font-medium text-sm"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Lead Details</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Submitted via Website Form</p>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                {/* Profile Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Client Name</span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium">{selectedLead.name}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Service Requested</span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium capitalize">{selectedLead.service_type || 'general'}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Email Address</span>
                    <div className="flex items-center gap-2 mt-1">
                      <a href={`mailto:${selectedLead.email}`} className="text-brand-500 hover:underline inline-flex items-center gap-1 font-medium">
                        <Mail className="h-4 w-4" />
                        {selectedLead.email}
                      </a>
                    </div>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Date Submitted</span>
                    <span className="text-slate-700 dark:text-slate-300 inline-flex items-center gap-1 text-sm mt-1">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      {new Date(selectedLead.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Current Status</span>
                    <span className="inline-block mt-1">{getStatusBadge(selectedLead.status)}</span>
                  </div>
                </div>

                {/* Message Content */}
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 dark:bg-slate-950/40 dark:border-slate-800/80">
                  <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Message Details</span>
                  <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                    {selectedLead.message}
                  </p>
                </div>

                {/* Status Switcher & Delete Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Update Status</span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleUpdateStatus(selectedLead.id, 'new')}
                        className={`px-3 py-1 text-xs font-semibold rounded-md border transition-all ${selectedLead.status === 'new' ? 'bg-blue-500 border-blue-500 text-white shadow-sm' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
                      >
                        New
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedLead.id, 'in_progress')}
                        className={`px-3 py-1 text-xs font-semibold rounded-md border transition-all ${selectedLead.status === 'in_progress' ? 'bg-amber-500 border-amber-500 text-white shadow-sm' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
                      >
                        In Progress
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedLead.id, 'completed')}
                        className={`px-3 py-1 text-xs font-semibold rounded-md border transition-all ${selectedLead.status === 'completed' ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
                      >
                        Completed
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteLead(selectedLead.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-950/20 text-xs font-semibold mt-auto"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete Lead
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}