'use client';

import { useEffect, useState } from 'react';

export default function AboutPage() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://api-portfolio-1-puyb.onrender.com/api/about');
        const data = await res.json();
        if (data && typeof data === 'object') {
          setAboutData({
            name: data.name || '',
            title: data.title || '',
            bio: data.bio || '',
            image_url: data.image_url || ''
          });
        } else {
          setAboutData({
            name: '',
            title: '',
            bio: '',
            image_url: ''
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la section à propos:', error);
        setAboutData({
          name: '',
          title: '',
          bio: '',
          image_url: ''
        });
      }
    };

    fetchData();
  }, []);

  if (!aboutData) {
    return <div className="about-section">Chargement...</div>;
  }

  const imageSrc = aboutData.image_url?.startsWith('/')
    ? aboutData.image_url
    : aboutData.image_url?.startsWith('http')
      ? aboutData.image_url
      : '/placeholder.png';

  return (
    <section className="about-section">
      <img src={imageSrc} alt="Photo de profil" className="about-photo" />
      <h2 className="about-title">{aboutData.name}</h2>
      <p className="about-title">{aboutData.title}</p>
      <p className="about-bio">{aboutData.bio}</p>

      <div className="about-skills">
        <img src="/python.svg" alt="Python" className="skill-icon" />
        <img src="/react.svg" alt="react" className="skill-icon" />
        <img src="/html.png" alt="html" className="skill-icon" />
      </div>
    </section>
  );
}
