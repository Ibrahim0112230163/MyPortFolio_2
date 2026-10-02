import SectionTitle from "@/components/SectionTitle";
import type { Portfolio, SectionMeta } from "@/lib/types";

interface Props {
  meta: SectionMeta;
  categories: Portfolio["skills"]["categories"];
}

export default function Skills({ meta, categories }: Props) {
  if (categories.length === 0) return null;
  return (
    <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionTitle meta={meta} />
        <ul data-stagger className="grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <li key={c.name} data-stagger-item>
              <h3 className="border-b border-line pb-3 text-xs font-semibold tracking-[0.25em] text-fg-mute uppercase">
                {c.name}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.items.map((item) => (
                  <li
                    key={item}
                    className="border border-line px-3 py-1.5 text-sm text-fg-soft transition-colors hover:border-fg hover:text-fg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
