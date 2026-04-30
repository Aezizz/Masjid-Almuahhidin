import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-green-800 text-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-green-300 text-sm font-medium tracking-widest uppercase mb-3">
            Selamat Datang di
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Masjid Al-Muahhidin
          </h1>
          <p className="text-green-200 text-lg mb-8">
            Memakmurkan masjid, mempererat ukhuwah islamiyah. Bersama kita
            bangun rumah Allah yang bermartabat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/donasi"
              className="bg-white text-green-800 font-bold px-6 py-3 rounded-full hover:bg-green-100 transition-colors"
            >
              💝 Donasi Sekarang
            </Link>
            <Link
              to="/jadwal"
              className="border border-white text-white font-bold px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
            >
              🕐 Jadwal Sholat
            </Link>
          </div>
        </div>
      </section>

      {/* Info Singkat */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-green-50 rounded-2xl p-8">
          <div className="text-4xl mb-3">🕌</div>
          <h3 className="font-bold text-green-800 text-lg mb-2">
            Profil Masjid
          </h3>
          <p className="text-gray-600 text-sm">
            Masjid Al-Muahhidin berdiri sebagai pusat ibadah dan kegiatan umat
            islam di lingkungan kita.
          </p>
        </div>
        <div className="bg-green-50 rounded-2xl p-8">
          <div className="text-4xl mb-3">📅</div>
          <h3 className="font-bold text-green-800 text-lg mb-2">
            Kegiatan Rutin
          </h3>
          <p className="text-gray-600 text-sm">
            Kajian mingguan, pengajian anak, dan berbagai kegiatan islami yang
            aktif setiap pekannya.
          </p>
        </div>
        <div className="bg-green-50 rounded-2xl p-8">
          <div className="text-4xl mb-3">💰</div>
          <h3 className="font-bold text-green-800 text-lg mb-2">
            Laporan Keuangan
          </h3>
          <p className="text-gray-600 text-sm">
            Transparansi pengelolaan dana infaq dan sedekah jamaah secara
            terbuka dan amanah.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
