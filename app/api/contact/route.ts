import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { BUSINESS } from "@/lib/constants";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  // Honeypot tripped: pretend success so bots don't learn to skip the field.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured; contact form email not sent.");
    return NextResponse.json({ ok: false, error: "email_not_configured" }, { status: 503 });
  }

  const { name, email, phone, message } = parsed.data;

  // Resend's sandbox sender (no verified domain yet) can only deliver to the
  // Resend account's own signup address. Set CONTACT_TO_EMAIL to override the
  // recipient until a domain is verified; remove it afterwards to fall back
  // to the real business inbox.
  const toEmail = process.env.CONTACT_TO_EMAIL || BUSINESS.email;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `J&J Fair Automobile Website <onboarding@resend.dev>`,
      to: toEmail,
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${name}`,
      text: [
        `Name: ${name}`,
        `E-Mail: ${email}`,
        phone ? `Telefon: ${phone}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 });
  }
}
