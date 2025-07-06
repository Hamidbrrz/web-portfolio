'use client';
import { useEffect, useState } from 'react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('https://api-portfolio-1-puyb.onrender.com/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <section className="projects-section">
      <h1 className="projects-title">Mes projets</h1>
      {projects.length === 0 ? (
        <p className="project-placeholder">Aucun projet pour le moment.</p>
      ) : (
        <div className="project-list">
          {projects.map((proj) => (
            <div key={proj.id} className="project-card">
              <h2>{proj.title}</h2>
              <p>{proj.description}</p>
              {proj.link && (
                <a href={proj.link} target="_blank" rel="noopener noreferrer">
                  🔗 Voir le projet
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
