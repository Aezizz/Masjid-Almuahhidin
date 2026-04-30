import { Link } from "react-router-dom";

const stats = [
  { angka: "500+", label: "Jamaah Aktif" },
  { angka: "10+", label: "Kegiatan Rutin" },
  { angka: "15+", label: "Tahun Berdiri" },
  { angka: "100%", label: "Transparan" },
];

const layanan = [
  {
    icon: "🕐",
    judul: "Jadwal Sholat",
    deskripsi:
      "Jadwal sholat harian otomatis berdasarkan lokasi masjid di Depok.",
    to: "/jadwal",
  },
  {
    icon: "📅",
    judul: "Kegiatan Rutin",
    deskripsi:
      "Kajian subuh, pengajian anak, majelis taklim, dan sholat Jumat berjamaah.",
    to: "/kegiatan",
  },
  {
    icon: "💰",
    judul: "Donasi & Infaq",
    deskripsi:
      "Salurkan donasi Anda secara mudah dan transparan untuk kemakmuran masjid.",
    to: "/donasi",
  },
  {
    icon: "📊",
    judul: "Laporan Keuangan",
    deskripsi:
      "Laporan saldo dan riwayat pemasukan yang terbuka untuk seluruh jamaah.",
    to: "/donasi",
  },
];

function Home() {
  return (
    <div className="pt-0">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-green-700 overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative text-center text-white px-4 max-w-4xl mx-auto">
          <p className="text-green-300 text-sm font-semibold tracking-[0.3em] uppercase mb-6">
            Selamat Datang di
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Masjid
            <br />
            <span className="text-green-300">Al-Muahhidin</span>
          </h1>
          <p className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Memakmurkan masjid, mempererat ukhuwah islamiyah. Bersama kita
            bangun rumah Allah yang bermartabat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/donasi"
              className="bg-white text-green-800 font-bold px-8 py-4 rounded-full hover:bg-green-50 transition-all hover:scale-105 shadow-lg"
            >
              💝 Donasi Sekarang
            </Link>
            <Link
              to="/jadwal"
              className="border-2 border-white/50 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-all"
            >
              🕐 Jadwal Sholat
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs flex flex-col items-center gap-2">
          <span>Scroll</span>
          <div className="w-px h-8 bg-white/30"></div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-bold text-green-700 mb-1">
                {stat.angka}
              </p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Layanan Section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-600 text-sm font-semibold tracking-widest uppercase mb-3">
              Layanan Kami
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Semua yang Jamaah Butuhkan
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Masjid Al-Muahhidin hadir dengan berbagai layanan untuk mendukung
              ibadah dan kegiatan jamaah sehari-hari.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {layanan.map((item, i) => (
              <Link
                key={i}
                to={item.to}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all group"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-green-700 transition-colors">
                  {item.judul}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.deskripsi}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Donasi */}
      <section className="bg-green-800 py-20 px-4 text-center text-white">
        <div className="max-w-2xl mx-auto">
          <p className="text-green-300 text-sm font-semibold tracking-widest uppercase mb-4">
            Pembangunan Masjid
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mari Bersama Memakmurkan Masjid
          </h2>
          <p className="text-green-200 mb-8">
            Setiap donasi Anda akan digunakan secara transparan untuk
            pembangunan dan operasional Masjid Al-Muahhidin.
          </p>
          <Link
            to="/donasi"
            className="inline-block bg-white text-green-800 font-bold px-8 py-4 rounded-full hover:bg-green-50 transition-all hover:scale-105 shadow-lg"
          >
            Lihat Laporan & Donasi →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
