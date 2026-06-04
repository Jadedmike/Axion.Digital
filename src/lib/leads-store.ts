import fs from 'fs/promises';
import path from 'path';

const LEADS_FILE = path.join(process.cwd(), 'leads.json');

export function isSupabaseConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

async function readLeadsFile(): Promise<any[]> {
  try {
    const data = await fs.readFile(LEADS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return [];
    }
    console.error('Error reading leads file:', error);
    return [];
  }
}

async function writeLeadsFile(leads: any[]): Promise<boolean> {
  try {
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing leads file:', error);
    return false;
  }
}

export async function saveLocalLead(leadData: any): Promise<any> {
  console.log('📬 [Local Fallback] Saving new Lead:', leadData);
  const leads = await readLeadsFile();
  const newLead = {
    id: Date.now().toString(),
    ...leadData,
    created_at: new Date().toISOString()
  };
  leads.push(newLead);
  await writeLeadsFile(leads);
  return newLead;
}

export async function getLocalLeads(): Promise<any[]> {
  const leads = await readLeadsFile();
  return leads.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function updateLocalLeadStatus(id: string, status: string): Promise<any> {
  const leads = await readLeadsFile();
  const leadIndex = leads.findIndex((lead: any) => lead.id === id);
  if (leadIndex === -1) return null;
  
  leads[leadIndex].status = status;
  await writeLeadsFile(leads);
  return leads[leadIndex];
}

export async function deleteLocalLead(id: string): Promise<boolean> {
  const leads = await readLeadsFile();
  const initialLength = leads.length;
  const filteredLeads = leads.filter((lead: any) => lead.id !== id);
  if (filteredLeads.length === initialLength) return false;
  
  await writeLeadsFile(filteredLeads);
  return true;
}
