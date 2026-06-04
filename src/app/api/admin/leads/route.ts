import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { isSupabaseConfigured, getLocalLeads, updateLocalLeadStatus, deleteLocalLead } from '@/lib/leads-store';

export async function GET() {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (isSupabaseConfigured()) {
      const supabase = await createClient();
      const { data: leads, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to fetch leads from Supabase:', error);
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
      }

      return NextResponse.json(leads || []);
    } else {
      console.warn('⚠️ Supabase is not configured. Loading leads from local storage.');
      const localLeads = await getLocalLeads();
      return NextResponse.json(localLeads);
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status are required' }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', id)
        .select();

      if (error) {
        console.error('Failed to update lead status:', error);
        return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
      }

      return NextResponse.json(data ? data[0] : null);
    } else {
      console.warn('⚠️ Supabase is not configured. Updating lead in local storage.');
      const updatedLead = await updateLocalLeadStatus(id, status);
      if (!updatedLead) {
        return NextResponse.json({ error: 'Lead not found locally' }, { status: 404 });
      }
      return NextResponse.json(updatedLead);
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      const supabase = await createClient();
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Failed to delete lead:', error);
        return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    } else {
      console.warn('⚠️ Supabase is not configured. Deleting lead from local storage.');
      const success = await deleteLocalLead(id);
      if (!success) {
        return NextResponse.json({ error: 'Lead not found locally' }, { status: 404 });
      }
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

