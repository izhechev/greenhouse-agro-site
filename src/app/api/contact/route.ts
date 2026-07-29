import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site-config";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, city, area, service, roofShape, message, formName } = body;

  if (!phone || !service) {
    return NextResponse.json(
      { error: "Телефон и услуга са задължителни." },
      { status: 400 },
    );
  }

  const lines = [
    `Форма: ${formName || "Контакт"}`,
    `Име: ${name || "-"}`,
    `Email: ${email || "-"}`,
    `Телефон: ${phone}`,
    `Населено място: ${city || "-"}`,
    `Квадратура: ${area || "-"}`,
    `Услуга: ${service}`,
    `Структура на покрива: ${roofShape || "-"}`,
    `Съобщение: ${message || "-"}`,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[contact] RESEND_API_KEY not configured. Submission:\n" + lines);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Заявки от сайта <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL || site.email,
      replyTo: email || undefined,
      subject: `Ново запитване – ${service}`,
      text: lines,
    });
    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("[contact] Failed to send email", error);
    return NextResponse.json({ error: "Неуспешно изпращане, опитайте отново." }, { status: 502 });
  }
}
