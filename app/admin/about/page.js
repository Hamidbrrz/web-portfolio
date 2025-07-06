'use client';

import { useEffect, useState } from 'react';

export default function AboutPage() {
  const [aboutData, setAboutData] = useState({
    name: '',
    title: '',
    bio: '',
    image_url: ''
  });

  useEffect(() => {
    fetch('https://api-portfolio-1-puyb.onrender.com/api/about')
      .then((res) => res.json())
      .then((data) => {
        setAboutData({
          name: data.name || '',
          title: data.title || '',
          bio: data.bio || '',
          image_url: data.image_url || ''
        });
      })
      .catch((err) => {
        console.error("Erreur lors du chargement de la section à propos :", err);
      });
  }, []);

  const isValidImage = aboutData.image_url && (aboutData.image_url.startsWith('http://') || aboutData.image_url.startsWith('https://'));

  return (
    <section className="about-section">
      {isValidImage && (
        <img src={aboutData.image_url} alt="Photo de profil" className="about-photo" />
      )}
      <h2 className="about-title">{aboutData.name}</h2>
      <p className="about-title">{aboutData.title}</p>
      <p className="about-bio">{aboutData.bio}</p>
    </section>
  );
}
