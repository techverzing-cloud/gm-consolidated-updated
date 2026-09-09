"use server";

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

/**
 * Backend delivery channel for enquiry submissions.
 *
 * Point EMAIL_DELIVERY_ENDPOINT at your email provider / CRM API and POST the
 * payload there. Until then we never report a fabricated delivery — the UI
 * surfaces the unresolved channel and offers direct phone/email fallback.
 */
const EMAIL_DELIVERY_ENDPOINT: string | null = null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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

  if (EMAIL_DELIVERY_ENDPOINT === null) {
    return { ok: false, error: "delivery_failed" };
  }

  try {
    await fetch(EMAIL_DELIVERY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { ok: true };
  } catch {
    return { ok: false, error: "delivery_failed" };
  }
}