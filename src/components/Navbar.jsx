import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tutup menu saat route berubah
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Beranda", to: "/" },
    { label: "Jadwal Sholat", to: "/jadwal" },
    { label: "Kegiatan", to: "/kegiatan" },
    { label: "Imam Jumat", to: "/imam-jumat" },
    { label: "Struktural", to: "/struktural" },
  ];

  const navBg = "rgba(26, 61, 43, 0.82)";

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${scrolled ? "pt-2" : "pt-4"}`}
    >
      {/* ── Desktop ── */}
      <nav
        className="hidden md:flex items-center gap-5 backdrop-blur-lg text-white px-5 py-2.5 rounded-full shadow-2xl border border-white/10 transition-all duration-300"
        style={{ backgroundColor: navBg }}
      >
        <Link to="/" className="flex items-center gap-2 mr-1">
          <span className="text-xl">🕌</span>
          <div>
            <p className="font-bold text-sm text-white leading-tight">
              Al-Muwahhidin
            </p>
            <p className="text-[10px]" style={{ color: "var(--masjid-gold)" }}>
              Depok, Jawa Barat
            </p>
          </div>
        </Link>

        <div className="w-px h-5 bg-white/20" />

        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-xs font-semibold tracking-wider uppercase transition-all duration-200 whitespace-nowrap hover:text-white ${
              location.pathname === link.to ? "text-amber-300" : "text-white/75"
            }`}
          >
            {link.label}
          </Link>
        ))}

        <div className="w-px h-5 bg-white/20" />

        <Link
          to="/donasi"
          className="h-9 flex items-center gap-1.5 font-bold text-xs px-5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
          style={{
            backgroundColor: "var(--masjid-gold)",
            color: "var(--masjid-green)",
          }}
        >
          Donasi
        </Link>
      </nav>

      {/* ── Mobile ── */}
      <nav
        className="md:hidden w-[calc(100%-2rem)] backdrop-blur-lg text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden transition-all duration-300"
        style={{ backgroundColor: navBg }}
      >
        <div className="flex items-center justify-between px-5 py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl">🕌</span>
            <span className="font-bold text-sm">Al-Muwahhidin</span>
          </Link>
          <button
            className="w-9 h-9 flex items-center justify-center text-white text-lg rounded-full transition-all duration-200 hover:bg-white/10 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 px-5 pb-5 pt-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-semibold tracking-wide uppercase py-1 transition-all duration-200 ${
                  location.pathname === link.to
                    ? "text-amber-300"
                    : "text-white/80"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/donasi"
              className="mt-2 h-11 flex items-center justify-center font-bold text-sm rounded-full transition-all duration-300"
              style={{
                backgroundColor: "var(--masjid-gold)",
                color: "var(--masjid-green)",
              }}
              onClick={() => setMenuOpen(false)}
            >
              Donasi Sekarang
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
