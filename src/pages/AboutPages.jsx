import React from "react";

function AboutHero({ title }) {
  return (
    <section className="about-hero">
      <div className="about-hero-inner content-width">
        <h1>{title}</h1>
        <p>Established By IIT Professionals</p>
      </div>
    </section>
  );
}

export function AboutPage() {
  return (
    <main id="main-content" tabIndex="-1">
      <AboutHero title="About Godwin" />
      <section className="about-page-welcome">
        <div className="about-page-inner content-width">
          <img src="/images/about-office.jpg" alt="Godwin team working together" />
          <div className="about-page-copy">
            <h2>Welcome To Godwin Groups</h2>
            <p>Founded in 2011 by IIT alumni, Godwin Groups operates across India and specializes in design, manufacturing, supply, installation, testing, commissioning, and maintenance for mechanical, electrical, and plumbing services.</p>
            <p>Godwin Groups brings together design, manufacturing, and execution teams, including project engineers, project managers, finite element analysts, MEP engineers, 3D modeling engineers, AutoCAD designers, technicians, and skilled workers. The team coordinates delivery around agreed project schedules.</p>
            <div className="stats">
              <div><b>2011</b><strong>Established</strong></div>
              <div><b>India</b><strong>Project reach</strong></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function OrganizationPage() {
  return (
    <>
      <AboutHero title="Our Organization" />
      <main id="main-content" tabIndex="-1" className="organization-page content-width">
        <h2>Our Organization Chart</h2>
        <div className="chart-scroll organization-chart-scroll" role="region" aria-label="Organization chart, scaled to fit the available screen width">
          <img src="/images/organization-chart.jpg" alt="Godwin organization chart: Chairman, MD and CEO, six group divisions, and four supporting departments" />
        </div>
      </main>
    </>
  );
}

export function FlowchartPage() {
  return (
    <>
      <AboutHero title="Godwin Flowchart" />
      <main id="main-content" tabIndex="-1" className="flowchart-page">
        <div className="chart-scroll flowchart-scroll" role="region" aria-label="Group flowchart, scaled to fit the available screen width">
          <img src="/images/group-flowchart.jpg" alt="Godwin Groups flowchart showing its divisions, industries, and services" />
        </div>
        <p className="flowchart-caption">ESTABLISHED BY "IIT" PROFESSIONALS</p>
      </main>
    </>
  );
}
