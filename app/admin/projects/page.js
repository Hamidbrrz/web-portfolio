'use client';
import { useEffect, useState } from 'react';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    fetch('https://api-portfolio-1-puyb.onrender.com/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('https://api-portfolio-1-puyb.onrender.com/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, link }),
    });
    setTitle('');
    setDescription('');
    setLink('');
    window.location.reload(); // recharge pour afficher le nouveau projet
  };

  return (
    <div className="form-section">
      <h2 className="section-title">Ajouter un projet</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br /><br />
        <textarea
          className="textarea"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />
        <input
          className="input"
          placeholder="Lien"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <br /><br />
        <button className="btn-primary" type="submit">
          ➕ Ajouter projet
        </button>
      </form>

      <h2 className="section-title" style={{ marginTop: '3rem' }}>Projets existants</h2>
      {projects.map((proj) => (
        <div key={proj.id} className="project-card">
          <h3>{proj.title}</h3>
          <p>{proj.description}</p>
          <a href={proj.link} target="_blank" rel="noreferrer">🔗 Voir</a>
        </div>
      ))}
    </div>
  );
}
