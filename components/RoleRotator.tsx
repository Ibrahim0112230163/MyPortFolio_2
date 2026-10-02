"use client";

import { useEffect, useState } from "react";

/** Typewriter-style rotation through the roles listed in portfolio.json. */
export default function RoleRotator({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(roles[0] ?? "");
  const [deleting, setDeleting] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(roles.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, [roles.length]);

  useEffect(() => {
    if (!animate) return;
    const full = roles[index];
    let delay = deleting ? 45 : 90;
    if (!deleting && text === full) delay = 1800;
    if (deleting && text === "") delay = 300;

    const id = setTimeout(() => {
      if (!deleting && text === full) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % roles.length);
      } else setText(full.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(id);
  }, [animate, deleting, index, roles, text]);

  return (
    <>
      {/* Screen readers get the full list once instead of a constantly changing string. */}
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true" className="font-semibold text-fg">
        {text}
        <span className="ml-1 inline-block h-[0.9em] w-[2px] animate-[caret_1s_steps(1)_infinite] bg-fg align-[-0.1em]" />
      </span>
    </>
  );
}
