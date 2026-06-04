import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { sendLeadNotificationEmail } from '@/lib/email';
import { isSupabaseConfigured, saveLocalLead } from '@/lib/leads-store';

// دالة مساعدة لإضافة ترويسات CORS على الاستجابة
function addCorsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*'); // يمكنك استبدال * بنطاق موقعك لاحقاً للأمان
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

// معالجة طلبات OPTIONS الخاصة بالـ CORS Preflight
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return addCorsHeaders(response);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, details, service_type, budget } = body;

    // Validate input
    if (!name || !email || !details || !service_type) {
      const errorResponse = NextResponse.json(
        { error: 'Name, email, details, and service_type are required' },
        { status: 400 }
      );
      return addCorsHeaders(errorResponse);
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
        const errorResponse = NextResponse.json(
          { error: 'Failed to submit service request', details: error.message },
          { status: 500 }
        );
        return addCorsHeaders(errorResponse);
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

    const successResponse = NextResponse.json({ success: true, data }, { status: 201 });
    return addCorsHeaders(successResponse);

  } catch (error: any) {
    console.error('API error:', error);
    const errorResponse = NextResponse.json(
      { error: 'Internal server error', details: error?.message || error },
      { status: 500 }
    );
    return addCorsHeaders(errorResponse);
  }
}