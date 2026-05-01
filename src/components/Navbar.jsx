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
    { label: "Imam Jumat", to: "/imam-jumat" },
    { label: "Struktural", to: "/struktural" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${scrolled ? "pt-3" : "pt-5"}`}
    >
      {/* Desktop */}
      <nav
        className="hidden md:flex items-center gap-6 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-2xl border border-white/10"
        style={{ backgroundColor: "rgba(26, 61, 43, 0.85)" }}
      >
        <Link to="/" className="flex items-center gap-2 mr-2">
          <span className="text-xl">🕌</span>
          <div>
            <p className="font-bold text-sm text-white leading-tight">
              Al-Muahhidin
            </p>
            <p className="text-xs" style={{ color: "var(--masjid-gold)" }}>
              Depok, Jawa Barat
            </p>
          </div>
        </Link>

        <div className="w-px h-5 bg-white/20"></div>

        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-sm font-semibold tracking-wide uppercase transition-colors whitespace-nowrap ${
              location.pathname === link.to
                ? "text-yellow-400"
                : "text-white/80 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}

        <div className="w-px h-5 bg-white/20"></div>

        <Link
          to="/donasi"
          className="flex items-center gap-2 font-bold text-sm px-5 py-2 rounded-full transition-all hover:scale-105"
          style={{
            backgroundColor: "var(--masjid-gold)",
            color: "var(--masjid-green)",
          }}
        >
          💝 Donasi
        </Link>
      </nav>

      {/* Mobile */}
      <nav
        className="md:hidden w-[calc(100%-2rem)] backdrop-blur-md text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
        style={{ backgroundColor: "rgba(26, 61, 43, 0.85)" }}
      >
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

        {menuOpen && (
          <div className="border-t border-white/10 px-5 pb-5 pt-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-semibold tracking-wide uppercase ${
                  location.pathname === link.to
                    ? "text-yellow-400"
                    : "text-white/80"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/donasi"
              className="text-center font-bold text-sm px-5 py-2 rounded-full mt-2"
              style={{
                backgroundColor: "var(--masjid-gold)",
                color: "var(--masjid-green)",
              }}
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
