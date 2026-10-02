"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import Icon from "@/components/Icon";
import SectionTitle from "@/components/SectionTitle";
import type { Project, SectionMeta } from "@/lib/types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Props {
  meta: SectionMeta;
  projects: Project[];
}

export default function PortfolioGrid({ meta, projects }: Props) {
  const allLabel = meta.allFilterLabel ?? "All";
  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category).filter((c): c is string => Boolean(c)))),
    [projects],
  );
  const [active, setActive] = useState(allLabel);
  const gridRef = useRef<HTMLUListElement>(null);
  const firstRun = useRef(true);

  const visible = active === allLabel ? projects : projects.filter((p) => p.category === active);

  useGSAP(
    () => {
      if (firstRun.current) {
        firstRun.current = false;
        return;
      }
      gsap.set("[data-stagger-item]", { autoAlpha: 1, y: 0 });
      ScrollTrigger.refresh();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo("[data-stagger-item]", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out" });
    },
    { scope: gridRef, dependencies: [active] },
  );

  return (
    <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionTitle meta={meta} />

        {projects.length === 0 ? (
          meta.emptyState && <p className="text-fg-soft">{meta.emptyState}</p>
        ) : (
          <>
            {categories.length > 1 && (
              <div role="group" aria-label={meta.title} className="mb-12 flex flex-wrap gap-x-8 gap-y-3">
                {[allLabel, ...categories].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={cat === active}
                    onClick={() => setActive(cat)}
                    className={`relative py-1 text-xs font-medium tracking-[0.2em] uppercase transition-colors ${
                      cat === active ? "text-fg" : "text-fg-mute hover:text-fg"
                    }`}
                  >
                    {cat}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-0.5 left-0 h-px bg-fg transition-all duration-300 ${cat === active ? "w-full" : "w-0"}`}
                    />
                  </button>
                ))}
              </div>
            )}

            <ul ref={gridRef} data-stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p) => {
                const number = String(projects.indexOf(p) + 1).padStart(2, "0");
                const { github, demo } = p.links ?? {};
                return (
                  <li key={p.name} data-stagger-item>
                    <article className="group relative flex h-full flex-col overflow-hidden border border-line bg-bg-card transition-colors duration-500 hover:border-fg/40">
                      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-bg">
                        {p.image ? (
                          <Image
                            src={p.image.src}
                            alt={p.image.alt}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                          />
                        ) : (
                          <>
                            <span
                              aria-hidden="true"
                              className="absolute -bottom-6 -left-2 text-[8rem] leading-none font-extrabold text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.08)] transition-transform duration-700 group-hover:-translate-y-2"
                            >
                              {number}
                            </span>
                            <Icon
                              name={p.icon}
                              size={56}
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stroke-[1] text-fg/80 transition-transform duration-700 group-hover:scale-110"
                            />
                          </>
                        )}
                        {p.status && (
                          <span className="absolute top-4 right-4 bg-fg px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.15em] text-bg uppercase">
                            {p.status}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        {p.category && (
                          <p className="text-[0.7rem] font-medium tracking-[0.2em] text-fg-mute uppercase">{p.category}</p>
                        )}
                        <h3 className="mt-2 text-xl font-semibold">{p.name}</h3>
                        {p.tagline && <p className="mt-1 text-sm text-fg-soft">{p.tagline}</p>}
                        <p className="mt-4 text-sm leading-relaxed text-fg-soft">{p.description}</p>
                        {p.technologies && p.technologies.length > 0 && (
                          <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-5 text-xs text-fg-mute">
                            {p.technologies.map((t) => (
                              <li key={t}>#{t.replace(/\s+/g, "")}</li>
                            ))}
                          </ul>
                        )}
                        {(github || demo) && (
                          <div className="mt-5 flex gap-5 border-t border-line pt-4 text-sm">
                            {github && (
                              <a href={github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-fg-soft">
                                <Icon name="github" size={16} /> GitHub
                              </a>
                            )}
                            {demo && (
                              <a href={demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-fg-soft">
                                <Icon name="arrow-up-right" size={16} /> Demo
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
