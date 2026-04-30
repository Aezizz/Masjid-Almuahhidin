import { Link } from "react-router-dom";

const arabesque = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.5' opacity='0.08'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z'/%3E%3Cpath d='M40 10 L70 40 L40 70 L10 40 Z'/%3E%3Ccircle cx='40' cy='40' r='15'/%3E%3Ccircle cx='40' cy='40' r='25'/%3E%3Cpath d='M40 0 L40 80 M0 40 L80 40'/%3E%3Cpath d='M15 15 L65 65 M65 15 L15 65'/%3E%3C/g%3E%3C/svg%3E")`;

function Footer() {
  return (
    <footer
      className="text-white relative overflow-hidden border-t-4"
      style={{
        backgroundColor: "var(--masjid-green)",
        borderColor: "var(--masjid-green-mid)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundImage: arabesque, backgroundSize: "80px 80px" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">🕌</span>
            <div>
              <p className="font-bold text-lg leading-tight">
                Masjid Al-Muahhidin
              </p>
              <p className="text-xs" style={{ color: "var(--masjid-gold)" }}>
                Depok, Jawa Barat
              </p>
            </div>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            Memakmurkan masjid, mempererat ukhuwah islamiyah. Bersama kita
            bangun rumah Allah yang bermartabat.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h3
            className="font-bold text-xs uppercase tracking-widest mb-5"
            style={{ color: "var(--masjid-gold)" }}
          >
            Navigasi
          </h3>
          <ul className="flex flex-col gap-3">
            {[
              { label: "Beranda", to: "/" },
              { label: "Jadwal Sholat", to: "/jadwal" },
              { label: "Kegiatan", to: "/kegiatan" },
              { label: "Donasi & Infaq", to: "/donasi" },
            ].map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-white/60 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h3
            className="font-bold text-xs uppercase tracking-widest mb-5"
            style={{ color: "var(--masjid-gold)" }}
          >
            Kontak
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-white/60">
            <li className="flex items-start gap-2">
              <span>📍</span>
              <span>Jl. Nama Jalan, Pancoran Mas, Depok, Jawa Barat</span>
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span>
              <span>08xx-xxxx-xxxx</span>
            </li>
            <li className="flex items-center gap-2">
              <span>📧</span>
              <span>email@masjid.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Masjid Al-Muahhidin. All rights
            reserved.
          </p>
          <p className="text-white/40 text-xs">
            Dibuat dengan ❤️ untuk kemakmuran umat
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
