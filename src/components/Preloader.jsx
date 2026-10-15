import React from "react";

export default function Preloader({ visible }) {
  return (
    <div
      className={`site-preloader${visible ? "" : " is-hidden"}`}
      role="status"
      aria-label="Loading Godwin Groups"
      aria-hidden={!visible}
    >
      <div className="preloader-brand">
        <img src="/images/logo.png" alt="Godwin Groups" />
      </div>
      <span className="preloader-progress" aria-hidden="true"><span /></span>
      <span className="preloader-label">Loading your experience</span>
    </div>
  );
}
