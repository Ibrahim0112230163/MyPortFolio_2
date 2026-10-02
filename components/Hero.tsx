import Image from "next/image";
import Icon from "@/components/Icon";
import RoleRotator from "@/components/RoleRotator";
import type { Portfolio } from "@/lib/types";

interface Props {
  hero: Portfolio["hero"];
  personal: Portfolio["personal"];
  social: Portfolio["social"];
}

export default function Hero({ hero, personal, social }: Props) {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Portrait: full-height on the right on desktop, faded into the background */}
      <div className="absolute inset-y-0 right-0 -z-10 w-full opacity-40 md:w-[55%] md:opacity-100 lg:w-1/2">
        <div data-hero="portrait" className="absolute inset-0">
          <Image
            src={personal.avatar.src}
            alt={personal.avatar.alt}
            fill
            priority
            sizes="(min-width: 768px) 55vw, 100vw"
            className="object-cover object-[50%_25%]"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-bg via-bg/50 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40"
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pt-[var(--nav-h)] sm:px-6 lg:px-10">
        <div className="max-w-2xl">
          <p data-hero="line" className="eyebrow">
            {hero.greeting}
          </p>
          <h1
            id="hero-title"
            className="mt-6 text-[clamp(3.2rem,10vw,7.5rem)] leading-[0.95] font-extrabold tracking-tight"
          >
            <span data-hero="line" className="block">
              {personal.firstName}
            </span>
            <span data-hero="line" className="block text-fg/90">
              {personal.lastName}
              <span aria-hidden="true" className="text-fg-mute">
                .
              </span>
            </span>
          </h1>

          <p
            data-hero="line"
            className="mt-6 text-lg font-light text-fg-soft md:text-2xl"
          >
            {hero.rolePrefix && <span>{hero.rolePrefix} </span>}
            <RoleRotator roles={hero.roles} />
          </p>

          <p
            data-hero="line"
            className="mt-6 max-w-lg leading-relaxed text-fg-soft"
          >
            {hero.intro}
          </p>

          <div data-hero="line" className="mt-10 flex flex-wrap gap-4">
            {hero.primaryCta && (
              <a
                href={hero.primaryCta.href}
                download={
                  hero.primaryCta.download
                    ? (personal.cv?.fileName ?? true)
                    : undefined
                }
                className="btn btn-solid"
              >
                {hero.primaryCta.label}
              </a>
            )}
            {hero.secondaryCta && (
              <a href={hero.secondaryCta.href} className="btn btn-outline">
                {hero.secondaryCta.label}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Vertical social rail */}
      {social.length > 0 && (
        <ul
          data-hero="rail"
          className="absolute bottom-10 left-4 hidden flex-col items-center gap-5 sm:left-6 md:flex lg:left-10"
        >
          {social.map((s) => (
            <li key={s.label}>
              <a
                href={s.url}
                aria-label={s.label}
                target={s.url.startsWith("http") ? "_blank" : undefined}
                rel={
                  s.url.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="text-fg-soft transition-colors hover:text-fg"
              >
                <Icon name={s.icon} size={18} />
              </a>
            </li>
          ))}
          <li aria-hidden="true" className="h-16 w-px bg-line" />
        </ul>
      )}

      {hero.scrollLabel && (
        <a
          href="#about"
          data-hero="rail"
          className="absolute right-4 bottom-10 hidden items-center gap-3 text-[0.7rem] tracking-[0.3em] text-fg-soft uppercase [writing-mode:vertical-rl] hover:text-fg sm:right-6 md:flex lg:right-10"
        >
          {hero.scrollLabel}
          <span
            aria-hidden="true"
            className="relative h-16 w-px overflow-hidden bg-line"
          >
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-fg" />
          </span>
        </a>
      )}
    </section>
  );
}
