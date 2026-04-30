import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-green-900 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Kolom 1 - Identitas */}
        <div>
          <h3 className="text-lg font-bold mb-2">🕌 Masjid Al-Muahhidin</h3>
          <p className="text-sm text-green-300">
            Memakmurkan masjid, mempererat ukhuwah islamiyah.
          </p>
        </div>

        {/* Kolom 2 - Navigasi */}
        <div>
          <h3 className="text-lg font-bold mb-2">Navigasi</h3>
          <ul className="flex flex-col gap-2 text-sm text-green-300">
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Beranda
              </Link>
            </li>
            <li>
              <Link to="/jadwal" className="hover:text-white transition-colors">
                Jadwal Sholat
              </Link>
            </li>
            <li>
              <Link
                to="/kegiatan"
                className="hover:text-white transition-colors"
              >
                Kegiatan
              </Link>
            </li>
            <li>
              <Link to="/donasi" className="hover:text-white transition-colors">
                Donasi
              </Link>
            </li>
          </ul>
        </div>

        {/* Kolom 3 - Kontak */}
        <div>
          <h3 className="text-lg font-bold mb-2">Kontak</h3>
          <ul className="flex flex-col gap-2 text-sm text-green-300">
            <li>📍 Alamat masjid di sini</li>
            <li>📞 08xx-xxxx-xxxx</li>
            <li>📧 email@masjid.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-700 text-center text-xs text-green-400 py-4">
        © {new Date().getFullYear()} Masjid Al-Muahhidin. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
