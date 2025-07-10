'use client';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const API = 'https://api-portfolio-1-puyb.onrender.com';
  const [isAuthed, setIsAuthed] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [section, setSection] = useState('');

  const [aboutName, setAboutName] = useState('');
  const [aboutTitle, setAboutTitle] = useState('');
  const [aboutBio, setAboutBio] = useState('');
  const [aboutImageUrl, setAboutImageUrl] = useState('');

  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  const [posts, setPosts] = useState([]);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');

  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthed(true);
  }, []);

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setIsAuthed(true);
      } else alert(data.error || 'Erreur');
    } catch {
      alert('Erreur réseau');
    }
  };

  const authHeader = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });

  const fetchAbout = async () => {
    const res = await fetch(`${API}/api/about`);
    const data = await res.json();
    setAboutName(data.name || '');
    setAboutTitle(data.title || '');
    setAboutBio(data.bio || '');
    setAboutImageUrl(data.image_url || '');
  };

  const handleAboutSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API}/api/about`, {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify({ name: aboutName, title: aboutTitle, bio: aboutBio, image_url: aboutImageUrl })
    });
    alert('À propos mis à jour !');
  };

  const fetchProjects = async () => {
    const res = await fetch(`${API}/api/projects`);
    const data = await res.json();
    setProjects(data);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    await fetch(`${API}/api/projects`, {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify({ title, description, link })
    });
    setTitle(''); setDescription(''); setLink('');
    fetchProjects();
  };

  const handleDeleteProject = async (id) => {
    await fetch(`${API}/api/projects/${id}`, {
      method: 'DELETE', headers: authHeader()
    });
    fetchProjects();
  };

  const fetchBlog = async () => {
    const res = await fetch(`${API}/api/blog`);
    const data = await res.json();
    setPosts(data);
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    await fetch(`${API}/api/blog`, {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify({ title: blogTitle, content: blogContent })
    });
    setBlogTitle(''); setBlogContent('');
    fetchBlog();
  };

  const handleDeleteBlog = async (id) => {
    await fetch(`${API}/api/blog/${id}`, {
      method: 'DELETE', headers: authHeader()
    });
    fetchBlog();
  };

  const fetchContact = async () => {
    const res = await fetch(`${API}/api/contact`);
    const data = await res.json();
    setEmail(data.email || '');
    setLinkedin(data.linkedin || '');
    setGithub(data.github || '');
    setMessage(data.message || '');
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API}/api/contact`, {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify({ email, linkedin, github, message })
    });
    alert('Contact mis à jour');
  };

  const handleExport = async () => {
    const res = await fetch(`${API}/api/export`, { headers: authHeader() });
    const data = await res.json();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'backup.json';
    link.click();
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    const json = JSON.parse(text);
    await fetch(`${API}/api/import`, {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify(json)
    });
    alert('Importation réussie');
  };

  if (!isAuthed) return (
    <main className="admin-login">
      <div className="login-card">
        <h1>🔐 Connexion Admin</h1>
        <input className="login-input" type="text" placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="login-input" type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="login-button" onClick={handleLogin}>Se connecter</button>
      </div>
    </main>
  );

  return (
    <main className="admin-dashboard">
      <h1>Tableau de bord 🛠️</h1>
      <div className="admin-buttons">
        <button onClick={() => { setSection('about'); fetchAbout(); }}>✏️ Modifier À propos</button>
        <button onClick={() => { setSection('projects'); fetchProjects(); }}>📁 Modifier Projets</button>
        <button onClick={() => { setSection('blog'); fetchBlog(); }}>📝 Modifier Blog</button>
        <button onClick={() => { setSection('contact'); fetchContact(); }}>📬 Modifier Contact</button>
        <button onClick={handleExport}>📤 Exporter</button>
        <label className="btn-primary" style={{ cursor: 'pointer' }}>📥 Importer JSON
          <input type="file" accept="application/json" onChange={handleImport} style={{ display: 'none' }} />
        </label>
      </div>

      {section === 'about' && <form className="form-section" onSubmit={handleAboutSubmit}>
        <input className="input" placeholder="Nom" value={aboutName} onChange={(e) => setAboutName(e.target.value)} />
        <input className="input" placeholder="Titre" value={aboutTitle} onChange={(e) => setAboutTitle(e.target.value)} />
        <input className="input" placeholder="Image URL" value={aboutImageUrl} onChange={(e) => setAboutImageUrl(e.target.value)} />
        <textarea className="textarea" placeholder="Bio" value={aboutBio} onChange={(e) => setAboutBio(e.target.value)} />
        <button className="btn-primary" type="submit">💾 Enregistrer</button>
      </form>}

      {section === 'projects' && <section className="form-section">
        <form onSubmit={handleAddProject}>
          <input className="input" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea className="textarea" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input className="input" placeholder="Lien" value={link} onChange={(e) => setLink(e.target.value)} />
          <button className="btn-primary" type="submit">Ajouter</button>
        </form>
        {projects.map(p => <div key={p.id} className="project-card">
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <a href={p.link} target="_blank">🔗 Voir</a>
          <button onClick={() => handleDeleteProject(p.id)} className="btn-primary">🗑 Supprimer</button>
        </div>)}
      </section>}

      {section === 'blog' && <section className="form-section">
        <form onSubmit={handleAddBlog}>
          <input className="input" placeholder="Titre" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} />
          <textarea className="textarea" placeholder="Contenu" value={blogContent} onChange={(e) => setBlogContent(e.target.value)} />
          <button className="btn-primary" type="submit">Ajouter</button>
        </form>
        {posts.map(p => <div key={p.id} className="project-card">
          <h3>{p.title}</h3>
          <p>{p.content}</p>
          <button onClick={() => handleDeleteBlog(p.id)} className="btn-primary">🗑 Supprimer</button>
        </div>)}
      </section>}

      {section === 'contact' && <form className="form-section" onSubmit={handleContactSubmit}>
        <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" placeholder="LinkedIn" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
        <input className="input" placeholder="GitHub" value={github} onChange={(e) => setGithub(e.target.value)} />
        <textarea className="textarea" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className="btn-primary" type="submit">💾 Enregistrer</button>
      </form>}
    </main>
  );
}
