import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Beranda", to: "/" },
    { label: "Jadwal Sholat", to: "/jadwal" },
    { label: "Kegiatan", to: "/kegiatan" },
    { label: "Donasi", to: "/donasi" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${
        scrolled ? "pt-3" : "pt-5"
      }`}
    >
      {/* Navbar Pill — Desktop */}
      <nav className="hidden md:flex items-center gap-6 bg-green-900/40 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-2xl border border-green-700/50">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mr-2">
          <span className="text-xl">🕌</span>
          <span className="font-bold text-sm text-white whitespace-nowrap">
            Al-Muahhidin
          </span>
        </Link>

        {/* Divider */}
        <div className="w-px h-5 bg-green-600/50"></div>

        {/* Links */}
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-sm font-semibold tracking-wide uppercase transition-colors whitespace-nowrap ${
              location.pathname === link.to
                ? "text-yellow-400"
                : "text-green-100 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}

        {/* Divider */}
        <div className="w-px h-5 bg-green-600/50"></div>

        {/* CTA Button */}
        <Link
          to="/donasi"
          className="flex items-center gap-2 bg-white text-green-900 font-bold text-sm px-5 py-2 rounded-full hover:bg-green-50 transition-all hover:scale-105"
        >
          💝 Donasi
        </Link>
      </nav>

      {/* Navbar Mobile */}
      <nav className="md:hidden w-[calc(100%-2rem)] bg-green-900/40 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-green-700/50 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl">🕌</span>
            <span className="font-bold text-sm">Al-Muahhidin</span>
          </Link>
          <button
            className="text-white text-xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="border-t border-green-700/50 px-5 pb-5 pt-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-semibold tracking-wide uppercase ${
                  location.pathname === link.to
                    ? "text-yellow-400"
                    : "text-green-100"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/donasi"
              className="text-center bg-white text-green-900 font-bold text-sm px-5 py-2 rounded-full mt-2"
              onClick={() => setMenuOpen(false)}
            >
              💝 Donasi Sekarang
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
