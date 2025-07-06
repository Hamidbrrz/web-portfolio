'use client';
import { useEffect, useState } from 'react';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://api-portfolio-1-puyb.onrender.com/api/blog');
        if (!res.ok) throw new Error('Erreur réseau');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError("Impossible de charger les articles.");
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="projects-container">
      <h1 className="projects-title">Blog</h1>
      {error && <p className="project-placeholder">{error}</p>}
      {posts.length === 0 && !error && (
        <p className="project-placeholder">Aucun article pour le moment.</p>
      )}
      {posts.map((post) => (
        <div key={post.id} className="project-card">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
