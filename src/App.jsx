import React, { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ClientsPage from "./pages/ClientsPage.jsx";
import ServicePage from "./pages/ServicePage.jsx";
import { AboutPage, OrganizationPage, FlowchartPage } from "./pages/AboutPages.jsx";
import Preloader from "./components/Preloader.jsx";
import { serviceLinks } from "./data/siteData.js";

export default function App() {
  const [pathname, setPathname] = useState(window.location.pathname);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const startedAt = Date.now();
    let minimumTimer;
    const fallbackTimer = window.setTimeout(() => setIsLoading(false), 4500);
    const onLoad = () => {
      minimumTimer = window.setTimeout(() => setIsLoading(false), Math.max(0, 650 - (Date.now() - startedAt)));
    };

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(minimumTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    const titles = {
      "/": "Home",
      "/clients": "Clients",
      "/contact-us": "Contact Us",
      "/about-us": "About Us",
      "/our-organization": "Our Organization",
      "/flowchart1": "Group Flowchart",
    };
    const serviceTitle = Object.entries(serviceLinks).find(([, href]) => href === pathname)?.[0];
    const pageTitle = titles[pathname] || serviceTitle || (pathname.startsWith("/services/") ? "Service" : "Home");
    const descriptions = {
      Home: "Godwin Groups provides fire and safety systems, MEP, electrical engineering, fabrication, and industrial services across India.",
      Clients: "Explore Godwin Groups’ engineering capabilities and public customer feedback. Representative workplace photography is identified clearly.",
      "Contact Us": "Contact Godwin Groups about fire and safety systems, MEP, electrical engineering, fabrication, and industrial project requirements.",
      "About Us": "Learn about Godwin Groups and its engineering, manufacturing, and project execution capabilities.",
      "Our Organization": "View the Godwin Groups organization chart and its business divisions.",
      "Group Flowchart": "View the Godwin Groups flowchart showing its divisions and services.",
    };
    document.title = pageTitle === "Home" ? "Godwin Groups | Engineering and Industrial Services" : `${pageTitle} | Godwin Groups`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = descriptions[pageTitle] || `Learn about Godwin Groups ${pageTitle.toLowerCase()} services and project capabilities.`;
  }, [pathname]);

  useEffect(() => {
    const onPop = () => setPathname(window.location.pathname);
    const onClick = (event) => {
      const anchor = event.target.closest('a[href^="/"]');
      if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || anchor.target === "_blank") return;
      const target = new URL(anchor.href, window.location.origin);
      if (target.origin !== window.location.origin) return;
      event.preventDefault();
      window.history.pushState({}, "", target.pathname + target.hash);
      setPathname(target.pathname);
      if (target.hash) window.setTimeout(() => document.querySelector(target.hash)?.scrollIntoView({ behavior: "smooth" }), 0);
      else window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("popstate", onPop);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const pages = {
    "/contact-us": <ContactPage/>,
    "/clients": <ClientsPage/>,
    "/about-us": <AboutPage/>,
    "/our-organization": <OrganizationPage/>,
    "/flowchart1": <FlowchartPage/>,
  };
  const content = pathname.startsWith("/services/")
    ? <ServicePage path={pathname}/>
    : <><div id="top" className="page-top-anchor"/><Header/>{pages[pathname] || <HomePage/>}<Footer/></>;
  return <>{content}<Preloader visible={isLoading}/></>;
}
