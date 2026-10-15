import React from "react";

const capabilities = [
  {
    title: "Fire & safety systems",
    description: "Fire hydrant, alarm, detection, and related safety systems for building and industrial environments.",
    image: "/images/group-its.jpg",
    alt: "Godwin fire and industrial systems service imagery",
    href: "/services/fire-fighting-system",
    link: "Explore fire services",
  },
  {
    title: "Fabrication & manufacturing",
    description: "Fabricated structures, access solutions, workshop production, and custom manufacturing services.",
    image: "/images/group-heavy.jpg",
    alt: "Steel frame representing fabrication and structural work",
    href: "/services/pre-fabricated-structures",
    link: "Explore fabrication",
  },
  {
    title: "Building services & MEP",
    description: "Mechanical, electrical, and plumbing design and coordination for project requirements.",
    image: "/images/group-mep.jpg",
    alt: "Building plan and tools representing MEP design services",
    href: "/services/design-layouting-mechanical-services",
    link: "Explore MEP services",
  },
  {
    title: "Electrical & power engineering",
    description: "Electrical panels, machine design, analysis, and power plant engineering services.",
    image: "/images/group-electrical.jpg",
    alt: "Electrical control panels representing Godwin electrical services",
    href: "/services/electrical-panels",
    link: "Explore electrical services",
  },
];

const reviewUrl = "https://www.justdial.com/Vijayawada/Godwin-Fire-Fighting-Systems-Kabela-Road-Near-Sitara-Centre-Vidyadharapuram/0866PX866-X866-150404120550-T2J3_BZDET/reviews";

const indiaProjectPhotos = [
  {
    title: "Building projects",
    description: "A high-rise building construction site in India.",
    image: "https://images.pexels.com/photos/9370034/pexels-photo-9370034.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "High-rise building construction site with a crane in India",
    source: "https://www.pexels.com/photo/high-rise-concrete-building-under-construction-9370034/",
  },
  {
    title: "Industrial environments",
    description: "A textile manufacturing facility in India.",
    image: "https://images.pexels.com/photos/8246481/pexels-photo-8246481.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Interior of an industrial textile facility in India",
    source: "https://www.pexels.com/photo/people-walking-inside-the-factory-8246481/",
  },
  {
    title: "People behind the work",
    description: "Women working together in an Indian factory.",
    image: "https://images.pexels.com/photos/31112183/pexels-photo-31112183.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Women organizing fabric rolls in an Indian factory",
    source: "https://www.pexels.com/photo/energetic-textile-workers-in-a-vibrant-factory-setting-31112183/",
  },
];

export default function ClientsPage() {
  return (
    <main id="main-content" tabIndex="-1" className="clients-page">
      <section className="clients-hero">
        <div className="content-width clients-hero-inner">
          <p className="clients-eyebrow">GODWIN GROUPS · CLIENTS</p>
          <h1>Engineering support built around your project</h1>
          <p>From fire and building systems to fabrication and power engineering, Godwin brings related services together around each project’s requirements.</p>
          <div className="clients-hero-meta"><span>Established 2011</span><span>Project work across India</span></div>
        </div>
      </section>

      <section className="clients-intro content-width">
        <div>
          <p className="clients-kicker">HOW WE SUPPORT CLIENTS</p>
          <h2>One team for connected engineering needs</h2>
        </div>
        <p>Godwin lists capabilities across fire protection, electrical systems, fabrication, mechanical and plumbing design, and power plant engineering. The right scope depends on the site, drawings, and requirements agreed with each client.</p>
      </section>

      <section className="client-capabilities content-width" aria-label="Godwin service capabilities">
        {capabilities.map((item, index) => (
          <article className="client-capability" key={item.title}>
            <a className="client-capability-image" href={item.href} aria-label={item.link}>
              <img src={item.image} alt={item.alt} loading="lazy" />
              <span className="client-capability-number">0{index + 1}</span>
            </a>
            <div className="client-capability-copy">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a href={item.href}>{item.link}<span aria-hidden="true"> →</span></a>
            </div>
          </article>
        ))}
      </section>

      <section className="client-project-gallery" aria-labelledby="client-project-gallery-title">
        <div className="content-width">
          <div className="client-project-heading">
            <div>
              <p className="clients-kicker">INDIAN PROJECT ENVIRONMENTS</p>
              <h2 id="client-project-gallery-title">The people and places engineering serves</h2>
            </div>
            <p>These licensed editorial photos show real Indian workplaces and project settings. They are representative images and are not identified as Godwin client sites or customers.</p>
          </div>
          <div className="client-project-grid">
            {indiaProjectPhotos.map((photo) => (
              <article className="client-project-card" key={photo.title}>
                <a href={photo.source} target="_blank" rel="noreferrer" aria-label={`View original photo: ${photo.title}`}>
                  <img src={photo.image} alt={photo.alt} loading="lazy" />
                </a>
                <div className="client-project-caption">
                  <div><h3>{photo.title}</h3><p>{photo.description}</p></div>
                  <a href={photo.source} target="_blank" rel="noreferrer">View original photo</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="client-feedback">
        <div className="content-width">
          <div className="client-testimonials-heading">
            <div><p className="clients-kicker">PUBLIC CUSTOMER FEEDBACK</p><h2>What reviewers say about working with Godwin</h2></div>
            <p>These excerpts come from public reviews on Godwin’s Justdial listing. Reviewer names appear as listed; no company affiliation is provided there.</p>
          </div>
          <div className="client-testimonials-grid">
            <article className="client-testimonial-card">
              <span className="client-testimonial-mark" aria-hidden="true">“</span>
              <blockquote>“Delivered site to us far before the schedule. Material quality is at its best.”</blockquote>
              <footer><strong>Dr KUMAR</strong><span>Public reviewer · 25 Oct 2016</span></footer>
            </article>
            <article className="client-testimonial-card">
              <span className="client-testimonial-mark" aria-hidden="true">“</span>
              <blockquote>“Excellent job, got fire NOC under an excellent guidance.”</blockquote>
              <footer><strong>RAVITEJA</strong><span>Public reviewer · 22 Jun 2016</span></footer>
            </article>
          </div>
          <a className="client-testimonials-source" href={reviewUrl} target="_blank" rel="noreferrer">Read the reviews on Justdial <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="clients-cta content-width">
        <div><p className="clients-kicker">START A CONVERSATION</p><h2>Tell us what your project needs.</h2><p>Share your scope and site requirements with the Godwin team.</p></div>
        <a className="contact-button" href="/contact-us">Contact Godwin <span aria-hidden="true">→</span></a>
      </section>
    </main>
  );
}
