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

      {/* Cards */}
      <div className="max-w-2xl mx-auto px-4 -mt-6 pt-8 pb-16">
        {loading && (
          <div className="text-center text-gray-400 py-20">
            Memuat jadwal sholat...
          </div>
        )}
        {error && <div className="text-center text-red-400 py-20">{error}</div>}

        {jadwal && (
          <div className="flex flex-col gap-3">
            {WAKTU_SHOLAT.map((waktu) => {
              const isBerikutnya = waktu.key === waktuBerikutnya;
              return (
                <div
                  key={waktu.key}
                  className="flex items-center justify-between px-6 py-5 rounded-2xl transition-all"
                  style={
                    isBerikutnya
                      ? {
                          backgroundColor: "var(--masjid-green)",
                          transform: "scale(1.02)",
                          boxShadow: "0 8px 30px rgba(26,61,43,0.3)",
                        }
                      : {
                          backgroundColor: "white",
                          border: "1px solid #e5d9cc",
                        }
                  }
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
                        style={{
                          color: isBerikutnya ? "white" : "var(--masjid-green)",
                        }}
                      >
                        {waktu.label}
                      </p>
                      <p
                        className="text-xs"
                        style={{
                          color: isBerikutnya
                            ? "rgba(255,255,255,0.6)"
                            : "#9ca3af",
                        }}
                      >
                        {isBerikutnya ? "⚡ Waktu berikutnya" : waktu.desc}
                      </p>
                    </div>
                  </div>
                  <p
                    className="text-2xl font-mono font-bold"
                    style={{
                      color: isBerikutnya
                        ? "var(--masjid-gold)"
                        : "var(--masjid-green)",
                    }}
                  >
                    {jadwal[waktu.key]}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Info */}
        <div
          className="mt-8 rounded-2xl p-5 text-center border"
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
    </div>
  );
}

export default Jadwal;
