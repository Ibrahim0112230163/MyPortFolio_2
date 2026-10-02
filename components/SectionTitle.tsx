import type { SectionMeta } from "@/lib/types";

/** Numbered eyebrow + heading, with a large outlined word behind it. */
export default function SectionTitle({ meta }: { meta: SectionMeta }) {
  return (
    <header data-reveal className="relative mb-14 md:mb-20">
      {meta.backdrop && (
        <span
          aria-hidden="true"
          data-parallax-x
          className="backdrop-word pointer-events-none absolute -top-8 left-0 text-[clamp(4.5rem,16vw,11rem)] md:-top-14"
        >
          {meta.backdrop}
        </span>
      )}
      <p className="eyebrow relative">
        {meta.number && <span className="text-fg">{meta.number}</span>}
        {meta.label}
      </p>
      <h2 id={`${meta.id}-title`} className="relative mt-4 text-4xl font-bold tracking-tight md:text-6xl">
        {meta.title}
        <span aria-hidden="true">.</span>
      </h2>
    </header>
  );
}
