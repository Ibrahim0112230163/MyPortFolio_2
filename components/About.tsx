import SectionTitle from "@/components/SectionTitle";
import type { Portfolio, SectionMeta } from "@/lib/types";

interface Props {
  meta: SectionMeta;
  about: Portfolio["about"];
  cvFileName?: string;
}

export default function About({ meta, about, cvFileName }: Props) {
  return (
    <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionTitle meta={meta} />

        <div className="grid gap-14 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-7">
            <h3 className="text-2xl leading-snug font-semibold md:text-3xl">{about.heading}</h3>
            <div className="mt-6 space-y-5 leading-relaxed text-fg-soft">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {about.cta && (
              <a
                href={about.cta.href}
                download={about.cta.download ? (cvFileName ?? true) : undefined}
                className="btn btn-solid mt-10"
              >
                {about.cta.label}
              </a>
            )}
          </div>

          {about.info.length > 0 && (
            <dl data-reveal className="self-start border-t border-line lg:col-span-5">
              {about.info.map((row) => (
                <div key={row.label} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-4">
                  <dt className="text-xs font-medium tracking-[0.2em] text-fg-mute uppercase">{row.label}</dt>
                  <dd className="min-w-0 break-words">
                    {row.href ? (
                      <a href={row.href} className="transition-colors hover:text-fg-soft">
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {about.stats.length > 0 && (
          <ul data-stagger className="mt-20 grid border-y border-line sm:grid-cols-3">
            {about.stats.map((s) => (
              <li
                key={s.label}
                data-stagger-item
                className="flex items-center gap-5 border-line px-2 py-8 not-last:border-b sm:justify-center sm:not-last:border-r sm:not-last:border-b-0"
              >
                <span className="text-5xl font-extrabold tracking-tight md:text-6xl">{s.value}</span>
                <span className="max-w-[9rem] text-sm leading-snug text-fg-soft">{s.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
