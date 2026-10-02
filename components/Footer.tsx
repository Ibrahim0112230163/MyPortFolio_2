import Icon from "@/components/Icon";
import { fillTemplate } from "@/lib/data";
import type { Portfolio } from "@/lib/types";

interface Props {
  footer: Portfolio["footer"];
  personal: Portfolio["personal"];
  social: Portfolio["social"];
  backToTop: string;
}

export default function Footer({ footer, personal, social, backToTop }: Props) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 lg:px-10">
        <a href="#home" aria-label={backToTop} className="text-3xl font-extrabold tracking-tight">
          {personal.logo}
        </a>
        <ul className="flex gap-3">
          {social.map((s) => (
            <li key={s.label}>
              <a
                href={s.url}
                aria-label={s.label}
                target={s.url.startsWith("http") ? "_blank" : undefined}
                rel={s.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="grid h-11 w-11 place-items-center border border-line text-fg-soft transition-colors hover:bg-fg hover:text-bg"
              >
                <Icon name={s.icon} size={18} />
              </a>
            </li>
          ))}
        </ul>
        <p className="text-sm text-fg-mute">
          {fillTemplate(footer.copyright, { year: new Date().getFullYear(), name: personal.name })}
          {footer.tagline && <span className="block sm:ml-2 sm:inline">{footer.tagline}</span>}
        </p>
      </div>
    </footer>
  );
}
