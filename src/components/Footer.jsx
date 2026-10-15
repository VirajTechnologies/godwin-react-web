import React from "react";
import Icon from "./Icon.jsx";

const groupLinks = [
  ["Godwin ITS", "/#group-1"],
  ["Godwin Heavy Fabrications", "/#group-2"],
  ["Godwin Electricals", "/#group-4"],
  ["Architecture & MEP Services", "/#group-3"],
  ["Powerplant Engineering Services", "/#group-5"],
  ["Godwin Industries", "/#industries"],
  ["Godwin Global Technologies", "/#group-6"],
];

function SocialLinks() {
  return (
    <div className="footer-social">
      <a href="https://www.facebook.com/" aria-label="Facebook"><Icon name="facebook" /></a>
      <a href="https://www.instagram.com/" aria-label="Instagram"><Icon name="instagram" /></a>
      <a href="https://www.youtube.com/" aria-label="YouTube"><Icon name="youtube" /></a>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-inner content-width">
        <div className="footer-brand">
          <a className="footer-logo" href="/#top" aria-label="Godwin Groups home">
            <img src="/images/logo-white.png" alt="Godwin Groups" />
          </a>
          <p>Copyright {String.fromCharCode(169)} 2025 Godwin Groups.<br />All Rights Reserved.</p>
          <a className="google-review" href="/#testimonials">
            <img src="/images/review-badge.png" alt="Godwin 12+ years of work experience" />
          </a>
        </div>
        <nav className="footer-col" aria-label="Quick links">
          <h2>Quick Links</h2>
          <a href="/#top">Home</a>
          <a href="/#about">About us</a>
          <a href="/#groups">Groups</a>
          <a href="/clients">Clients</a>
          <a href="/contact-us">Contact Us</a>
          <a href="mailto:info@godwin.co.in?subject=Enquiry">Enquiry</a>
          <SocialLinks />
        </nav>
        <div className="footer-col footer-groups">
          <h2>Groups</h2>
          {groupLinks.map(([group, href]) => <a href={href} key={group}>{group}</a>)}
        </div>
        <div className="footer-col footer-contact">
          <h2>Contact</h2>
          <p>Andhra Pradesh<br />Telangana<br />Tamilnadu<br />Karnataka<br />Kerala</p>
          <a href="tel:+919010162657">Phone: +91 9010162657</a>
          <a href="mailto:info@godwin.co.in">Email: info@godwin.co.in</a>
        </div>
      </div>
    </footer>
  );
}
