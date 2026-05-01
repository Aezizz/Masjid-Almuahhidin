import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function useJamRealtime() {
  const [jam, setJam] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setJam(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return jam;
}

const arabesque = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.5' opacity='0.15'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z'/%3E%3Cpath d='M40 10 L70 40 L40 70 L10 40 Z'/%3E%3Ccircle cx='40' cy='40' r='15'/%3E%3Ccircle cx='40' cy='40' r='25'/%3E%3Cpath d='M40 0 L40 80 M0 40 L80 40'/%3E%3Cpath d='M15 15 L65 65 M65 15 L15 65'/%3E%3C/g%3E%3C/svg%3E")`;

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
  const jam = useJamRealtime();

  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: "ease-out-cubic" });
  }, []);

  const jamString = jam.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const hariString = jam.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "var(--masjid-green)" }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundImage: arabesque, backgroundSize: "80px 80px" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

        <div className="relative text-center text-white px-4 max-w-4xl mx-auto">
          <p
            className="text-sm font-semibold tracking-[0.3em] uppercase mb-6"
            style={{ color: "var(--masjid-gold)" }}
          >
            Selamat Datang di
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Masjid
            <br />
            <span style={{ color: "var(--masjid-gold)" }}>Al-Muahhidin</span>
          </h1>

          {/* Jam Realtime */}
          <div className="mb-8">
            <div className="flex items-end justify-center gap-1">
              <p
                className="font-mono font-bold tracking-widest text-5xl md:text-6xl"
                style={{
                  color: "var(--masjid-gold)",
                  textShadow:
                    "0 0 30px rgba(201,168,76,0.5), 0 0 60px rgba(201,168,76,0.2)",
                }}
              >
                {jamString.slice(0, 5)}
              </p>
              <p
                className="font-mono font-light tracking-widest text-2xl md:text-3xl mb-1"
                style={{
                  color: "rgba(201,168,76,0.6)",
                  textShadow: "0 0 20px rgba(201,168,76,0.3)",
                }}
              >
                :{jamString.slice(6, 8)}
              </p>
            </div>
            <p className="text-white/40 text-xs mt-2 tracking-widest uppercase">
              {hariString}
            </p>
          </div>

          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Memakmurkan masjid, mempererat ukhuwah islamiyah. Bersama kita
            bangun rumah Allah yang bermartabat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/donasi"
              className="font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
              style={{
                backgroundColor: "var(--masjid-gold)",
                color: "var(--masjid-green)",
              }}
            >
              💝 Donasi Sekarang
            </Link>
            <Link
              to="/jadwal"
              className="border-2 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-all"
              style={{ borderColor: "var(--masjid-gold)" }}
            >
              🕐 Jadwal Sholat
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs flex flex-col items-center gap-2">
          <span>Scroll</span>
          <div className="w-px h-8 bg-white/20"></div>
        </div>
      </section>

      {/* Stats */}
      <section
        style={{ backgroundColor: "var(--masjid-cream)" }}
        className="border-b border-stone-200"
      >
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="group relative rounded-2xl p-6 text-center cursor-default overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border"
              style={{
                backgroundColor: "white",
                borderColor: "#e5d9cc",
                color: "var(--masjid-green)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--masjid-green)")
              }
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: "var(--masjid-green)" }}
              />
              <div
                className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                style={{ backgroundColor: "var(--masjid-gold)" }}
              />
              <div className="relative z-10">
                <p
                  className="text-4xl font-bold mb-1 transition-colors duration-300"
                  style={{ color: "inherit" }}
                >
                  {stat.angka}
                </p>
                <p className="text-sm transition-colors duration-300 opacity-70">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Layanan */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: "var(--masjid-cream-dark)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--masjid-gold)" }}
            >
              Layanan Kami
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "var(--masjid-green)" }}
            >
              Semua yang Jamaah Butuhkan
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-gray-500">
              Masjid Al-Muahhidin hadir dengan berbagai layanan untuk mendukung
              ibadah dan kegiatan jamaah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {layanan.map((item, i) => (
              <Link
                key={i}
                to={item.to}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="rounded-2xl p-6 hover:-translate-y-1 transition-all group"
                style={{
                  backgroundColor: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  boxShadow: "0 4px 24px rgba(26,61,43,0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.8)";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 2px var(--masjid-green), 0 8px 32px rgba(26,61,43,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.6)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 24px rgba(26,61,43,0.08)";
                }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3
                  className="font-bold mb-2"
                  style={{ color: "var(--masjid-green)" }}
                >
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

      {/* CTA */}
      <section
        className="py-20 px-4 text-center text-white relative overflow-hidden"
        style={{ backgroundColor: "var(--masjid-green)" }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundImage: arabesque, backgroundSize: "80px 80px" }}
        />
        <div className="relative max-w-2xl mx-auto" data-aos="fade-up">
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: "var(--masjid-gold)" }}
          >
            Pembangunan Masjid
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mari Bersama Memakmurkan Masjid
          </h2>
          <p className="text-white/70 mb-8">
            Setiap donasi Anda akan digunakan secara transparan untuk
            pembangunan dan operasional Masjid Al-Muahhidin.
          </p>
          <Link
            to="/donasi"
            className="inline-block font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
            style={{
              backgroundColor: "var(--masjid-gold)",
              color: "var(--masjid-green)",
            }}
          >
            Lihat Laporan & Donasi →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
