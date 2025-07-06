"use client"
export default function HomePage() {
  return (
    <main className="hero">
      <h1>Salut, je suis Hamid 👋</h1>
      <p>
        Développeur Web et Mobile passionné par la création d’expériences
        modernes et dynamiques.
      </p>
      <div className="hero-buttons">
        <a href="/projects" className="primary">
          Voir mes projets
        </a>
        <a href="/contact" className="secondary">
          Me contacter
        </a>
      </div>
    </main>
  );
}
