import Icon from "@/components/Icon";
import SectionTitle from "@/components/SectionTitle";
import type { Portfolio, SectionMeta } from "@/lib/types";

interface Props {
  meta: SectionMeta;
  columns: Portfolio["resume"]["columns"];
}

export default function Resume({ meta, columns }: Props) {
  const visible = columns.filter((c) => c.items.length > 0);
  if (visible.length === 0) return null;

  return (
    <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="relative bg-bg-soft py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionTitle meta={meta} />
        <div className="grid gap-16 lg:grid-cols-2">
          {visible.map((col) => (
            <div key={col.title}>
              <h3 data-reveal className="flex items-center gap-4 text-2xl font-semibold">
                <span className="grid h-12 w-12 place-items-center border border-line">
                  <Icon name={col.icon} size={20} />
                </span>
                {col.title}
              </h3>
              <ol data-timeline className="relative mt-10 ml-6 border-l border-line">
                {col.items.map((item, i) => (
                  <li key={`${item.title}-${i}`} data-timeline-item className="relative pb-10 pl-10 last:pb-0">
                    <span aria-hidden="true" className="absolute top-1.5 -left-[5px] h-[9px] w-[9px] rounded-full bg-fg ring-4 ring-bg-soft" />
                    {item.period && (
                      <p className="text-xs font-medium tracking-[0.2em] text-fg-mute uppercase">{item.period}</p>
                    )}
                    <h4 className="mt-2 text-lg leading-snug font-semibold">
                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {item.title}
                        </a>
                      ) : (
                        item.title
                      )}
                    </h4>
                    {item.subtitle && <p className="mt-1 text-sm text-fg-soft">{item.subtitle}</p>}
                    {item.description && <p className="mt-3 text-sm leading-relaxed text-fg-soft">{item.description}</p>}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
