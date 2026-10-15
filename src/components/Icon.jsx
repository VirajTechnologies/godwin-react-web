import React from "react";

const paths = {
  phone: <><path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M10 17h4"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
  facebook: <path fill="currentColor" stroke="none" d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V10H7.5v3h2.8v8h3.2Z"/>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></>,
  youtube: <><rect x="2.5" y="5" width="19" height="14" rx="4"/><path fill="currentColor" stroke="none" d="m10 9 5 3-5 3z"/></>,
  twitter: <path fill="currentColor" stroke="none" d="M22 5.9a8 8 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.3 8.3 0 0 1-2.7 1 4.1 4.1 0 0 0-7 3.8 11.7 11.7 0 0 1-8.5-4.3 4.1 4.1 0 0 0 1.3 5.5 4 4 0 0 1-1.9-.5v.1a4.1 4.1 0 0 0 3.3 4 4 4 0 0 1-1.9.1 4.1 4.1 0 0 0 3.8 2.9A8.2 8.2 0 0 1 2 18.6a11.6 11.6 0 0 0 17.9-9.8v-.5A8 8 0 0 0 22 5.9Z"/>,
  linkedin: <path fill="currentColor" stroke="none" d="M5.2 8.3a1.9 1.9 0 1 0 0-3.8 1.9 1.9 0 0 0 0 3.8ZM3.5 10h3.4v10.5H3.5zm5.5 0h3.2v1.4h.1a3.5 3.5 0 0 1 3.2-1.7c3.4 0 4 2.2 4 5.1v5.7h-3.4v-5c0-1.2 0-2.8-1.8-2.8s-2 1.3-2 2.7v5.1H9Z"/>,
  "chevron-down": <path d="m6 9 6 6 6-6"/>,
  "chevron-up": <path d="m6 15 6-6 6 6"/>,
  "arrow-right": <><path d="M4 12h15"/><path d="m13 6 6 6-6 6"/></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
  close: <><path d="m6 6 12 12M18 6 6 18"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.1.9-1.3 2.3-1.3-.5a7.8 7.8 0 0 1-1.6.9l-.2 1.4h-2.6l-.3-1.4a7.8 7.8 0 0 1-1.6-.9l-1.3.5-1.3-2.3 1.1-.9a7 7 0 0 1 0-1.8l-1.1-.9 1.3-2.3 1.3.5a7.8 7.8 0 0 1 1.6-.9l.3-1.4h2.6l.2 1.4a7.8 7.8 0 0 1 1.6.9l1.3-.5 1.3 2.3-1.1.9a7 7 0 0 1-.1 1.7Z"/></>,
  discover: <><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8z"/></>,
  build: <><path d="m14 7 3-3 3 3-3 3M4 20l9-9M8 5l3-2 2 2-2 3 2 2-3 3-2-2-3 2-2-2 2-3-2-2 2-2z"/></>,
  connect: <><circle cx="6" cy="12" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="m8.7 10.7 6.6-3.4m-6.6 6 6.6 3.4"/></>,
  launch: <><path d="M12 19c4-2 6-6 7-14-8 1-12 3-14 7l7 7Z"/><path d="m9 15-4 1-2 5 5-2 1-4Zm3-3 3-3"/></>,
};

export default function Icon({ name, size = 18, strokeWidth = 1.8, className = "" }) {
  return <svg className={className} aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}
