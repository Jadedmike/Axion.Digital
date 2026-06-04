import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { sendLeadNotificationEmail } from '@/lib/email';
import { isSupabaseConfigured, saveLocalLead } from '@/lib/leads-store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, details, service_type, budget } = body;

    // Validate input
    if (!name || !email || !details || !service_type) {
      return NextResponse.json(
        { error: 'Name, email, details, and service_type are required' },
        { status: 400 }
      );
    }

    const message = budget 
      ? `Budget: ${budget}\n\nDetails: ${details}` 
      : details;

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
            service_type,
            status: 'new',
          },
        ])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json(
          { error: 'Failed to submit service request' },
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
        service_type,
      });
      data = [localLead];
    }

    // Send email notification (gracefully catch errors so it doesn't fail the client request)
    try {
      await sendLeadNotificationEmail({
        name,
        email,
        service_type,
        message: details,
        budget: budget || undefined
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





