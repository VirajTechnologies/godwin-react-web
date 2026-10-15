import React, { useState } from "react";
import Icon from "../components/Icon.jsx";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

const officeAddress = "Flat No. 89, Road No. 3, RTC Colony, Patamata, Vijayawada, Andhra Pradesh 520008, India";
const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Godwin Groups, ${officeAddress}`)}`;
const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(`Godwin Groups, ${officeAddress}`)}&z=15&output=embed`;

const fields = [
  { name: "firstName", label: "First name", placeholder: "First Name", autoComplete: "given-name" },
  { name: "lastName", label: "Last name", placeholder: "Last Name", autoComplete: "family-name" },
  { name: "email", label: "Email address", placeholder: "Email", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone number (optional)", placeholder: "Phone Number (optional)", type: "tel", autoComplete: "tel", required: false },
];

function validateField(name, value, required = true) {
  const text = value.trim();
  if (!text) return required ? "This field is required." : "";
  if (name === "firstName" || name === "lastName") {
    if (text.length > 50) return "Please use 50 characters or fewer.";
    if (!/^[\p{L}\p{M}][\p{L}\p{M}' -]{0,49}$/u.test(text)) {
      return "Use letters, spaces, apostrophes, or hyphens only.";
    }
  }
  if (name === "email" && text.length > 254) return "Please enter an email address under 255 characters.";
  if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(text)) {
    return "Enter a valid email address.";
  }
  if (name === "phone") {
    const digits = text.replace(/\D/g, "");
    if (!/^\+?[0-9() .-]+$/.test(text) || digits.length < 7 || digits.length > 15) {
      return "Enter a valid phone number (7\u201315 digits).";
    }
  }
  if (name === "message" && text.length < 10) return "Please enter at least 10 characters.";
  if (name === "message" && text.length > 2000) return "Please keep your message under 2,000 characters.";
  return "";
}

function ContactField({ name, label, placeholder, type = "text", autoComplete, value, error, onChange, onBlur, multiline = false, required = true }) {
  const commonProps = {
    id: name,
    name,
    placeholder,
    value,
    required,
    "aria-required": required,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${name}-error` : undefined,
    maxLength: name === "email" ? 254 : name === "phone" ? 25 : name === "message" ? 2000 : 50,
    onChange: (event) => onChange(name, event.target.value),
    onBlur: (event) => onBlur(name, event.target.value),
  };

  return (
    <div className={`contact-field${multiline ? " message-field" : ""}`}>
      <label className="contact-label" htmlFor={name}>{label}</label>
      {multiline
        ? <textarea {...commonProps} maxLength={2000} />
        : <input {...commonProps} type={type} autoComplete={autoComplete} />}
      {error && <span className="field-error" id={`${name}-error`} role="alert">{error}</span>}
    </div>
  );
}

function ContactHero() {
  return (
    <section className="contact-hero">
      <div className="contact-hero-inner content-width">
        <h1>Contact Us</h1>
        <p>Established By IIT Professionals</p>
      </div>
    </section>
  );
}

function ContactDetails() {
  return (
    <section className="contact-details content-width" aria-label="Godwin Groups contact details and location">
      <div className="contact-details-copy">
        <article className="contact-detail-card">
          <h2>Contact Godwin Groups</h2>
          <p>Business enquiries</p>
          <a href="tel:+919010162657"><Icon name="phone" />Call: +91 90101 62657</a>
          <a href="https://wa.me/919949234822" target="_blank" rel="noreferrer"><Icon name="phone" />WhatsApp: +91 99492 34822</a>
          <a href="mailto:info@godwin.co.in"><Icon name="mail" />info@godwin.co.in</a>
          <a href="https://in.linkedin.com/company/godwingroup" target="_blank" rel="noreferrer"><Icon name="linkedin" />Godwin Groups on LinkedIn</a>
        </article>
        <article className="contact-detail-card">
          <h3>Office address</h3>
          <address>{officeAddress}</address>
          <a className="contact-map-link" href={mapsSearchUrl} target="_blank" rel="noreferrer">Open location in Google Maps <span aria-hidden="true">↗</span></a>
          <p className="contact-service-areas"><strong>Service areas:</strong> Andhra Pradesh, Telangana, Tamil Nadu, Karnataka, and Kerala.</p>
        </article>
      </div>
      <div className="contact-map">
        <h3>Find our Vijayawada office</h3>
        <iframe
          title="Map showing Godwin Groups in Patamata, Vijayawada"
          src={mapsEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}

export default function ContactPage() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [emailLink, setEmailLink] = useState("");

  function updateField(name, value) {
    setValues((current) => ({ ...current, [name]: value }));
    setEmailLink("");
    if (errors[name]) setErrors((current) => ({ ...current, [name]: validateField(name, value, name !== "phone") }));
  }

  function validateOnBlur(name, value) {
    setErrors((current) => ({ ...current, [name]: validateField(name, value, name !== "phone") }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = Object.fromEntries(
      Object.entries(values)
        .map(([name, value]) => [name, validateField(name, value, name !== "phone")])
        .filter(([, error]) => error),
    );
    setErrors(nextErrors);
    setEmailLink("");
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    const fullName = `${values.firstName.trim()} ${values.lastName.trim()}`;
    const body = `Name: ${fullName}\nEmail: ${values.email.trim()}\nPhone: ${values.phone.trim()}\n\nMessage:\n${values.message.trim()}`;
    setEmailLink(`mailto:info@godwin.co.in?subject=${encodeURIComponent(`Contact enquiry from ${fullName}`)}&body=${encodeURIComponent(body)}`);
  }

  return (
    <>
      <ContactHero />
      <main id="main-content" tabIndex="-1" className="contact-page">
        <section className="contact-form-section content-width">
          <div className="contact-intro">
            <h2>Get In Touch With Our Expert Team</h2>
            <p>Share your details and message. We’ll prepare an enquiry for you to send from your email app.</p>
          </div>
          <form className="contact-form" noValidate onSubmit={handleSubmit}>
            <div className="contact-fields">
              {fields.map((field) => (
                <ContactField key={field.name} {...field} value={values[field.name]} error={errors[field.name]} onChange={updateField} onBlur={validateOnBlur} />
              ))}
            </div>
            <ContactField name="message" label="Message" placeholder="Message" value={values.message} error={errors.message} onChange={updateField} onBlur={validateOnBlur} multiline />
            <button className="contact-submit" type="submit">Prepare Email Enquiry</button>
            {emailLink && (
              <p className="contact-success" role="status">
                Your enquiry is ready to send. <a href={emailLink}>Open your email app to review and send it.</a>
              </p>
            )}
          </form>
        </section>
        <ContactDetails />
      </main>
    </>
  );
}
