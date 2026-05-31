import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

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

    const supabase = await createClient();

    // Format the message with budget if provided
    const message = budget 
      ? `Budget: ${budget}\n\nDetails: ${details}` 
      : details;

    // Insert into Supabase
    const { data, error } = await supabase
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

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
