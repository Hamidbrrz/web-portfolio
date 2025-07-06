'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

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
          setAboutData({ name: '', title: '', bio: '', image_url: '' });
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la section à propos:', error);
        setAboutData({ name: '', title: '', bio: '', image_url: '' });
      }
    };

    fetchData();
  }, []);

  if (!aboutData) {
    return <div className="about-section">Chargement...</div>;
  }

  const imageSrc =
    aboutData.image_url?.startsWith('/') || aboutData.image_url?.startsWith('http')
      ? aboutData.image_url
      : '/placeholder.png';

  return (
    <section className="about-section">
      <div className="about-photo">
        <Image
          src={imageSrc}
          alt="Photo de profil"
          width={140}
          height={200}
          style={{ borderRadius: '9999px', objectFit: 'cover' }}
        />
      </div>
      <h2 className="about-title">{aboutData.name}</h2>
      <p className="about-title">{aboutData.title}</p>
      <p className="about-bio">{aboutData.bio}</p>

      <div className="tech-icons">
        <Image src="/python.svg" alt="Python" width={36} height={36} />
        <Image src="/react.svg" alt="React" width={36} height={36} />
        <Image src="/html.png" alt="HTML" width={36} height={36} />
      </div>
    </section>
  );
}
