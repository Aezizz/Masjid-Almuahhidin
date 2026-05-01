import { useEffect, useState } from "react";

const KOTA_ID = "1219";

const arabesque = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.5' opacity='0.15'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z'/%3E%3Cpath d='M40 10 L70 40 L40 70 L10 40 Z'/%3E%3Ccircle cx='40' cy='40' r='15'/%3E%3Ccircle cx='40' cy='40' r='25'/%3E%3Cpath d='M40 0 L40 80 M0 40 L80 40'/%3E%3Cpath d='M15 15 L65 65 M65 15 L15 65'/%3E%3C/g%3E%3C/svg%3E")`;

const WAKTU_SHOLAT = [
  { key: "subuh", label: "Subuh", icon: "🌙", desc: "Fajar" },
  { key: "dzuhur", label: "Dzuhur", icon: "☀️", desc: "Tengah Hari" },
  { key: "ashar", label: "Ashar", icon: "🌤️", desc: "Sore" },
  { key: "maghrib", label: "Maghrib", icon: "🌅", desc: "Senja" },
  { key: "isya", label: "Isya", icon: "⭐", desc: "Malam" },
];

const AYAT_HARIAN = [
  {
    ayat: "Sesungguhnya sholat itu mencegah dari perbuatan keji dan mungkar.",
    sumber: "QS. Al-Ankabut: 45",
  },
  {
    ayat: "Dan mohonlah pertolongan dengan sabar dan sholat.",
    sumber: "QS. Al-Baqarah: 45",
  },
  {
    ayat: "Karena sesungguhnya sesudah kesulitan itu ada kemudahan.",
    sumber: "QS. Al-Insyirah: 5",
  },
  {
    ayat: "Allah tidak membebani seseorang melainkan sesuai kesanggupannya.",
    sumber: "QS. Al-Baqarah: 286",
  },
  {
    ayat: "Ingatlah, hanya dengan mengingat Allah hati menjadi tenteram.",
    sumber: "QS. Ar-Ra'd: 28",
  },
  {
    ayat: "Dan bertawakallah kepada Allah. Cukuplah Allah sebagai pemelihara.",
    sumber: "QS. Al-Ahzab: 3",
  },
  {
    ayat: "Sesungguhnya Allah beserta orang-orang yang sabar.",
    sumber: "QS. Al-Baqarah: 153",
  },
  {
    ayat: "Barangsiapa bertakwa kepada Allah, niscaya Dia akan membukakan jalan keluar baginya.",
    sumber: "QS. At-Thalaq: 2",
  },
  {
    ayat: "Dan janganlah kamu berputus asa dari rahmat Allah.",
    sumber: "QS. Az-Zumar: 53",
  },
  {
    ayat: "Sesungguhnya orang-orang yang beriman dan beramal sholeh, mereka itu adalah sebaik-baik makhluk.",
    sumber: "QS. Al-Bayyinah: 7",
  },
  {
    ayat: "Wahai orang-orang yang beriman! Jadikanlah sabar dan sholat sebagai penolongmu.",
    sumber: "QS. Al-Baqarah: 153",
  },
  {
    ayat: "Dan Tuhanmu berfirman, 'Berdoalah kepada-Ku, niscaya akan Aku perkenankan bagimu.'",
    sumber: "QS. Ghafir: 60",
  },
  {
    ayat: "Sesungguhnya bersama kesulitan ada kemudahan.",
    sumber: "QS. Al-Insyirah: 6",
  },
  {
    ayat: "Allah akan meninggikan orang-orang yang beriman di antaramu dan orang-orang yang diberi ilmu pengetahuan.",
    sumber: "QS. Al-Mujadilah: 11",
  },
  {
    ayat: "Dan sebutlah nama Tuhanmu pada waktu pagi dan petang.",
    sumber: "QS. Al-Insan: 25",
  },
  {
    ayat: "Maka nikmat Tuhanmu yang manakah yang kamu dustakan?",
    sumber: "QS. Ar-Rahman: 13",
  },
  {
    ayat: "Sungguh, manusia diciptakan bersifat suka mengeluh.",
    sumber: "QS. Al-Ma'arij: 19",
  },
  {
    ayat: "Dan Kami jadikan dari air segala sesuatu yang hidup.",
    sumber: "QS. Al-Anbiya: 30",
  },
  {
    ayat: "Katakanlah, 'Dialah Allah, Yang Maha Esa.'",
    sumber: "QS. Al-Ikhlas: 1",
  },
  {
    ayat: "Sesungguhnya sholatku, ibadahku, hidupku, dan matiku hanyalah untuk Allah.",
    sumber: "QS. Al-An'am: 162",
  },
  {
    ayat: "Dan apabila hamba-hamba-Ku bertanya kepadamu tentang Aku, maka Aku dekat.",
    sumber: "QS. Al-Baqarah: 186",
  },
  {
    ayat: "Janganlah kamu bersikap lemah, dan janganlah pula kamu bersedih hati.",
    sumber: "QS. Ali Imran: 139",
  },
  {
    ayat: "Sesungguhnya Allah tidak mengubah keadaan suatu kaum hingga mereka mengubah diri mereka sendiri.",
    sumber: "QS. Ar-Ra'd: 11",
  },
  {
    ayat: "Dan bersabarlah kamu, sesungguhnya Allah beserta orang-orang yang sabar.",
    sumber: "QS. Al-Anfal: 46",
  },
  {
    ayat: "Hai jiwa yang tenang, kembalilah kepada Tuhanmu dengan hati yang puas lagi diridhai-Nya.",
    sumber: "QS. Al-Fajr: 27-28",
  },
  {
    ayat: "Maka dirikanlah sholat, sesungguhnya sholat itu kewajiban yang ditentukan waktunya.",
    sumber: "QS. An-Nisa: 103",
  },
  {
    ayat: "Sesungguhnya orang-orang yang selalu membaca kitab Allah dan mendirikan sholat akan mendapat pahala.",
    sumber: "QS. Fatir: 29",
  },
  {
    ayat: "Dan bertasbihlah dengan memuji Tuhanmu sebelum terbit matahari dan sebelum terbenamnya.",
    sumber: "QS. Taha: 130",
  },
  {
    ayat: "Kepunyaan Allah-lah apa yang ada di langit dan apa yang ada di bumi.",
    sumber: "QS. Al-Baqarah: 284",
  },
  {
    ayat: "Allah, tidak ada tuhan selain Dia. Yang Maha Hidup, Yang terus menerus mengurus makhluk-Nya.",
    sumber: "QS. Al-Baqarah: 255",
  },
];

function getWaktuBerikutnya(jadwal) {
  if (!jadwal) return null;
  const now = new Date();
  const jamSekarang = now.getHours() * 60 + now.getMinutes();
  for (const waktu of WAKTU_SHOLAT) {
    const [jam, menit] = jadwal[waktu.key].split(":").map(Number);
    if (jam * 60 + menit > jamSekarang) return waktu.key;
  }
  return "subuh";
}

function getCountdown(jadwal, waktuKey) {
  if (!jadwal) return "";
  const now = new Date();
  const [jam, menit] = jadwal[waktuKey].split(":").map(Number);
  const target = new Date();
  target.setHours(jam, menit, 0, 0);
  if (target < now) target.setDate(target.getDate() + 1);
  const diff = target - now;
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return h > 0 ? `${h} jam ${m} menit lagi` : `${m} menit lagi`;
}

function hitungDhuha(subuh) {
  if (!subuh) return "-";
  const [jam, menit] = subuh.split(":").map(Number);
  const total = jam * 60 + menit + 20;
  const j = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const m = (total % 60).toString().padStart(2, "0");
  return `${j}:${m}`;
}

function hitungTahajud(isya, subuh) {
  if (!isya || !subuh) return "-";
  const [jamIsya, menitIsya] = isya.split(":").map(Number);
  const [jamSubuh, menitSubuh] = subuh.split(":").map(Number);
  const totalIsya = jamIsya * 60 + menitIsya;
  const totalSubuh = jamSubuh * 60 + menitSubuh + 24 * 60;
  const sepertiga = Math.floor(totalIsya + (totalSubuh - totalIsya) * (2 / 3));
  const j = (Math.floor(sepertiga / 60) % 24).toString().padStart(2, "0");
  const m = (sepertiga % 60).toString().padStart(2, "0");
  return `${j}:${m}`;
}

function useCountUp(target, duration = 800, delay = 0) {
  const [display, setDisplay] = useState("00:00");
  useEffect(() => {
    if (!target) return;
    const [jamTarget, menitTarget] = target.split(":").map(Number);
    const totalMenitTarget = jamTarget * 60 + menitTarget;
    const steps = 30;
    const stepTime = duration / steps;
    const timeout = setTimeout(() => {
      let step = 0;
      const interval = setInterval(() => {
        step++;
        const current = Math.floor((totalMenitTarget * step) / steps);
        const j = Math.floor(current / 60)
          .toString()
          .padStart(2, "0");
        const m = (current % 60).toString().padStart(2, "0");
        setDisplay(`${j}:${m}`);
        if (step >= steps) {
          clearInterval(interval);
          setDisplay(target);
        }
      }, stepTime);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);
  return display;
}

function WaktuCard({ waktu, jadwal, isBerikutnya, index }) {
  const displayWaktu = useCountUp(jadwal?.[waktu.key], 800, index * 150 + 300);
  return (
    <div
      className={`fade-in-up flex items-center justify-between px-6 py-5 rounded-2xl transition-all ${isBerikutnya ? "card-border-animated" : ""}`}
      style={{
        animationDelay: `${index * 150}ms`,
        ...(isBerikutnya
          ? { backgroundColor: "var(--masjid-green)", transform: "scale(1.02)" }
          : {
              backgroundColor: "white",
              border: "1px solid #e5d9cc",
              outline: "1.5px solid #1a1a1a",
            }),
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{
            backgroundColor: isBerikutnya
              ? "rgba(255,255,255,0.15)"
              : "var(--masjid-cream-dark)",
          }}
        >
          {waktu.icon}
        </div>
        <div>
          <p
            className="font-bold text-lg"
            style={{ color: isBerikutnya ? "white" : "var(--masjid-green)" }}
          >
            {waktu.label}
          </p>
          <p
            className="text-xs"
            style={{
              color: isBerikutnya ? "rgba(255,255,255,0.6)" : "#9ca3af",
            }}
          >
            {isBerikutnya ? "⚡ Waktu berikutnya" : waktu.desc}
          </p>
        </div>
      </div>
      <p
        className="text-2xl font-mono font-bold"
        style={{
          color: isBerikutnya ? "var(--masjid-gold)" : "var(--masjid-green)",
        }}
      >
        {displayWaktu}
      </p>
    </div>
  );
}

function Jadwal() {
  const [jadwal, setJadwal] = useState(null);
  const [tanggal, setTanggal] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const now = new Date();
    setTanggal(
      now.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );
    const y = now.getFullYear();
    const m = now.getMonth() + 1;
    const d = now.getDate();
    fetch(`https://api.myquran.com/v2/sholat/jadwal/${KOTA_ID}/${y}/${m}/${d}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) setJadwal(data.data.jadwal);
        else setError("Gagal mengambil jadwal sholat.");
        setLoading(false);
      })
      .catch(() => {
        setError("Terjadi kesalahan. Periksa koneksi internet.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!jadwal) return;
    const interval = setInterval(() => {
      const next = getWaktuBerikutnya(jadwal);
      setCountdown(getCountdown(jadwal, next));
    }, 1000);
    return () => clearInterval(interval);
  }, [jadwal]);

  const waktuBerikutnya = getWaktuBerikutnya(jadwal);
  const ayatHari = AYAT_HARIAN[new Date().getDate() % AYAT_HARIAN.length];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--masjid-cream)" }}
    >
      {/* Header */}
      <div
        className="relative overflow-hidden pt-28 pb-16 px-4 text-center text-white"
        style={{ backgroundColor: "var(--masjid-green)" }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundImage: arabesque, backgroundSize: "80px 80px" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30" />
        <div className="relative">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--masjid-gold)" }}
          >
            Masjid Al-Muahhidin — Depok
          </p>
          <h1 className="text-4xl font-bold mb-2">Jadwal Sholat</h1>
          <p className="text-white/70 text-sm">{tanggal}</p>
          {countdown && (
            <div
              className="mt-4 inline-block backdrop-blur px-5 py-2 rounded-full text-sm border border-white/20"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              ⏳ {countdown}
            </div>
          )}
        </div>
      </div>

      {/* Content - 2 Kolom */}
      <div className="max-w-5xl mx-auto px-4 -mt-6 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kolom Kiri — Jadwal Utama */}
          <div className="lg:col-span-2">
            {loading && (
              <div className="text-center text-gray-400 py-20">
                Memuat jadwal sholat...
              </div>
            )}
            {error && (
              <div className="text-center text-red-400 py-20">{error}</div>
            )}
            {jadwal && (
              <div className="flex flex-col gap-3">
                {WAKTU_SHOLAT.map((waktu, index) => (
                  <WaktuCard
                    key={waktu.key}
                    waktu={waktu}
                    jadwal={jadwal}
                    isBerikutnya={waktu.key === waktuBerikutnya}
                    index={index}
                  />
                ))}
              </div>
            )}

            {/* Info */}
            <div
              className="mt-6 rounded-2xl p-5 text-center border"
              style={{
                backgroundColor: "var(--masjid-cream-dark)",
                borderColor: "#e5d9cc",
              }}
            >
              <p
                className="text-sm font-medium"
                style={{ color: "var(--masjid-green)" }}
              >
                📍 Jadwal untuk wilayah Depok, Jawa Barat
              </p>
              <p className="text-xs mt-1 text-gray-400">
                Sumber: MyQuran API • Diperbarui setiap hari
              </p>
            </div>
          </div>

          {/* Kolom Kanan — Sidebar */}
          <div className="flex flex-col gap-5">
            {/* Sholat Sunnah */}

            <div
              className="px-5 py-4 border-b"
              style={{
                borderColor: "#e5d9cc",
                backgroundColor: "var(--masjid-cream-dark)",
              }}
            >
              <p
                className="font-bold text-sm"
                style={{ color: "var(--masjid-green)" }}
              >
                🌟 Sholat Sunnah
              </p>
            </div>
            <div className="p-5 flex flex-col gap-4">
              {/* Dhuha */}
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "var(--masjid-green)" }}
                  >
                    Dhuha
                  </p>
                  <p className="text-xs text-gray-400">
                    Setelah matahari terbit
                  </p>
                </div>
                <p
                  className="font-mono font-bold text-lg"
                  style={{ color: "var(--masjid-gold)" }}
                >
                  {jadwal ? hitungDhuha(jadwal.subuh) : "--:--"}
                </p>
              </div>

              <div className="h-px" style={{ backgroundColor: "#e5d9cc" }} />

              {/* Tahajud */}
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "var(--masjid-green)" }}
                  >
                    Tahajud
                  </p>
                  <p className="text-xs text-gray-400">
                    Sepertiga malam terakhir
                  </p>
                </div>
                <p
                  className="font-mono font-bold text-lg"
                  style={{ color: "var(--masjid-gold)" }}
                >
                  {jadwal ? hitungTahajud(jadwal.isya, jadwal.subuh) : "--:--"}
                </p>
              </div>
            </div>
          </div>

          {/* Ayat Harian */}
          <div
            className="rounded-2xl overflow-hidden relative"
            style={{ backgroundColor: "var(--masjid-green)" }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: arabesque,
                backgroundSize: "80px 80px",
              }}
            />
            <div className="relative p-5">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: "var(--masjid-gold)" }}
              >
                ✨ Ayat Hari Ini
              </p>
              <p className="text-white/90 text-sm leading-relaxed italic mb-4">
                "{ayatHari.ayat}"
              </p>
              <p
                className="text-xs font-semibold"
                style={{ color: "var(--masjid-gold)" }}
              >
                — {ayatHari.sumber}
              </p>
            </div>
          </div>

          {/* Tips Sholat */}
          <div
            className="rounded-2xl border p-5"
            style={{ backgroundColor: "white", borderColor: "#e5d9cc" }}
          >
            <p
              className="font-bold text-sm mb-3"
              style={{ color: "var(--masjid-green)" }}
            >
              💡 Tips Ibadah
            </p>
            <ul className="flex flex-col gap-2 text-xs text-gray-500">
              <li className="flex items-start gap-2">
                <span style={{ color: "var(--masjid-gold)" }}>•</span>
                <span>
                  Sholat di awal waktu adalah amalan yang paling dicintai Allah.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "var(--masjid-gold)" }}>•</span>
                <span>Jaga wudhu agar selalu siap sholat tepat waktu.</span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "var(--masjid-gold)" }}>•</span>
                <span>Sholat berjamaah pahalanya 27 derajat lebih tinggi.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jadwal;
