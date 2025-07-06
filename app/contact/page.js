'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
          <Image src="/email.png" alt="email" width={24} height={24} /> {contact.email}
        </a>
        <a href={contact.linkedin} className="contact-link" target="_blank" rel="noreferrer">
          <Image src="/linkedin.png" alt="linkedin" width={24} height={24} /> LinkedIn
        </a>
        <a href={contact.github} className="contact-link" target="_blank" rel="noreferrer">
          <Image src="/git.svg" alt="github" width={24} height={24} /> GitHub
        </a>
      </div>
    </section>
  );
}
