import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const SEJARAH_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSqDUgS8Tuq3wMTHILWCz9uKHw8CVVH4bxQO_vMextZpZ7qF3axv04PxBKW2VSPk8naN8iWGs9qvlGF/pub?gid=0&single=true&output=csv";

function useJamRealtime() {
  const [jam, setJam] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setJam(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return jam;
}

function useParallax() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return offset;
}

function useFotoSejarah() {
  const [fotoUtama, setFotoUtama] = useState(null);
  const [galeri, setGaleri] = useState([]);
  useEffect(() => {
    fetch(SEJARAH_URL)
      .then((res) => res.text())
      .then((text) => {
        const rows = text.trim().split("\n").slice(1);
        const parsed = rows.map((row) => {
          const cols = row.includes("\t") ? row.split("\t") : row.split(",");
          return {
            tipe: cols[0]?.trim().toLowerCase(),
            keterangan: cols[1]?.trim(),
            foto: cols[2]?.trim(),
          };
        });
        setFotoUtama(parsed.find((i) => i.tipe === "utama") || null);
        setGaleri(parsed.filter((i) => i.tipe === "galeri"));
      })
      .catch(() => {});
  }, []);
  return { fotoUtama, galeri };
}

function ModalSejarah({ galeri, onClose }) {
  const [aktif, setAktif] = useState(0);
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setAktif((p) => (p + 1) % galeri.length);
      if (e.key === "ArrowLeft")
        setAktif((p) => (p - 1 + galeri.length) % galeri.length);
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "auto";
    };
  }, [galeri.length, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden"
        style={{ backgroundColor: "var(--masjid-green)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <p className="font-bold text-white">Dokumentasi Sejarah Masjid</p>
            <p className="text-xs" style={{ color: "var(--masjid-gold)" }}>
              {aktif + 1} / {galeri.length} foto
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Foto */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          <img
            src={galeri[aktif]?.foto}
            alt={galeri[aktif]?.keterangan}
            className="w-full h-full object-contain"
          />
          {galeri.length > 1 && (
            <>
              <button
                onClick={() =>
                  setAktif((p) => (p - 1 + galeri.length) % galeri.length)
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl hover:scale-110 transition-all"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              >
                ‹
              </button>
              <button
                onClick={() => setAktif((p) => (p + 1) % galeri.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl hover:scale-110 transition-all"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Keterangan */}
        <div className="px-6 py-3 border-t border-white/10">
          <p className="text-white/70 text-sm">{galeri[aktif]?.keterangan}</p>
        </div>

        {/* Thumbnail */}
        {galeri.length > 1 && (
          <div className="flex gap-2 px-6 pb-5 overflow-x-auto">
            {galeri.map((item, i) => (
              <button
                key={i}
                onClick={() => setAktif(i)}
                className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all"
                style={{
                  borderColor:
                    i === aktif ? "var(--masjid-gold)" : "transparent",
                }}
              >
                <img
                  src={item.foto}
                  alt={item.keterangan}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
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
  const scrollOffset = useParallax();
  const { fotoUtama, galeri } = useFotoSejarah();
  const [modalSejarahOpen, setModalSejarahOpen] = useState(false);

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
      {/* Modal Sejarah */}
      {modalSejarahOpen && (
        <ModalSejarah
          galeri={galeri}
          onClose={() => setModalSejarahOpen(false)}
        />
      )}

      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "var(--masjid-green)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: arabesque,
            backgroundSize: "80px 80px",
            transform: `translateY(${scrollOffset * 0.3}px)`,
            willChange: "transform",
          }}
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
          <div
            className="w-16 h-px mx-auto"
            style={{ backgroundColor: "rgba(201,168,76,0.4)" }}
          />
          <div
            className="mt-6 mb-10 border rounded-2xl px-8 py-4 inline-block"
            style={{
              borderColor: "rgba(201,168,76,0.3)",
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
          >
            <div className="flex items-end justify-center gap-1">
              <p
                className="font-mono font-bold tracking-widest text-5xl md:text-5xl"
                style={{
                  color: "var(--masjid-gold)",
                  textShadow:
                    "0 0 30px rgba(201,168,76,0.5), 0 0 60px rgba(201,168,76,0.2)",
                }}
              >
                {jamString.slice(0, 5)}
              </p>
              <p
                className="font-mono font-light tracking-widest text-xl md:text-2xl mb-1"
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

      {/* Profil & Sejarah */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: "var(--masjid-cream)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--masjid-gold)" }}
            >
              Tentang Kami
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "var(--masjid-green)" }}
            >
              Profil & Sejarah Masjid
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Kiri */}
            <div data-aos="fade-right">
              <div
                className="rounded-2xl overflow-hidden border aspect-video flex items-center justify-center relative"
                style={{
                  backgroundColor: "var(--masjid-cream-dark)",
                  borderColor: "#e5d9cc",
                }}
              >
                {fotoUtama ? (
                  <img
                    src={fotoUtama.foto}
                    alt={fotoUtama.keterangan}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <p className="text-6xl mb-3">🕌</p>
                    <p className="text-sm text-gray-400">
                      Foto Masjid Al-Muahhidin
                    </p>
                  </div>
                )}
                <div
                  className="absolute bottom-4 left-4 px-4 py-2 rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: "var(--masjid-green)" }}
                >
                  Berdiri sejak 19XX
                </div>
              </div>

              {/* Tombol Galeri */}
              <div
                onClick={() => setModalSejarahOpen(true)}
                className="w-full mt-3 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all hover:opacity-90"
                style={{
                  backgroundColor: "var(--masjid-green)",
                  color: "white",
                }}
              >
                📷 Lihat Dokumentasi Jadul ({galeri.length} foto)
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  { icon: "📜", label: "Akta Notaris", nilai: "No. XX/XXXX" },
                  { icon: "🏛️", label: "SK Kemenag", nilai: "No. XX/XXXX" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4 border text-center"
                    style={{ backgroundColor: "white", borderColor: "#e5d9cc" }}
                  >
                    <p className="text-2xl mb-1">{item.icon}</p>
                    <p className="text-xs text-gray-400">{item.label}</p>
                    <p
                      className="text-sm font-bold mt-0.5"
                      style={{ color: "var(--masjid-green)" }}
                    >
                      {item.nilai}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Kanan */}
            <div className="flex flex-col gap-6" data-aos="fade-left">
              <div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "var(--masjid-green)" }}
                >
                  Sejarah Berdirinya Masjid
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Masjid Al-Muahhidin berdiri atas inisiatif para tokoh
                  masyarakat dan warga sekitar yang memiliki keinginan kuat
                  untuk menyediakan tempat ibadah yang layak bagi umat Islam di
                  wilayah Pancoran Mas, Depok. Dengan semangat gotong royong dan
                  kebersamaan, masjid ini dibangun dari nol oleh tangan-tangan
                  ikhlas para jamaah.
                </p>
              </div>
              <div className="h-px" style={{ backgroundColor: "#e5d9cc" }} />
              <div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "var(--masjid-green)" }}
                >
                  Perkembangan & Pembangunan
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Seiring berjalannya waktu, Masjid Al-Muahhidin terus
                  berkembang. Berbagai renovasi dan perluasan dilakukan untuk
                  menampung jumlah jamaah yang terus bertambah. Hingga saat ini,
                  masjid terus berbenah diri untuk menjadi pusat ibadah dan
                  kegiatan islami yang lebih baik bagi seluruh warga.
                </p>
              </div>
              <div className="h-px" style={{ backgroundColor: "#e5d9cc" }} />
              <div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "var(--masjid-green)" }}
                >
                  Visi & Misi
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Mewujudkan masjid sebagai pusat ibadah, pendidikan, dan
                  pemberdayaan umat yang bermartabat. Dengan semangat ukhuwah
                  islamiyah, kami berkomitmen untuk terus memakmurkan masjid
                  demi kemaslahatan seluruh jamaah.
                </p>
              </div>
              <div
                className="rounded-2xl p-5 border"
                style={{
                  backgroundColor: "var(--masjid-cream-dark)",
                  borderColor: "#e5d9cc",
                }}
              >
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: "var(--masjid-green)" }}
                >
                  📍 Lokasi Masjid
                </p>
                <p className="text-xs text-gray-500">
                  Jl. Nama Jalan, Pancoran Mas, Depok, Jawa Barat
                </p>
              </div>
            </div>
          </div>
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
          className="absolute"
          style={{
            backgroundImage: arabesque,
            backgroundSize: "80px 80px",
            transform: `translateY(${scrollOffset * 0.15}px)`,
            willChange: "transform",
            inset: "-50% -45%",
          }}
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
