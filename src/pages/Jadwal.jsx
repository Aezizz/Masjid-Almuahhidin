import { useEffect, useState } from "react";

const KOTA_ID = "1219";

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-800 pt-28 pb-16 px-4 text-center text-white">
        <p className="text-green-300 text-xs font-semibold tracking-widest uppercase mb-3">
          Masjid Al-Muahhidin — Depok
        </p>
        <h1 className="text-4xl font-bold mb-2">Jadwal Sholat</h1>
        <p className="text-green-200 text-sm">{tanggal}</p>
        {countdown && (
          <div className="mt-4 inline-block bg-white/10 backdrop-blur px-5 py-2 rounded-full text-sm text-green-100">
            ⏳ {countdown}
          </div>
        )}
      </div>

      {/* Cards */}
      <div className="max-w-2xl mx-auto px-4 -mt-6 pb-16">
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
                  className={`flex items-center justify-between px-6 py-5 rounded-2xl transition-all ${
                    isBerikutnya
                      ? "bg-green-700 text-white shadow-lg shadow-green-200 scale-[1.02]"
                      : "bg-white text-gray-800 shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                        isBerikutnya ? "bg-white/20" : "bg-green-50"
                      }`}
                    >
                      {waktu.icon}
                    </div>
                    <div>
                      <p
                        className={`font-bold text-lg ${isBerikutnya ? "text-white" : "text-gray-800"}`}
                      >
                        {waktu.label}
                      </p>
                      <p
                        className={`text-xs ${isBerikutnya ? "text-green-200" : "text-gray-400"}`}
                      >
                        {isBerikutnya ? "⚡ Waktu berikutnya" : waktu.desc}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`text-2xl font-mono font-bold ${isBerikutnya ? "text-white" : "text-green-700"}`}
                  >
                    {jadwal[waktu.key]}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Info */}
        <div className="mt-8 bg-green-50 border border-green-100 rounded-2xl p-5 text-center">
          <p className="text-green-700 text-sm font-medium">
            📍 Jadwal untuk wilayah Depok, Jawa Barat
          </p>
          <p className="text-green-500 text-xs mt-1">
            Sumber: MyQuran API • Diperbarui setiap hari
          </p>
        </div>
      </div>
    </div>
  );
}

export default Jadwal;
