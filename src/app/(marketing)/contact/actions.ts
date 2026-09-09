"use server";

import { Resend } from "resend";

export interface EnquiryPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  enquiryType: string;
  productCategory: string;
  quantity: string;
  message: string;
}

export type EnquiryResult =
  | { ok: true }
  | { ok: false; error: "invalid" | "delivery_failed" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function formatEnquiry(payload: EnquiryPayload): string {
  return [
    `Name: ${payload.name}`,
    `Company: ${payload.company || "-"}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "-"}`,
    `Enquiry type: ${payload.enquiryType}`,
    `Product category: ${payload.productCategory || "-"}`,
    `Quantity: ${payload.quantity || "-"}`,
    "",
    `Message:`,
    payload.message,
  ].join("\n");
}

export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult> {
  const requiredMissing = [
    payload.name,
    payload.company,
    payload.email,
    payload.enquiryType,
    payload.message,
  ].some((value) => !value.trim());
  const emailInvalid = !EMAIL_RE.test(payload.email);

  if (requiredMissing || emailInvalid) {
    return { ok: false, error: "invalid" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.RESEND_TO_EMAIL;

  if (!apiKey || !from || !to) {
    return { ok: false, error: "delivery_failed" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: payload.email,
      subject: `Enquiry from ${payload.name}${payload.company ? ` (${payload.company})` : ""}`,
      text: formatEnquiry(payload),
    });
    if (error) return { ok: false, error: "delivery_failed" };
    return { ok: true };
  } catch {
    return { ok: false, error: "delivery_failed" };
  }
}