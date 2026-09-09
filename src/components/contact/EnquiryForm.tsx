"use client";

import { useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { submitEnquiry } from "@/app/(marketing)/contact/actions";
import type { ContactForm as ContactFormContent } from "@/lib/content";

type Status = "idle" | "submitting" | "delivery_error" | "success";
type Values = Record<string, string>;
type Errors = Record<string, string>;

const FIELD_ORDER = [
  "name",
  "company",
  "email",
  "phone",
  "enquiryType",
  "productCategory",
  "quantity",
  "message",
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface EnquiryFormProps {
  form: ContactFormContent;
  primaryContact: { phone: string; email: string };
  productCategories: string[];
}

export function EnquiryForm({
  form,
  primaryContact,
  productCategories,
}: EnquiryFormProps) {
  const [values, setValues] = useState<Values>({
    name: "",
    company: "",
    email: "",
    phone: "",
    enquiryType: "",
    productCategory: "",
    quantity: "",
    message: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const validateField = (key: string, value: string): string | undefined => {
    if (key === "email") {
      if (!value.trim()) return form.fields.email.error;
      if (!EMAIL_RE.test(value.trim())) return form.fields.email.errorInvalid;
      return undefined;
    }
    const field = form.fields[key];
    if (field?.required && !value.trim()) return field.error;
    return undefined;
  };

  const validateAll = (v: Values = values): Errors => {
    const next: Errors = {};
    for (const key of FIELD_ORDER) {
      const error = validateField(key, v[key]);
      if (error) next[key] = error;
    }
    return next;
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name] && errors[name]) {
      const error = validateField(name, value);
      setErrors((prev) => {
        const copy = { ...prev };
        if (error) copy[name] = error;
        else delete copy[name];
        return copy;
      });
    }
  };

  const handleBlur = (
    event: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => {
      const copy = { ...prev };
      const error = validateField(name, value);
      if (error) copy[name] = error;
      else delete copy[name];
      return copy;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const nextErrors = validateAll();
    setErrors(nextErrors);
    setTouched(Object.fromEntries(FIELD_ORDER.map((key) => [key, true])));

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = FIELD_ORDER.find((key) => nextErrors[key]);
      if (firstInvalid) {
        document.getElementById(`field-${firstInvalid}`)?.focus();
      }
      return;
    }

    setStatus("submitting");
    const result = await submitEnquiry({
      name: values.name.trim(),
      company: values.company.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      enquiryType: values.enquiryType,
      productCategory: values.productCategory,
      quantity: values.quantity.trim(),
      message: values.message.trim(),
    });

    if (result.ok) {
      setStatus("success");
      return;
    }

    if (result.error === "invalid") {
      setStatus("idle");
      setErrors(validateAll(values));
      return;
    }

    setStatus("delivery_error");
  };

  const fieldAutoComplete: Record<string, string> = {
    name: "name",
    company: "organization",
    email: "email",
    phone: "tel",
  };

  const renderField = (key: (typeof FIELD_ORDER)[number], wide = false) => {
    const field = form.fields[key];
    const value = values[key];
    const error = errors[key];
    const isSelect = key === "enquiryType" || key === "productCategory";
    const errorId = `field-error-${key}`;

    const controlId = `field-${key}`;
    const sharedBlur = { onBlur: handleBlur };
    const aria = {
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? errorId : undefined,
      "aria-required": field.required ? true : undefined,
    };

    return (
      <div
        key={key}
        data-form-field
        className={`form-field ${wide ? "sm:col-span-2" : ""}`}
      >
        <label htmlFor={controlId} className="form-label">
          {field.label}
          {field.required ? (
            <span className="text-danger" aria-hidden="true">
              {" "}
              *
            </span>
          ) : null}
        </label>

        {key === "enquiryType" ? (
          <div className="relative">
            <select
              id={controlId}
              name={key}
              value={value}
              onChange={handleChange}
              {...sharedBlur}
              {...aria}
              className="form-control appearance-none pr-10"
            >
              <option value="" disabled>
                {field.placeholder}
              </option>
              {form.enquiryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <Icon
              icon="mdi:chevron-down"
              size={20}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground-secondary"
            />
          </div>
        ) : key === "productCategory" ? (
          <div className="relative">
            <select
              id={controlId}
              name={key}
              value={value}
              onChange={handleChange}
              {...sharedBlur}
              {...aria}
              className="form-control appearance-none pr-10"
            >
              <option value="" disabled>
                {field.placeholder}
              </option>
              {productCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
              <option value="Other">Other / Not sure</option>
            </select>
            <Icon
              icon="mdi:chevron-down"
              size={20}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground-secondary"
            />
          </div>
        ) : key === "message" ? (
          <textarea
            id={controlId}
            name={key}
            value={value}
            onChange={handleChange}
            {...sharedBlur}
            {...aria}
            rows={5}
            className="form-control resize-y"
            placeholder={field.placeholder}
          />
        ) : (
          <input
            id={controlId}
            type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
            name={key}
            value={value}
            onChange={handleChange}
            {...sharedBlur}
            {...aria}
            autoComplete={fieldAutoComplete[key]}
            className="form-control"
            placeholder={field.placeholder}
          />
        )}

        {error ? (
          <p id={errorId} className="mt-1.5 text-sm text-danger">
            {error}
          </p>
        ) : null}
      </div>
    );
  };

  return (
    <section
      id="enquiry"
      className="scroll-mt-24 bg-background-alt"
      aria-labelledby="enquiry-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div data-enquiry-head className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            Tell us your brief
          </p>
          <h2
            id="enquiry-title"
            className="mt-5 text-balance text-3xl font-semibold leading-[1.15] text-foreground sm:text-4xl"
          >
            {form.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground-secondary">
            {form.description}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <form
            noValidate
            aria-busy={status === "submitting"}
            onSubmit={handleSubmit}
            className="rounded-sm border border-card-border bg-card p-6 shadow-sm sm:p-8"
          >
            <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
              {FIELD_ORDER.map((key) =>
                renderField(key, key === "quantity" || key === "message"),
              )}
            </div>

            <div
              data-form-submit
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="text-sm text-foreground-secondary">
                <span className="text-danger" aria-hidden="true">
                  *
                </span>{" "}
                {form.requiredNote}
              </p>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-primary px-7 py-3.5 text-base disabled:cursor-not-allowed disabled:opacity-80 motion-reduce:transition-none"
              >
                {status === "submitting" ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    {form.submitLabel}
                    <Icon icon="mdi:arrow-right" size={20} />
                  </>
                )}
              </button>
            </div>

            {status === "delivery_error" ? (
              <div
                role="alert"
                className="mt-6 flex items-start gap-3 rounded-sm border border-danger/30 bg-danger/5 p-5"
              >
                <Icon
                  icon="mdi:alert-circle-outline"
                  size={22}
                  className="mt-0.5 shrink-0 text-danger"
                />
                <div>
                  <p className="font-semibold text-foreground">
                    {form.fallbackTitle}
                  </p>
                  <p className="mt-1 text-pretty text-sm leading-relaxed text-foreground-secondary">
                    {form.fallbackText}{" "}
                    <a
                      href={`mailto:${primaryContact.email}`}
                      className="link-underline font-semibold text-accent"
                    >
                      {primaryContact.email}
                    </a>
                    {" or "}
                    <a
                      href={`tel:${primaryContact.phone.replace(/\s/g, "")}`}
                      className="link-underline font-semibold text-accent"
                    >
                      {primaryContact.phone}
                    </a>
                    .
                  </p>
                </div>
              </div>
            ) : null}

            {status === "success" ? (
              <div
                role="status"
                className="mt-6 flex items-start gap-3 rounded-sm border border-accent/30 bg-accent/5 p-5"
              >
                <Icon
                  icon="mdi:check-circle-outline"
                  size={22}
                  className="mt-0.5 shrink-0 text-accent"
                />
                <div>
                  <p className="font-semibold text-foreground">
                    Thanks — your enquiry is with our team.
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground-secondary">
                    We usually come back within one working day.
                  </p>
                </div>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}