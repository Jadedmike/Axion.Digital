import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { sendLeadNotificationEmail } from '@/lib/email';
import { isSupabaseConfigured, saveLocalLead } from '@/lib/leads-store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, service_type } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    let data;

    if (isSupabaseConfigured()) {
      const supabase = await createClient();
      // Insert into Supabase
      const { data: insertData, error } = await supabase
        .from('leads')
        .insert([
          {
            name,
            email,
            message,
            service_type: service_type || 'general',
            status: 'new',
          },
        ])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json(
          { error: 'Failed to submit form' },
          { status: 500 }
        );
      }
      data = insertData;
    } else {
      console.warn('⚠️ Supabase is not configured. Falling back to local storage.');
      const localLead = await saveLocalLead({
        name,
        email,
        message,
        service_type: service_type || 'general',
      });
      data = [localLead];
    }

    // Send email notification (gracefully catch errors so it doesn't fail the client request)
    try {
      await sendLeadNotificationEmail({
        name,
        email,
        service_type: service_type || 'general',
        message
      });
    } catch (emailErr) {
      console.error('Email notification failed to send:', emailErr);
    }

    return NextResponse.json({ success: true, data }, { status: 201 });

  } catch (error) {

    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
