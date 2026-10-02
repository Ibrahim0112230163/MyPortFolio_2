import Icon from "@/components/Icon";
import SectionTitle from "@/components/SectionTitle";
import type { Portfolio, SectionMeta } from "@/lib/types";

interface Props {
  meta: SectionMeta;
  services: Portfolio["services"];
}

export default function Services({ meta, services }: Props) {
  if (services.length === 0) return null;
  return (
    <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="relative bg-bg-soft py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionTitle meta={meta} />
        <ul data-stagger className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <li
              key={s.title}
              data-stagger-item
              className="group relative flex flex-col border-r border-b border-line p-8 transition-colors duration-500 hover:bg-fg hover:text-bg md:p-10"
            >
              <span className="text-sm font-semibold text-fg-mute transition-colors group-hover:text-bg/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Icon name={s.icon} size={34} className="mt-10 stroke-[1.25]" />
              <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-soft transition-colors group-hover:text-bg/75">
                {s.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
