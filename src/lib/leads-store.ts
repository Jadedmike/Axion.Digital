import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

export interface Lead {
  id: string;
  name: string;
  email: string;
  message: string;
  service_type: string;
  status: 'new' | 'in_progress' | 'completed';
  created_at: string;
}

const leadsFilePath = path.join(process.cwd(), 'src', 'data', 'leads.json');

// Ensure directory and file exist
function ensureLeadsFile() {
  const dir = path.dirname(leadsFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(leadsFilePath)) {
    fs.writeFileSync(leadsFilePath, JSON.stringify([], null, 2), 'utf8');
  }
}

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) return false;
  if (url === 'your-supabase-project-url' || key === 'your-supabase-anon-key') return false;
  if (!url.startsWith('http://') && !url.startsWith('https://')) return false;
  
  return true;
}

export async function getLocalLeads(): Promise<Lead[]> {
  try {
    ensureLeadsFile();
    const data = fs.readFileSync(leadsFilePath, 'utf8');
    return JSON.parse(data) as Lead[];
  } catch (error) {
    console.error('Failed to read local leads:', error);
    return [];
  }
}

export async function saveLocalLead(lead: Omit<Lead, 'id' | 'created_at' | 'status'>): Promise<Lead> {
  // نقوم بطباعة البيانات في السجلات
  console.log('📬 [Local Fallback] New Lead Received:', lead);

  // ونقوم بحفظها في ملف JSON لتعرض في لوحة التحكم (Admin Dashboard)
  ensureLeadsFile();
  const leads = await getLocalLeads();
  const newLead: Lead = {
    ...lead,
    id: Date.now().toString(),
    status: 'new',
    created_at: new Date().toISOString()
  };
  leads.unshift(newLead);
  fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf8');
  return newLead;
}

export async function updateLocalLeadStatus(id: string, status: 'new' | 'in_progress' | 'completed'): Promise<Lead | null> {
  ensureLeadsFile();
  const leads = await getLocalLeads();
  const index = leads.findIndex(l => l.id === id);
  if (index === -1) return null;
  leads[index].status = status;
  fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf8');
  return leads[index];
}

export async function deleteLocalLead(id: string): Promise<boolean> {
  ensureLeadsFile();
  const leads = await getLocalLeads();
  const filtered = leads.filter(l => l.id !== id);
  if (filtered.length === leads.length) return false;
  fs.writeFileSync(leadsFilePath, JSON.stringify(filtered, null, 2), 'utf8');
  return true;
}
