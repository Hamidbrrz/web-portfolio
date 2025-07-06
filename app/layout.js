import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link"; // ✅ indispensable

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
            <Link href="/" className="logo">PORTFOLIO</Link>
            <ul className="nav-links">
              <li><Link href="/about">À propos</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/projects">Projets</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/admin">Admin</Link></li>
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
