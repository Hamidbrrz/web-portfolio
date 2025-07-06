'use client';
import { useEffect, useState } from 'react';

export default function ContactPage() {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    fetch('https://api-portfolio-1-puyb.onrender.com/api/contact')
      .then((res) => res.json())
      .then((data) => setContact(data))
      .catch((err) => console.error('Erreur contact:', err));
  }, []);

  if (!contact) return <p>Chargement...</p>;

  return (
    <section className="contact-section">
      <h2>Contactez-moi</h2>
      <p>{contact.message}</p>
      <div className="contact-links">
        <a href={`mailto:${contact.email}`} className="contact-link">
          <img src="/icons/email.svg" alt="email" /> {contact.email}
        </a>
        <a href={contact.linkedin} className="contact-link" target="_blank">
          <img src="/icons/linkedin.svg" alt="linkedin" /> LinkedIn
        </a>
        <a href={contact.github} className="contact-link" target="_blank">
          <img src="/icons/github.svg" alt="github" /> GitHub
        </a>
      </div>
    </section>
  );
}
