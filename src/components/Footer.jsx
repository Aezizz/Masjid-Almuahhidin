import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Kolom 1 - Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">🕌</span>
            <div>
              <p className="font-bold text-lg leading-tight">
                Masjid Al-Muahhidin
              </p>
              <p className="text-green-400 text-xs">Depok, Jawa Barat</p>
            </div>
          </div>
          <p className="text-green-300 text-sm leading-relaxed">
            Memakmurkan masjid, mempererat ukhuwah islamiyah. Bersama kita
            bangun rumah Allah yang bermartabat.
          </p>
        </div>

        {/* Kolom 2 - Navigasi */}
        <div>
          <h3 className="font-bold text-sm uppercase tracking-widest text-green-400 mb-5">
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
                  className="text-green-300 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 3 - Kontak */}
        <div>
          <h3 className="font-bold text-sm uppercase tracking-widest text-green-400 mb-5">
            Kontak
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-green-300">
            <li className="flex items-start gap-2">
              <span>📍</span>
              <span>
                <a
                  href=" https://maps.app.goo.gl/R3F72VtSnVYaj2si7?g_st=iw"
                  target=" https://maps.app.goo.gl/R3F72VtSnVYaj2si7?g_st=iw"
                >
                  Jl. Jeruk Raya No.201, Depok Jaya, Kec. Pancoran Mas, Kota
                  Depok, Jawa Barat 16432
                </a>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span>
              <span>
                <a href="https://wa.me/6281210667215"></a>0812-1066-7215
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span>📧</span>
              <span>email@masjid.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-800">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-green-400 text-xs">
            © {new Date().getFullYear()} Masjid Al-Muahhidin. All rights
            reserved.
          </p>
          <p className="text-green-500 text-xs">
            Dibuat dengan ❤️ untuk kemakmuran umat
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
