'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function BlogDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api-portfolio-1-puyb.onrender.com/api/blog`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.id === parseInt(id));
        if (found) setPost(found);
        else setError('Article introuvable');
      })
      .catch(() => setError("Erreur de chargement"));
  }, [id]);

  if (error) return <p className="p-8 text-red-600">{error}</p>;
  if (!post) return <p className="p-8">Chargement...</p>;

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
    </main>
  );
}
