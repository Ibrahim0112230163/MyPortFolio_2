import About from "@/components/About";
import Animations from "@/components/Animations";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PortfolioGrid from "@/components/PortfolioGrid";
import Resume from "@/components/Resume";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import { portfolio as p } from "@/lib/data";

export default function Home() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.personal.name,
    jobTitle: p.personal.role,
    email: p.personal.email ? `mailto:${p.personal.email}` : undefined,
    address: p.personal.location,
    knowsAbout: p.skills.categories.flatMap((c) => c.items),
    sameAs: p.social.filter((s) => s.url.startsWith("http")).map((s) => s.url),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <a
        href="#main"
        className="sr-only z-[100] bg-fg px-4 py-2 font-semibold text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {p.site.skipLinkLabel}
      </a>
      <Navbar items={p.navigation} extras={p.navigationExtras} logo={p.personal.logo} name={p.personal.name} />
      <main id="main">
        <Hero hero={p.hero} personal={p.personal} social={p.social} />
        <About meta={p.sections.about} about={p.about} cvFileName={p.personal.cv?.fileName} />
        <Services meta={p.sections.services} services={p.services} />
        <Skills meta={p.sections.skills} categories={p.skills.categories} />
        <Resume meta={p.sections.resume} columns={p.resume.columns} />
        <PortfolioGrid meta={p.sections.portfolio} projects={p.projects} />
        <Contact meta={p.sections.contact} contact={p.contact} personal={p.personal} social={p.social} />
      </main>
      <Footer footer={p.footer} personal={p.personal} social={p.social} backToTop={p.site.backToTopLabel} />
      <Animations />
    </>
  );
}
