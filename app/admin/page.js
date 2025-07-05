'use client';
import { useEffect, useState } from "react";

export default function AdminPage() {
  const PASSWORD = 'hamid2025'; // 🔐 tu peux changer ça
  const API_URL = 'https://api-portfolio-1-puyb.onrender.com/api/posts';

  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (localStorage.getItem('auth') === 'true') {
      setIsAuthed(true);
      fetchPosts();
    }
  }, []);

  const handleLogin = () => {
    if (password === PASSWORD) {
      localStorage.setItem('auth', 'true');
      setIsAuthed(true);
      fetchPosts();
    } else {
      alert('Mot de passe incorrect');
    }
  };

  const fetchPosts = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setPosts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      setMessage("✅ Article ajouté !");
      setTitle("");
      setContent("");
      fetchPosts();
    } else {
      setMessage("❌ Erreur lors de l'ajout.");
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setMessage("🗑 Article supprimé.");
      fetchPosts();
    } else {
      setMessage("❌ Erreur lors de la suppression.");
    }
  };

  if (!isAuthed) {
    return (
      <main className="p-8 max-w-sm mx-auto text-center">
        <h1 className="text-xl font-bold mb-4">Accès Admin</h1>
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        <button
          onClick={handleLogin}
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          Se connecter
        </button>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Ajouter un article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Contenu"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded min-h-[100px]"
          required
        ></textarea>
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Publier
        </button>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}

      <h2 className="text-xl font-bold mt-10 mb-4">Articles existants</h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded shadow">
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-600">{post.content.slice(0, 100)}...</p>
            <button
              onClick={() => handleDelete(post.id)}
              className="mt-2 text-red-600 underline text-sm"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
