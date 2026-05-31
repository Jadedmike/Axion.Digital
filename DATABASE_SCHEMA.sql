-- Create leads table
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  service_type TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts to leads table
CREATE POLICY "Allow anonymous inserts to leads" ON leads FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Allow authenticated users (Admins) full access
CREATE POLICY "Allow authenticated users full access to leads" ON leads FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated users full access to projects" ON projects FOR ALL TO authenticated USING (true);

-- Allow public read access to projects
CREATE POLICY "Allow public read access to projects" ON projects FOR SELECT TO anon, authenticated USING (true);
