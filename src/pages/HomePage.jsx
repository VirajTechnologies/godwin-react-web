import React, { useEffect, useState } from "react";
import Icon from "../components/Icon.jsx";
import { groupCards, serviceLinks, units } from "../data/siteData.js";

const media = "/images/";
const values = [
  ["discover", "DISCOVER", "People with ideas & experience to develop a vision for the future"],
  ["build", "BUILD", "The right tools at the right time enhance a shared economy"],
  ["connect", "CONNECT", "Integrating clients with partners is the focus of everyday business"],
  ["launch", "LAUNCH", "Bringing highly-anticipated programs to the marketplace"],
];

const clientReviews = [
  {
    quote: "Delivered site to us far before the schedule. Material quality is at its best.",
    name: "Dr KUMAR",
    date: "25 Oct 2016",
  },
  {
    quote: "Excellent job, got fire NOC under an excellent guidance.",
    name: "RAVITEJA",
    date: "22 Jun 2016",
  },
];

function ServiceItem({ item }) {
  const href = serviceLinks[item];
  return href ? <a href={href}>{item}</a> : <span>{item}</span>;
}

function GroupCards() {
  return (
    <section className="groups-section" id="groups">
      <div className="content-width">
        <h1>Godwin Groups</h1>
        <div className="group-grid">
          {groupCards.map((group, index) => (
            <article className="group-card" id={`group-${index + 1}`} key={group.title}>
              <img src={media + group.image} alt={group.title} loading={index < 3 ? "eager" : "lazy"} />
              <div className="card-content">
                <h2>{group.title}</h2>
                <ul>{group.items.map((item) => <li key={item}><ServiceItem item={item} /></li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section className="industries" id="industries">
      <div className="industry-grid">
        {units.map(([unit, items]) => (
          <article className="industry-unit" key={unit}>
            <div className="industry-unit-content">
              <h2>Godwin Industries</h2>
              <h3>{unit.replace("UNIT - ", "Unit ")}</h3>
              <ul>{items.map((item) => <li key={item}><ServiceItem item={item} /></li>)}</ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function StaffingBanner() {
  return (
    <div className="staffing-wrap">
      <a className="staffing-banner" href="/services/godwin-staffing-services">
        <img src={`${media}staffing-banner.png`} alt="Godwin Global Technologies - Godwin Staffing Services" />
      </a>
    </div>
  );
}

function Welcome() {
  return (
    <section className="welcome content-width" id="about">
      <div className="welcome-copy">
        <h2>Welcome To GODWIN GROUPS</h2>
        <p>Founded in 2011 by IIT alumni, Godwin Groups operates across India and specializes in design, manufacturing, supply, installation, testing, commissioning, and maintenance for mechanical, electrical, and plumbing services.</p>
        <p>Godwin Groups brings together design, manufacturing, and execution teams, including project engineers, project managers, finite element analysts, MEP engineers, 3D modeling engineers, AutoCAD designers, technicians, and skilled workers. The team coordinates delivery around agreed project schedules.</p>
        <div className="stats">
          <div><b>2011</b><strong>Established</strong></div>
          <div><b>India</b><strong>Project reach</strong></div>
        </div>
      </div>
      <img className="welcome-image" src={`${media}fire-safety.jpg`} alt="Godwin fire alarm and safety equipment" loading="lazy" />
    </section>
  );
}

function Values() {
  return (
    <section className="values">
      <div className="values-inner">
        {values.map(([icon, title, description]) => (
          <article key={title}>
            <span className="value-icon"><Icon name={icon} size={43} strokeWidth={1.6} /></span>
            <div><h2>{title}</h2><p>{description}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ClientReviews() {
  const [activeReview, setActiveReview] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener?.("change", updatePreference);
    return () => preference.removeEventListener?.("change", updatePreference);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return undefined;
    const timer = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % clientReviews.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  const showReview = (offset) => {
    setActiveReview((current) => (current + offset + clientReviews.length) % clientReviews.length);
  };

  return (
    <section
      className="home-reviews"
      aria-labelledby="home-reviews-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="content-width home-reviews-inner">
        <div className="home-reviews-heading">
          <p className="home-reviews-eyebrow">PUBLIC CUSTOMER FEEDBACK</p>
          <h2 id="home-reviews-title">What reviewers say about Godwin</h2>
          <p>Review excerpts from Godwin’s public Justdial listing. Reviewer names appear as listed; company affiliations are not provided.</p>
          <a href="https://www.justdial.com/Vijayawada/Godwin-Fire-Fighting-Systems-Kabela-Road-Near-Sitara-Centre-Vidyadharapuram/0866PX866-X866-150404120550-T2J3_BZDET/reviews" target="_blank" rel="noreferrer">Read reviews on Justdial <span aria-hidden="true">↗</span></a>
        </div>
        <div className="home-reviews-carousel" aria-roledescription="carousel" aria-label="Public reviews">
          <div className="home-reviews-window">
            <div className="home-reviews-track" style={{ transform: `translateX(-${activeReview * 100}%)` }}>
              {clientReviews.map((review, index) => (
                <article className="home-review-slide" key={review.name} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${clientReviews.length}`}>
                  <span className="home-review-quote-mark" aria-hidden="true">“</span>
                  <blockquote>{review.quote}</blockquote>
                  <div className="home-review-meta"><span className="home-review-initial" aria-hidden="true">{review.name.charAt(0)}</span><div><strong>{review.name}</strong><span>Public reviewer · {review.date}</span></div></div>
                </article>
              ))}
            </div>
          </div>
          <div className="home-reviews-controls">
            <span className="home-reviews-count">0{activeReview + 1} <i /> 0{clientReviews.length}</span>
            <div>
              <button type="button" aria-label="Previous review" onClick={() => showReview(-1)}>‹</button>
              <button type="button" aria-label="Next review" onClick={() => showReview(1)}>›</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main id="main-content" tabIndex="-1">
      <div className="home-groups-backdrop">
        <GroupCards />
        <Industries />
      </div>
      <StaffingBanner />
      <Welcome />
      <Values />
      <ClientReviews />
    </main>
  );
}
