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

  // ==== IMPORT/EXPORT ====
  const handleExport = async () => {
    const res = await fetch('https://api-portfolio-1-puyb.onrender.com/api/export', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
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
    await fetch('https://api-portfolio-1-puyb.onrender.com/api/import', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(json),
    });
    alert('Importation terminée !');
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
        <button onClick={handleExport}>📤 Exporter JSON</button>
        <label className="btn-primary" style={{ cursor: 'pointer' }}>
          📥 Importer JSON
          <input type="file" accept="application/json" onChange={handleImport} style={{ display: 'none' }} />
        </label>
      </div>
      {/* ... reste inchangé ... */}
    </main>
  );
}
