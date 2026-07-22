import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, location, service, consent, honeypot } = body;

    // 1. Spam protection (Honeypot check)
    if (honeypot) {
      return NextResponse.json(
        { success: false, error: 'Spam submission detected.' },
        { status: 400 }
      );
    }

    // 2. Server-side Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Full Name is required.' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Phone Number is required.' },
        { status: 400 }
      );
    }

    if (email && typeof email === 'string' && email.length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { success: false, error: 'Please enter a valid email address.' },
          { status: 400 }
        );
      }
    }

    // 3. Lead Storage / Record
    const leadRecord = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: (email || '').trim(),
      phone: phone.trim(),
      message: (message || '').trim(),
      location: (location || 'New Zealand').trim(),
      service: (service || 'General Plumbing').trim(),
      consent: !!consent,
    };

    // Log received lead securely
    console.log('[LEAD RECEIVED]:', JSON.stringify(leadRecord));

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your quote request has been received. A certificated technician will call you shortly.',
        leadId: leadRecord.id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[LEAD API ERROR]:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected server error occurred. Please try calling 0800 845 524 directly.' },
      { status: 500 }
    );
  }
}
