import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ModalGaleri } from "../components/ModalGaleri";

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
// ── Typewriter Hook ──
function useTypewriter(text, speed = 60, delay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    setDone(false);
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayed, done };
}

// ── Count Up Jam Hook ──
function useJamCountUp(targetJam, duration = 1200) {
  const [display, setDisplay] = useState("00.00");
  const [displaySec, setDisplaySec] = useState("00");

  useEffect(() => {
    if (!targetJam) return;
    const [h, m, s] = targetJam.split(":").map(Number);
    const totalSec = h * 3600 + m * 60 + (s || 0);
    const steps = 40;
    const stepTime = duration / steps;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const cur = Math.floor((totalSec * step) / steps);
      const ch = Math.floor(cur / 3600)
        .toString()
        .padStart(2, "0");
      const cm = Math.floor((cur % 3600) / 60)
        .toString()
        .padStart(2, "0");
      const cs = (cur % 60).toString().padStart(2, "0");
      setDisplay(`${ch}.${cm}`);
      setDisplaySec(cs);
      if (step >= steps) {
        clearInterval(interval);
        setDisplay(
          `${h.toString().padStart(2, "0")}.${m.toString().padStart(2, "0")}`,
        );
        setDisplaySec((s || 0).toString().padStart(2, "0"));
      }
    }, stepTime);
    return () => clearInterval(interval);
  }, [targetJam, duration]);

  return { display, displaySec };
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

// ── Snackbar state (global sederhana) ──
let snackbarTimer = null;

function Snackbar() {
  const [state, setState] = useState({ show: false, text: "" });

  useEffect(() => {
    window.__showSnackbar = (text) => {
      clearTimeout(snackbarTimer);
      setState({ show: true, text });
      snackbarTimer = setTimeout(
        () => setState({ show: false, text: "" }),
        2200,
      );
    };

    return () => {
      delete window.__showSnackbar;
    };
  }, []);

  return (
    <div
      className="fixed bottom-7 left-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-full text-white text-sm font-semibold transition-all duration-300"
      style={{
        transform: state.show
          ? "translateX(-50%) translateY(0)"
          : "translateX(-50%) translateY(20px)",
        opacity: state.show ? 1 : 0,
        pointerEvents: "none",
        backgroundColor: "var(--masjid-green)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        border: "1px solid rgba(201,168,76,0.3)",
      }}
    >
      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      <span>{state.text}</span>
    </div>
  );
}

function LayananCard({ item, index }) {
  const navigate = useNavigate();
  const [ripples, setRipples] = useState([]);

  const floatClass = ["float-a", "float-b", "float-c", "float-b"][index % 4];

  function handleClick(e) {
    // Ripple
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(
      () => setRipples((prev) => prev.filter((r) => r.id !== id)),
      600,
    );

    // Snackbar
    window.__showSnackbar?.(`✨ Membuka ${item.judul}`);

    // Navigate
    setTimeout(() => navigate(item.to), 300);
  }

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 100}
      onClick={handleClick}
      className={`relative rounded-3xl p-6 cursor-pointer overflow-hidden transition-all duration-350 group ${floatClass}`}
      style={{
        backgroundColor: "white",
        boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
        border: "1px solid rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 25px 35px -12px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "0 5px 20px rgba(0,0,0,0.05)";
      }}
    >
      {/* Gradient border on hover */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          padding: "2px",
          background:
            "linear-gradient(135deg, var(--masjid-green), var(--masjid-gold), var(--masjid-green))",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: r.x,
            top: r.y,
            width: 20,
            height: 20,
            marginLeft: -10,
            marginTop: -10,
            background:
              "radial-gradient(circle, rgba(26,61,43,0.3) 0%, rgba(26,61,43,0.1) 80%)",
            animation: "rippleAnim 0.55s linear forwards",
          }}
        />
      ))}

      {/* Konten */}
      <div className="relative z-10">
        <div className="text-4xl mb-4 transition-transform duration-200 group-hover:scale-110 inline-block">
          {item.icon}
        </div>
        <h3
          className="font-bold mb-2 text-sm"
          style={{ color: "var(--masjid-green)" }}
        >
          {item.judul}
        </h3>
        <p className="text-slate-500 text-xs leading-relaxed">
          {item.deskripsi}
        </p>
      </div>
    </div>
  );
}

function Home() {
  const jam = useJamRealtime();
  const scrollOffset = useParallax();
  const { fotoUtama, galeri } = useFotoSejarah();
  const [modalSejarahOpen, setModalSejarahOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 80,
    });
  }, []);

  const jamTargetRef = useRef(null);
  if (!jamTargetRef.current) {
    const now = new Date();
    jamTargetRef.current = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
  }
  const { display: jamDisplay, displaySec } = useJamCountUp(
    jamTargetRef.current,
    1200,
  );

  const { displayed: twSambutan, done: twSambutanDone } = useTypewriter(
    "Selamat Datang di",
    70,
    300,
  );

  const { displayed: twDeskripsi } = useTypewriter(
    "Memakmurkan masjid, mempererat ukhuwah islamiyah. Bersama kita bangun rumah Allah yang bermartabat.",
    30,
    1800,
  );

  const hariString = jam.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full overflow-x-hidden">
      {modalSejarahOpen && galeri.length > 0 && (
        <ModalGaleri
          judul="Dokumentasi Sejarah Masjid"
          deskripsi="Foto-foto dokumentasi bersejarah"
          icon="🕌"
          fotos={galeri}
          onClose={() => setModalSejarahOpen(false)}
        />
      )}

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center justify-center"
        style={{
          background: `linear-gradient(to bottom, var(--masjid-green) 0%, var(--masjid-green) 40%, rgba(22,58,36,0.85) 70%, var(--masjid-green) 100%)`,
        }}
      >
        {/* Silhouette Masjid */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/images/masjid-silhouette.png"
            className="w-full h-full object-cover object-bottom"
            style={{ opacity: 0.3 }}
          />
          {/* Overlay hijau transparan di atas gambar */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(22,58,36,0.7) 0%, rgba(22,58,36,0.3) 50%, rgba(22,58,36,0.6) 100%)",
            }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />

        <div className="relative text-center text-white px-6 max-w-4xl mx-auto w-full">
          {/* Typewriter — Selamat Datang di */}
          <p
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 h-4"
            style={{ color: "var(--masjid-gold)" }}
          >
            {twSambutan}
            {!twSambutanDone && (
              <span
                className="cursor-blink border-r-2 ml-0.5 inline-block h-3 align-middle"
                style={{ borderColor: "var(--masjid-gold)" }}
              />
            )}
          </p>

          {/* Shine effect — Masjid Al-Muwahhidin */}
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-bold mb-5"
            style={{ lineHeight: "1.10", isolation: "isolate" }}
          >
            <span className="text-white block">Masjid</span>
            <span className="shine-effect block">Al-Muwahhidin</span>
          </h1>

          {/* Count Up Jam */}
          <div
            className="mb-8 border rounded-2xl px-6 sm:px-10 py-4 inline-block"
            style={{
              borderColor: "rgba(201,137,106,0.5)",
              backgroundColor: "rgba(0,0,0,0.25)",
              backdropFilter: "blur(8px)",
              boxShadow:
                "0 0 30px rgba(201,137,106,0.15), inset 0 0 30px rgba(201,137,106,0.05)",
            }}
          >
            <div className="flex items-end justify-center gap-1">
              <p
                className="font-mono font-bold tracking-widest text-4xl sm:text-5xl"
                style={{
                  color: "var(--masjid-gold)",
                  textShadow:
                    "0 0 20px rgba(201,137,106,0.9), 0 0 50px rgba(201,137,106,0.6), 0 0 100px rgba(201,137,106,0.3)",
                }}
              >
                {jamDisplay}
              </p>
              <p
                className="font-mono font-light tracking-widest text-xl sm:text-2xl mb-1"
                style={{
                  color: "rgba(201,137,106,0.6)",
                  textShadow: "0 0 20px rgba(201,137,106,0.3)",
                }}
              >
                :{displaySec}
              </p>
            </div>
            <p className="text-white/40 text-xs mt-2 tracking-widest uppercase">
              {hariString}
            </p>
          </div>

          {/* Typewriter — Deskripsi */}
          <p className="text-white/75 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed px-2 min-h-[4rem]">
            {twDeskripsi}
            <span
              className="cursor-blink border-r-2 ml-0.5 inline-block h-4 align-middle"
              style={{ borderColor: "rgba(255,255,255,0.5)" }}
            />
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center px-4 sm:px-0">
            <Link
              to="/donasi"
              className="h-12 flex items-center justify-center font-bold px-8 rounded-full transition-all duration-300 ease-in-out hover:scale-105"
              style={{
                backgroundColor: "var(--masjid-gold)",
                color: "var(--masjid-green)",
                boxShadow:
                  "0 0 20px rgba(201,137,106,0.5), 0 0 40px rgba(201,137,106,0.2)",
              }}
            >
              Donasi Sekarang
            </Link>
            <Link
              to="/jadwal"
              className="h-12 flex items-center justify-center border-2 text-white font-bold px-8 rounded-full transition-all duration-300 ease-in-out hover:bg-white/10"
              style={{ borderColor: "var(--masjid-gold)" }}
            >
              🕐 Jadwal Sholat
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="relative block w-full h-25 md:h-35"
            style={{ fill: "var(--masjid-cream)" }}
          >
            <path d="M0,80 L1440,80 L1440,80 C1080,20 360,20 0,80 Z"></path>
          </svg>
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        style={{ backgroundColor: "var(--masjid-cream)" }}
        className="border-b border-stone-200"
      >
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="group relative rounded-2xl p-5 text-center cursor-default overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl border"
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
                  className="text-3xl sm:text-4xl font-bold mb-1 transition-colors duration-300"
                  style={{ color: "inherit" }}
                >
                  {stat.angka}
                </p>
                <p className="text-xs sm:text-sm transition-colors duration-300 opacity-70">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROFIL & SEJARAH ── */}
      <section
        className="py-20 px-6"
        style={{ backgroundColor: "var(--masjid-cream)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Kiri — Foto */}
            <div data-aos="fade-right">
              <div
                className="rounded-2xl overflow-hidden border aspect-video flex items-center justify-center relative shadow-lg"
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
                      Foto Masjid Al-Muwahhidin
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

              <button
                onClick={() => setModalSejarahOpen(true)}
                className="w-full mt-3 h-12 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:opacity-85 hover:shadow-md"
                style={{
                  backgroundColor: "var(--masjid-green)",
                  color: "white",
                }}
              >
                📷 Lihat Dokumentasi Jadul ({galeri.length} foto)
              </button>

              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  { icon: "📜", label: "Akta Notaris", nilai: "No. XX/XXXX" },
                  { icon: "🏛️", label: "SK Kemenag", nilai: "No. XX/XXXX" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4 border text-center transition-all duration-300 hover:shadow-md"
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

            {/* Kanan — Narasi */}
            <div className="flex flex-col gap-6" data-aos="fade-left">
              {[
                {
                  judul: "Sejarah Berdirinya Masjid",
                  isi: "Masjid Al-Muwahhidin berdiri atas inisiatif para tokoh masyarakat dan warga sekitar yang memiliki keinginan kuat untuk menyediakan tempat ibadah yang layak bagi umat Islam di wilayah Pancoran Mas, Depok. Dengan semangat gotong royong dan kebersamaan, masjid ini dibangun dari nol oleh tangan-tangan ikhlas para jamaah.",
                },
                {
                  judul: "Perkembangan & Pembangunan",
                  isi: "Seiring berjalannya waktu, Masjid Al-Muwahhidin terus berkembang. Berbagai renovasi dan perluasan dilakukan untuk menampung jumlah jamaah yang terus bertambah. Hingga saat ini, masjid terus berbenah diri untuk menjadi pusat ibadah dan kegiatan islami yang lebih baik bagi seluruh warga.",
                },
                {
                  judul: "Visi & Misi",
                  isi: "Mewujudkan masjid sebagai pusat ibadah, pendidikan, dan pemberdayaan umat yang bermartabat. Dengan semangat ukhuwah islamiyah, kami berkomitmen untuk terus memakmurkan masjid demi kemaslahatan seluruh jamaah.",
                },
              ].map((item, i) => (
                <div key={i}>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: "var(--masjid-green)" }}
                  >
                    {item.judul}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {item.isi}
                  </p>
                  {i < 2 && (
                    <div
                      className="h-px mt-5"
                      style={{ backgroundColor: "#e5d9cc" }}
                    />
                  )}
                </div>
              ))}

              <div
                className="rounded-2xl p-5 border transition-all duration-300 hover:shadow-md"
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
                <p className="text-xs text-slate-500">
                  Jl. Jeruk Raya, Pancoran Mas, Depok, Jawa Barat
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LAYANAN ── */}

      <section
        className="py-20 px-6"
        style={{ backgroundColor: "var(--masjid-cream-dark)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
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
            <p className="mt-3 max-w-xl mx-auto text-slate-500 text-sm">
              Masjid Al-Muwahhidin hadir dengan berbagai layanan untuk mendukung
              ibadah dan kegiatan jamaah.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {layanan.map((item, i) => (
              <LayananCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Snackbar */}
        <Snackbar />
      </section>

      {/* ── CTA ── */}
      <section
        className="py-20 px-6 text-center text-white relative overflow-hidden"
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
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: "var(--masjid-gold)" }}
          >
            Pembangunan Masjid
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Mari Bersama Memakmurkan Masjid
          </h2>
          <p className="text-white/70 text-sm mb-8 leading-relaxed">
            Setiap donasi Anda akan digunakan secara transparan untuk
            pembangunan dan operasional Masjid Al-Muwahhidin.
          </p>
          <Link
            to="/donasi"
            className="inline-flex items-center h-12 font-bold px-8 rounded-full transition-all duration-300 ease-in-out hover:scale-105 shadow-lg"
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
