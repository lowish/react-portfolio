import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'name, email, and message are required' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Server misconfiguration: missing RESEND_API_KEY' },
        { status: 500 }
      );
    }

    const toEmail = process.env.RESEND_TO_EMAIL;
    if (!toEmail) {
      return NextResponse.json(
        { success: false, error: 'Server misconfiguration: missing RESEND_TO_EMAIL' },
        { status: 500 }
      );
    }

    // Send email to portfolio owner
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: toEmail,
      subject: `New message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
      replyTo: email,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: email,
      subject: 'We received your message!',
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for reaching out! I've received your message and appreciate you taking the time to connect.</p>
        <p>I specialize in web development and full-stack development. I'm excited to explore how we can work together on your project.</p>
        <p>I'll get back to you within 24 hours with my thoughts. In the meantime, feel free to reply to this email if you have any questions.</p>
        <p>Looking forward to chatting!</p>
        <p>Best regards,<br />Your Portfolio</p>
      `,
    });

    return NextResponse.json({ success: true, data: response }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
