"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Portfolio } from "@/lib/types";

interface Props {
  items: Portfolio["navigation"];
  extras: Portfolio["navigationExtras"];
  logo: string;
  name: string;
}

export default function Navbar({ items, extras, logo, name }: Props) {
  const [active, setActive] = useState(items[0]?.href ?? "");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = items
      .map((i) => document.querySelector<HTMLElement>(i.href))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        scrolled || open ? "border-b border-line bg-bg/90 backdrop-blur" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-[var(--nav-h)] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <a href={items[0]?.href ?? "#"} aria-label={name} className="text-2xl font-extrabold tracking-tight" onClick={() => setOpen(false)}>
          {logo}
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {items.map((item) => {
            const isActive = active === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`group relative py-2 text-[0.78rem] font-medium tracking-[0.18em] uppercase transition-colors ${
                    isActive ? "text-fg" : "text-fg-soft hover:text-fg"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-0.5 left-0 h-px bg-fg transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <button
          ref={toggleRef}
          type="button"
          className="grid h-11 w-11 place-items-center border border-line lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? extras.menuCloseLabel : extras.menuOpenLabel}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>

      <div id="mobile-menu" hidden={!open} className="h-[calc(100svh-var(--nav-h))] overflow-y-auto border-t border-line bg-bg lg:hidden">
        <ul className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          {items.map((item, i) => (
            <li key={item.href} className="border-b border-line">
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active === item.href ? "location" : undefined}
                className={`flex items-baseline gap-4 py-4 text-2xl font-semibold ${active === item.href ? "text-fg" : "text-fg-soft"}`}
              >
                <span aria-hidden="true" className="text-xs text-fg-mute">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
