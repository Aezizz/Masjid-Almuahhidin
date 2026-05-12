import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      className="text-white relative overflow-hidden border-t-4"
      style={{
        backgroundColor: "var(--masjid-green)",
        borderColor: "var(--masjid-gold)",
      }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.5' opacity='0.15'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z'/%3E%3Cpath d='M40 10 L70 40 L40 70 L10 40 Z'/%3E%3Ccircle cx='40' cy='40' r='15'/%3E%3Ccircle cx='40' cy='40' r='25'/%3E%3Cpath d='M40 0 L40 80 M0 40 L80 40'/%3E%3Cpath d='M15 15 L65 65 M65 15 L15 65'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Kolom Kiri — Brand + Kontak */}
        <div className="flex flex-col gap-8">
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

          {/* Kontak */}
          <div>
            <h3
              className="font-bold text-xs uppercase tracking-widest mb-4"
              style={{ color: "var(--masjid-gold)" }}
            >
              Kontak
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-white/60">
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

        {/* Kolom Kanan — Maps */}
        <div>
          <h3
            className="font-bold text-xs uppercase tracking-widest mb-4"
            style={{ color: "var(--masjid-gold)" }}
          >
            📍 Lokasi Masjid
          </h3>

          {/* Embed Maps dengan outline modern */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: "2px solid rgba(201,168,76,0.4)",
              boxShadow:
                "0 0 0 1px rgba(201,168,76,0.15), 0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.4!2d106.8131779!3d-6.3982067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e95eeac99663%3A0xa940899d61d7d7b3!2sMasjid%20Jami'%20Al-Muwahhidin!5e0!3m2!1sid!2sid!4v1"
              width="100%"
              height="220"
              style={{ border: 0, display: "block" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Masjid Al-Muahhidin"
            />
          </div>

          {/* Alamat */}
          <p className="text-white/50 text-xs mt-3 flex items-start gap-1.5">
            <span>📍</span>
            <span>Jl. Jeruk Raya, Pancoran Mas, Depok, Jawa Barat</span>
          </p>

          {/* Tombol buka di Maps */}
          <a
            href="https://maps.app.goo.gl/WtX74q6vJKQaDs6B7"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full transition-all hover:opacity-80"
            style={{
              border: "1px solid rgba(201,168,76,0.4)",
              color: "var(--masjid-gold)",
            }}
          >
            🗺️ Buka di Google Maps →
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
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
