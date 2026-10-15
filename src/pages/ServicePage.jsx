import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Icon from "../components/Icon.jsx";
import { groupCards, serviceContent, serviceGalleries, serviceLinks, units } from "../data/siteData.js";

export default function ServicePage({ path }) {
  const [activeTab, setActiveTab] = useState("details");
  const [activePhoto, setActivePhoto] = useState(null);
  const photoTrigger = useRef(null);
  const lightboxClose = useRef(null);
  const wasPhotoOpen = useRef(false);
  const gallery = serviceGalleries[path] || { photos: [], videos: [] };
  useEffect(() => { setActiveTab("details"); setActivePhoto(null); }, [path]);
  useEffect(() => {
    if (activePhoto === null) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActivePhoto(null);
      if (event.key === "ArrowLeft") setActivePhoto((photo) => (photo - 1 + gallery.photos.length) % gallery.photos.length);
      if (event.key === "ArrowRight") setActivePhoto((photo) => (photo + 1) % gallery.photos.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activePhoto, gallery.photos.length]);
  useEffect(() => {
    if (activePhoto !== null) {
      if (!wasPhotoOpen.current) {
        wasPhotoOpen.current = true;
        lightboxClose.current?.focus();
      }
    } else if (wasPhotoOpen.current) {
      wasPhotoOpen.current = false;
      photoTrigger.current?.focus();
    }
  }, [activePhoto]);
  const entry = Object.entries(serviceLinks).find(([, href]) => href === path);
  const title = entry?.[0] || "Page not found";
  const industryUnit = units.find(([, items]) => items.includes(title));
  const fabricationService = groupCards[1].items.includes(title);
  const mepService = groupCards[2].items.includes(title);
  const electricalService = groupCards[3].items.includes(title);
  const powerplantService = groupCards[4].items.includes(title);
  const globalService = groupCards[5].items.includes(title);
  const content = serviceContent[path] || (industryUnit ? industryServiceContent(title, industryUnit[0]) : undefined);
  const services = industryUnit ? industryUnit[1] : fabricationService ? groupCards[1].items : mepService ? groupCards[2].items : electricalService ? groupCards[3].items : powerplantService ? groupCards[4].items : globalService ? groupCards[5].items : groupCards[0].items;
  const division = industryUnit ? "Godwin Industries" : fabricationService ? "Godwin Heavy Fabrications" : mepService ? "Godwin Architecture & MEP Services" : electricalService ? "Godwin Electricals" : powerplantService ? "Powerplant Engineering Services" : globalService ? "Godwin Global Technologies" : "Godwin ITS";
  const fallbackHero = groupCards.find((group) => group.items.includes(title))?.image || (industryUnit ? "group-heavy.jpg" : "group-its.jpg");
  const heroImage = content?.heroImage?.startsWith("http") ? content.heroImage : `/images/${content?.heroImage || fallbackHero}`;
  const pageTitle = path === "/services/advance-roto-dynamics-analysis" ? "Advance Rotodynamics Analysis" : path === "/services/power-plant-layouting-cable-layout-hcav-ducting-piping-layout" ? "Power Plant Layouting , Cable Layout , HVAC Ducting Piping Layout" : title;
  const tabTitle = path === "/services/advance-roto-dynamics-analysis" ? "Advance Roto Dynamics Analysis" : path === "/services/power-plant-layouting-cable-layout-hcav-ducting-piping-layout" ? "Power Plant Layouting , Cable Layout, HCAV Ducting Piping Layout" : title;

  return (
    <>
      <div id="top" className="page-top-anchor" />
      <Header />
      <section className="service-hero" style={{ "--service-image": `url("${heroImage}")` }}>
        <div className="content-width service-hero-inner">
          <p className="service-breadcrumb"><a href="/#top">Home</a><span>/</span><a href={industryUnit ? "/#industries" : "/#groups"}>{division}</a>{industryUnit && <><span>/</span><span>{industryUnit[0].replace("UNIT - ", "Unit ")}</span></>}</p>
          <h1>{pageTitle}</h1>
          <p className="service-hero-caption service-hero-caption-current">{division} <span>{String.fromCharCode(8211)}</span> {pageTitle}</p>
        </div>
      </section>
      <main id="main-content" tabIndex="-1" className="service-layout content-width">
        <article className="service-detail">
          <div className="service-tabs" role="tablist" aria-label={`${pageTitle} information`}>
            {[ ["details", tabTitle], ["photos", "Photo Gallery"], ["videos", "Video Gallery"] ].map(([tab, label]) => <button className={activeTab === tab ? "active" : ""} id={`service-tab-${tab}`} type="button" role="tab" aria-selected={activeTab === tab} aria-controls={`service-panel-${tab}`} tabIndex={activeTab === tab ? 0 : -1} onClick={() => setActiveTab(tab)} key={tab}>{label}</button>)}
          </div>
          <section className="service-copy service-panel" id="service-panel-details" role="tabpanel" aria-labelledby="service-tab-details" hidden={activeTab !== "details"}>
              {content?.underConstructionImage ? <img className="service-under-construction" src={content.underConstructionImage} alt="Page under construction" /> : <>
                <p className="service-intro">{content?.intro || `${division} provides ${title.toLowerCase()} solutions shaped around your project requirements. Contact our team to discuss your facility and service needs.`}</p>
                {(content?.sections || []).map((section, index) => <section className="service-copy-section" key={section.title || `section-${index}`}>
                  {section.title && <h2>{section.title}</h2>}
                  {section.text && <p>{section.text}</p>}
                  {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
                </section>)}
                <a className="contact-button service-contact" href="/contact-us">Enquire About This Service</a>
              </>}
          </section>
          <section className="service-gallery service-panel" id="service-panel-photos" role="tabpanel" aria-labelledby="service-tab-photos" hidden={activeTab !== "photos"}>
            {gallery.photos.length ? <div className="service-photo-grid">{gallery.photos.map((src, index) => <button className="service-photo" type="button" ref={index === 0 ? photoTrigger : undefined} onClick={(event) => { photoTrigger.current = event.currentTarget; setActivePhoto(index); }} key={`${src}-${index}`} aria-label={`View ${title} gallery photo ${index + 1} of ${gallery.photos.length}`}><img src={src} alt={`${title} gallery photo ${index + 1}`} loading="lazy" /></button>)}</div> : <p className="gallery-empty">Photo gallery images will be added soon.</p>}
          </section>
          <section className="service-video-gallery service-panel" id="service-panel-videos" role="tabpanel" aria-labelledby="service-tab-videos" hidden={activeTab !== "videos"}>
            {gallery.videos.length ? <div className="service-video-grid">{gallery.videos.map((video) => <div className="service-video" key={video.url}><iframe src={video.url} title={video.title || `${title} video`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>)}</div> : <div className="gallery-empty video-empty"><Icon name="youtube" size={38} /><p>Video gallery coming soon.</p></div>}
          </section>
        </article>
        <aside className="service-sidebar" aria-label={`${division} services`}>
          <h2>{industryUnit ? `${division} · ${industryUnit[0].replace("UNIT - ", "Unit ")}` : division}</h2>
          <nav>{services.map((service) => <a href={serviceLinks[service]} key={service} aria-current={serviceLinks[service] === path ? "page" : undefined}>{service}</a>)}</nav>
        </aside>
      </main>
      {activePhoto !== null && <div className="photo-lightbox" role="dialog" aria-modal="true" aria-label={`${title} photo gallery`} onKeyDown={(event) => { if (event.key === "Tab") { const controls = event.currentTarget.querySelectorAll("button"); const first = controls[0]; const last = controls[controls.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } } }} onClick={(event) => { if (event.target === event.currentTarget) setActivePhoto(null); }}>
        <button className="lightbox-close" ref={lightboxClose} type="button" aria-label="Close photo viewer" onClick={() => setActivePhoto(null)}><span aria-hidden="true">×</span></button>
        {gallery.photos.length > 1 && <button className="lightbox-arrow lightbox-previous" type="button" aria-label="Previous photo" onClick={() => setActivePhoto((activePhoto - 1 + gallery.photos.length) % gallery.photos.length)}><span aria-hidden="true">‹</span></button>}
        <figure className="lightbox-figure" key={activePhoto}>
          <img className="lightbox-image" src={gallery.photos[activePhoto]} alt={`${title} gallery photo ${activePhoto + 1}`} />
          <figcaption>{activePhoto + 1} <span aria-hidden="true">/</span> {gallery.photos.length}</figcaption>
        </figure>
        {gallery.photos.length > 1 && <button className="lightbox-arrow lightbox-next" type="button" aria-label="Next photo" onClick={() => setActivePhoto((activePhoto + 1) % gallery.photos.length)}><span aria-hidden="true">›</span></button>}
      </div>}
      <Footer />
    </>
  );
}

function industryServiceContent(title, unit) {
  const unitCopy = {
    "UNIT - I": {
      focus: "metal fabrication, building services components, surface finishing, and workshop production",
      points: ["Review drawings, dimensions, materials, and intended site use.", "Plan fabrication and finishing to match approved project requirements.", "Coordinate production, delivery, and installation of the required components."],
    },
    "UNIT - II": {
      focus: "industrial machine design and manufacture for forming, cutting, bending, and customized production needs",
      points: ["Confirm machine function, production process, and operating requirements.", "Plan the build, controls, tooling, and safety provisions for the application.", "Coordinate assembly, inspection, installation, and commissioning as agreed."],
    },
    "UNIT - III": {
      focus: "fabricated structural components and prefabricated access solutions for commercial and institutional sites",
      points: ["Develop layouts around building dimensions, access, and operational needs.", "Fabricate and assemble components to the approved project design.", "Coordinate delivery, site installation, and finishing with the project team."],
    },
    "UNIT - IV": {
      focus: "CNC profile work and HVAC duct fabrication for building and industrial projects",
      points: ["Review profiles, duct routes, dimensions, materials, and connections.", "Prepare components for accurate fabrication and fit-up at the project site.", "Coordinate with other building services and maintenance access requirements."],
    },
    "UNIT - V": {
      focus: "low and high voltage electrical distribution panels and power factor correction solutions",
      points: ["Review connected loads, incoming supply, distribution, and panel location.", "Configure panel components and protection to the approved electrical design.", "Support inspection, testing, installation, and handover as agreed."],
    },
  }[unit];
  return {
    heroImage: unit === "UNIT - V" ? "group-electrical.jpg" : unit === "UNIT - IV" ? "group-mep.jpg" : "group-heavy.jpg",
    intro: `${title} is delivered through Godwin Industries ${unit.replace("UNIT - ", "Unit ")}, which focuses on ${unitCopy.focus}. Work is planned around the approved design, site conditions, and the requirements agreed for each project.`,
    sections: [
      { title: `${unit.replace("UNIT - ", "Unit ")} Project Scope`, text: `Our team coordinates ${title.toLowerCase()} with the wider project requirements, from initial review through production and delivery. The final scope, materials, and installation arrangements are confirmed for each project.` },
      { title: "Planning and Delivery", points: unitCopy.points },
    ],
  };
}
