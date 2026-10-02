"use client";

import { useId, useState, type FormEvent } from "react";
import Icon from "@/components/Icon";
import SectionTitle from "@/components/SectionTitle";
import { fillTemplate } from "@/lib/data";
import type { Portfolio, SectionMeta } from "@/lib/types";

interface Props {
  meta: SectionMeta;
  contact: Portfolio["contact"];
  personal: Portfolio["personal"];
  social: Portfolio["social"];
}

type Status = { kind: "idle" } | { kind: "error" | "success"; message: string };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact({ meta, contact, personal, social }: Props) {
  const { form } = contact;
  const uid = useId();
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !email || !message) return setStatus({ kind: "error", message: form.errorRequired });
    if (!EMAIL_RE.test(email)) return setStatus({ kind: "error", message: form.errorEmail });
    if (!personal.email) return;
    // No backend: hand the message to the visitor's own mail client.
    const subject = fillTemplate(form.subjectTemplate, { name });
    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus({ kind: "success", message: form.successMessage });
  }

  const field =
    "peer block w-full border-0 border-b border-line bg-transparent px-0 pt-6 pb-3 text-fg placeholder-transparent transition-colors focus:border-fg focus:ring-0 focus:outline-none";
  const label =
    "pointer-events-none absolute top-6 left-0 text-sm text-fg-mute transition-all peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs";

  return (
    <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="relative bg-bg-soft py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionTitle meta={meta} />

        <div className="grid gap-16 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-5">
            <h3 className="text-2xl font-semibold md:text-3xl">{contact.heading}</h3>
            <p className="mt-5 leading-relaxed text-fg-soft">{contact.intro}</p>
            <ul className="mt-10 border-t border-line">
              {social.map((s) => (
                <li key={s.label} className="border-b border-line">
                  <a
                    href={s.url}
                    target={s.url.startsWith("http") ? "_blank" : undefined}
                    rel={s.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-5 py-5"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center border border-line transition-colors group-hover:bg-fg group-hover:text-bg">
                      <Icon name={s.icon} size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs tracking-[0.2em] text-fg-mute uppercase">{s.label}</span>
                      {s.handle && <span className="block truncate">{s.handle}</span>}
                    </span>
                  </a>
                </li>
              ))}
              {personal.location && (
                <li className="flex items-center gap-5 border-b border-line py-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center border border-line">
                    <Icon name="map-pin" size={18} />
                  </span>
                  {personal.location}
                </li>
              )}
            </ul>
          </div>

          <form data-reveal onSubmit={handleSubmit} noValidate className="lg:col-span-7">
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="relative">
                <input id={`${uid}-name`} name="name" type="text" autoComplete="name" required placeholder=" " className={field} />
                <label htmlFor={`${uid}-name`} className={label}>
                  {form.nameLabel}
                </label>
              </div>
              <div className="relative">
                <input id={`${uid}-email`} name="email" type="email" autoComplete="email" required placeholder=" " className={field} />
                <label htmlFor={`${uid}-email`} className={label}>
                  {form.emailLabel}
                </label>
              </div>
            </div>
            <div className="relative mt-8">
              <textarea id={`${uid}-message`} name="message" rows={5} required placeholder=" " className={`${field} resize-y`} />
              <label htmlFor={`${uid}-message`} className={label}>
                {form.messageLabel}
              </label>
            </div>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" className="btn btn-solid">
                {form.submitLabel}
              </button>
              {form.note && <p className="text-sm text-fg-mute">{form.note}</p>}
            </div>
            <p role={status.kind === "error" ? "alert" : "status"} aria-live="polite" className="mt-6 min-h-[1.5rem] text-sm">
              {status.kind !== "idle" && status.message}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
