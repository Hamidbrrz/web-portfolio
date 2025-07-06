import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portfolio de Hamid",
  description: "Site personnel avec blog et projets",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header className="site-header">
          <nav>
            <a href="/" className="logo">PORTFOLIO</a>
            <ul className="nav-links">
              <li><a href="/about">À propos</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/projects">Projets</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/admin">Admin</a></li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          © 2025 Hamid. Tous droits réservés.
        </footer>
      </body>
    </html>
  );
}
