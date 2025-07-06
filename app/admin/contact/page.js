"use client";
import { useState, useEffect } from "react";

export default function AdminContactPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setEmail(localStorage.getItem("contact_email") || "");
    setPhone(localStorage.getItem("contact_phone") || "");
    setLinkedin(localStorage.getItem("contact_linkedin") || "");
  }, []);

  const handleSave = () => {
    localStorage.setItem("contact_email", email);
    localStorage.setItem("contact_phone", phone);
    localStorage.setItem("contact_linkedin", linkedin);
    setMessage("✅ Informations sauvegardées !");
  };

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Modifier les informations de contact</h1>
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Téléphone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="url"
          placeholder="Lien LinkedIn"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          onClick={handleSave}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Sauvegarder
        </button>
        {message && <p className="text-green-600 mt-2">{message}</p>}
      </div>
    </main>
  );
}
