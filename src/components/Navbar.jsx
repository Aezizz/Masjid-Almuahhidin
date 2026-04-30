import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Beranda", to: "/" },
    { label: "Jadwal Sholat", to: "/jadwal" },
    { label: "Kegiatan", to: "/kegiatan" },
    { label: "Donasi", to: "/donasi" },
  ];

  return (
    <nav className="bg-green-800 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Nama */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <span>🕌</span>
          <span>Masjid Al-Muahhidin</span>
        </Link>

        {/* Menu Desktop */}
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="hover:text-green-300 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="text-2xl">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <ul className="md:hidden bg-green-900 px-4 pb-4 flex flex-col gap-3 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="block hover:text-green-300 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
