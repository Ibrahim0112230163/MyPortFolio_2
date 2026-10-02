"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

/**
 * Page-wide motion layer. Components only mark elements with data attributes
 * (data-hero, data-reveal, data-stagger-item, data-timeline-item, data-parallax-x);
 * all GSAP logic lives here. Motion is deliberately gentle.
 */
export default function Animations() {
  useGSAP(() => {
    const root = document.documentElement;
    // Before any ScrollTrigger exists: turns off the CSS smooth-scroll fallback that would fight GSAP.
    root.classList.add("anim-ready");
    const mm = gsap.matchMedia();

    // Smooth in-page anchor scrolling.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[href^='#']");
      const hash = link?.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      e.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const offset = document.querySelector("header")?.getBoundingClientRect().height ?? 80;
      // Wait a frame so a closing mobile menu can release its scroll lock first.
      requestAnimationFrame(() =>
        gsap.to(window, {
          duration: reduce ? 0 : gsap.utils.clamp(0.6, 1.2, Math.abs(target.getBoundingClientRect().top) / 4000),
          ease: "power3.out",
          scrollTo: { y: hash === "#home" ? 0 : target, offsetY: hash === "#home" ? 0 : offset - 1, autoKill: false },
          onComplete: () => {
            history.replaceState(null, "", hash);
            target.setAttribute("tabindex", "-1");
            target.focus({ preventScroll: true });
          },
        }),
      );
    };
    document.addEventListener("click", onClick);

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set("[data-hero], [data-reveal], [data-stagger-item], [data-timeline-item]", { autoAlpha: 1 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Hero entrance
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo("[data-hero='portrait']", { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 1.8 }, 0)
        .fromTo("[data-hero='line']", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.12 }, 0.3)
        .fromTo("[data-hero='rail']", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, 1.2);

      // Portrait drifts slightly as the hero scrolls away
      gsap.to("[data-hero='portrait']", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: true },
      });

      // Outlined backdrop words slide sideways with scroll
      gsap.utils.toArray<HTMLElement>("[data-parallax-x]").forEach((el) => {
        gsap.fromTo(el, { xPercent: 8 }, {
          xPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: el.closest("section") ?? el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(el, { autoAlpha: 0, y: 40 }, {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.set("[data-stagger-item]", { autoAlpha: 0, y: 40 });
      ScrollTrigger.batch("[data-stagger-item]", {
        start: "top 92%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", clearProps: "transform" }),
      });

      gsap.utils.toArray<HTMLElement>("[data-timeline-item]").forEach((el) => {
        gsap.fromTo(el, { autoAlpha: 0, x: 30 }, {
          autoAlpha: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  });

  return null;
}
