import fs from 'fs';
import path from 'path';

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

export async function getLocalLeads() {
  try {
    ensureLeadsFile();
    const data = fs.readFileSync(leadsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to read local leads:', error);
    return [];
  }
}

export async function saveLocalLead(leadData) {
  // نقوم بطباعة البيانات في السجلات
  console.log('📬 [Local Fallback] New Lead Received:', leadData);

  // ونقوم بحفظها في ملف JSON لتعرض في لوحة التحكم (Admin Dashboard)
  ensureLeadsFile();
  const leads = await getLocalLeads();
  const newLead = {
    id: Date.now().toString(),
    ...leadData,
    status: 'new',
    created_at: new Date().toISOString()
  };
  leads.unshift(newLead);
  fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf8');
  return newLead;
}
