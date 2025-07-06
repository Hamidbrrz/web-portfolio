'use client';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const PASSWORD = 'hamid2025';
  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [section, setSection] = useState('');

  // ==== À PROPOS ====
  const [aboutName, setAboutName] = useState('');
  const [aboutTitle, setAboutTitle] = useState('');
  const [aboutBio, setAboutBio] = useState('');
  const [aboutImageUrl, setAboutImageUrl] = useState('');

  const fetchAbout = async () => {
    const res = await fetch('https://api-portfolio-1-puyb.onrender.com/api/about');
    const data = await res.json();
    setAboutName(data.name || '');
    setAboutTitle(data.title || '');
    setAboutBio(data.bio || '');
    setAboutImageUrl(data.image_url || '');
  };

  const handleAboutSubmit = async (e) => {
    e.preventDefault();
    await fetch('https://api-portfolio-1-puyb.onrender.com/api/about', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: aboutName,
        title: aboutTitle,
        bio: aboutBio,
        image_url: aboutImageUrl,
      }),
    });
    alert('À propos mis à jour !');
  };

  // ==== PROJETS ====
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  const fetchProjects = async () => {
    const res = await fetch('https://api-portfolio-1-puyb.onrender.com/api/projects');
    const data = await res.json();
    setProjects(data || []);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    await fetch('https://api-portfolio-1-puyb.onrender.com/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, link }),
    });
    setTitle('');
    setDescription('');
    setLink('');
    fetchProjects();
  };

  const handleDeleteProject = async (id) => {
    await fetch(`https://api-portfolio-1-puyb.onrender.com/api/projects/${id}`, {
      method: 'DELETE',
    });
    fetchProjects();
  };

  // ==== BLOG ====
  const [posts, setPosts] = useState([]);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');

  const fetchBlog = async () => {
    const res = await fetch('https://api-portfolio-1-puyb.onrender.com/api/blog');
    const data = await res.json();
    setPosts(data || []);
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    await fetch('https://api-portfolio-1-puyb.onrender.com/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: blogTitle, content: blogContent }),
    });
    setBlogTitle('');
    setBlogContent('');
    fetchBlog();
  };

  const handleDeleteBlog = async (id) => {
    await fetch(`https://api-portfolio-1-puyb.onrender.com/api/blog/${id}`, {
      method: 'DELETE',
    });
    fetchBlog();
  };

  // ==== CONTACT ====
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [message, setMessage] = useState('');

  const fetchContact = async () => {
    const res = await fetch('https://api-portfolio-1-puyb.onrender.com/api/contact');
    const data = await res.json();
    setEmail(data.email || '');
    setLinkedin(data.linkedin || '');
    setGithub(data.github || '');
    setMessage(data.message || '');
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    await fetch('https://api-portfolio-1-puyb.onrender.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, linkedin, github, message }),
    });
    alert('Contact mis à jour !');
  };

  // ==== LOGIN ====
  useEffect(() => {
    if (localStorage.getItem('auth') === 'true') {
      setIsAuthed(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === PASSWORD) {
      localStorage.setItem('auth', 'true');
      setIsAuthed(true);
    } else {
      alert('Mot de passe incorrect');
    }
  };

  if (!isAuthed) {
  return (
    <main className="admin-login">
      <div className="login-card">
        <h1>🔐 Accès Admin</h1>
        <input
          className="login-input"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>
          Se connecter
        </button>
      </div>
    </main>
  );
}


  return (
    <main className="admin-dashboard">
      <h1>Tableau de bord 🛠️</h1>
      <div className="admin-buttons">
        <button onClick={() => { setSection('about'); fetchAbout(); }}>✏️ Modifier À propos</button>
        <button onClick={() => { setSection('projects'); fetchProjects(); }}>📁 Modifier Projets</button>
        <button onClick={() => { setSection('blog'); fetchBlog(); }}>📝 Modifier Blog</button>
        <button onClick={() => { setSection('contact'); fetchContact(); }}>📬 Modifier Contact</button>
      </div>

      {section === 'about' && (
        <section className="form-section">
          <h2 className="section-title">Modifier la section À propos</h2>
          <form onSubmit={handleAboutSubmit}>
            <input className="input" type="text" placeholder="Nom" value={aboutName} onChange={(e) => setAboutName(e.target.value)} />
            <input className="input" type="text" placeholder="Titre professionnel" value={aboutTitle} onChange={(e) => setAboutTitle(e.target.value)} />
            <input className="input" type="text" placeholder="URL de l'image" value={aboutImageUrl} onChange={(e) => setAboutImageUrl(e.target.value)} />
            <textarea className="textarea" placeholder="Biographie" value={aboutBio} onChange={(e) => setAboutBio(e.target.value)} />
            <button type="submit" className="btn-primary">💾 Enregistrer</button>
          </form>
        </section>
      )}

      {section === 'projects' && (
        <section className="form-section">
          <h2 className="section-title">Ajouter un projet</h2>
          <form onSubmit={handleAddProject}>
            <input className="input" type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea className="textarea" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input className="input" type="text" placeholder="Lien du projet" value={link} onChange={(e) => setLink(e.target.value)} />
            <button type="submit" className="btn-primary">➕ Ajouter projet</button>
          </form>
          <h3 className="section-title" style={{ marginTop: '2rem' }}>Projets existants</h3>
          {projects.map((proj) => (
            <div key={proj.id} className="project-card">
              <h3>{proj.title}</h3>
              <p>{proj.description}</p>
              <a href={proj.link} target="_blank" rel="noreferrer">🔗 Voir</a>
              <button className="btn-primary" onClick={() => handleDeleteProject(proj.id)}>🗑 Supprimer</button>
            </div>
          ))}
        </section>
      )}

      {section === 'blog' && (
        <section className="form-section">
          <h2 className="section-title">Ajouter un article</h2>
          <form onSubmit={handleAddBlog}>
            <input className="input" type="text" placeholder="Titre" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} />
            <textarea className="textarea" placeholder="Contenu" value={blogContent} onChange={(e) => setBlogContent(e.target.value)} />
            <button type="submit" className="btn-primary">➕ Ajouter article</button>
          </form>
          <h3 className="section-title" style={{ marginTop: '2rem' }}>Articles existants</h3>
          {posts.map((post) => (
            <div key={post.id} className="project-card">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <button className="btn-primary" onClick={() => handleDeleteBlog(post.id)}>🗑 Supprimer</button>
            </div>
          ))}
        </section>
      )}

      {section === 'contact' && (
        <section className="form-section">
          <h2 className="section-title">Modifier les contacts</h2>
          <form onSubmit={handleContactSubmit}>
            <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="input" type="text" placeholder="LinkedIn" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
            <input className="input" type="text" placeholder="GitHub" value={github} onChange={(e) => setGithub(e.target.value)} />
            <textarea className="textarea" placeholder="Message perso" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button type="submit" className="btn-primary">💾 Enregistrer</button>
          </form>
        </section>
      )}
    </main>
  );
}
