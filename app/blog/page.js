'use client';
import { useEffect, useState } from "react";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then(setPosts)
      .catch((err) => {
        console.error("Erreur API :", err);
        setError("Impossible de charger les articles.");
      });
  }, []);

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Articles du Blog</h1>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-6">
        {posts.length === 0 && !error && (
          <p className="text-gray-500">Aucun article pour l’instant.</p>
        )}
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded shadow">
            <a href={`/blog/${post.id}`}>
              <h2 className="text-xl font-semibold hover:underline">{post.title}</h2>
            </a>
            <p className="text-gray-600">
              {post.content.slice(0, 100)}...
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
