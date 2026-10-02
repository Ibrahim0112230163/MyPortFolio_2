export interface Link {
  label: string;
  href: string;
  download?: boolean;
}

export interface SectionMeta {
  id: string;
  number?: string;
  label?: string;
  title: string;
  backdrop?: string;
  allFilterLabel?: string;
  emptyState?: string;
}

export interface Project {
  name: string;
  tagline?: string;
  category?: string;
  status?: string;
  icon?: string;
  description: string;
  technologies?: string[];
  image?: { src: string; alt: string };
  links?: { github?: string; demo?: string };
}

export interface ResumeItem {
  period?: string;
  title: string;
  subtitle?: string;
  description?: string;
  url?: string;
}

export interface Social {
  label: string;
  url: string;
  icon?: string;
  handle?: string;
}

export interface Portfolio {
  site: {
    title: string;
    shortTitle: string;
    description: string;
    url: string;
    language: string;
    locale: string;
    themeColor: string;
    keywords: string[];
    ogImage: string;
    skipLinkLabel: string;
    backToTopLabel: string;
  };
  personal: {
    name: string;
    firstName: string;
    lastName: string;
    logo: string;
    role: string;
    location?: string;
    email?: string;
    avatar: { src: string; alt: string; width: number; height: number };
    cv?: { href: string; fileName: string };
  };
  hero: {
    greeting: string;
    rolePrefix?: string;
    roles: string[];
    intro: string;
    primaryCta?: Link;
    secondaryCta?: Link;
    scrollLabel?: string;
  };
  navigation: { label: string; href: string }[];
  navigationExtras: { menuOpenLabel: string; menuCloseLabel: string };
  sections: {
    about: SectionMeta;
    services: SectionMeta;
    skills: SectionMeta;
    resume: SectionMeta;
    portfolio: SectionMeta;
    contact: SectionMeta;
  };
  about: {
    heading: string;
    paragraphs: string[];
    info: { label: string; value: string; href?: string }[];
    stats: { value: string; label: string }[];
    cta?: Link;
  };
  services: { title: string; icon?: string; description: string }[];
  skills: { categories: { name: string; items: string[] }[] };
  resume: { columns: { title: string; icon?: string; items: ResumeItem[] }[] };
  projects: Project[];
  contact: {
    heading: string;
    intro: string;
    form: {
      nameLabel: string;
      emailLabel: string;
      messageLabel: string;
      submitLabel: string;
      note?: string;
      subjectTemplate: string;
      successMessage: string;
      errorRequired: string;
      errorEmail: string;
    };
  };
  social: Social[];
  footer: { copyright: string; tagline?: string };
}
