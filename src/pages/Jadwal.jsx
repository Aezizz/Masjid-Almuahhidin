import { useEffect, useState } from "react";

const KOTA_ID = "1219"; // Depok

const WAKTU_SHOLAT = [
  { key: "subuh", label: "Subuh", icon: "🌙" },
  { key: "dzuhur", label: "Dzuhur", icon: "☀️" },
  { key: "ashar", label: "Ashar", icon: "🌤️" },
  { key: "maghrib", label: "Maghrib", icon: "🌅" },
  { key: "isya", label: "Isya", icon: "🌙" },
];

function getWaktuBerikutnya(jadwal) {
  if (!jadwal) return null;
  const now = new Date();
  const jamSekarang = now.getHours() * 60 + now.getMinutes();

  for (const waktu of WAKTU_SHOLAT) {
    const [jam, menit] = jadwal[waktu.key].split(":").map(Number);
    if (jam * 60 + menit > jamSekarang) return waktu.key;
  }
  return "subuh"; // balik ke subuh kalau udah lewat isya
}

function Jadwal() {
  const [jadwal, setJadwal] = useState(null);
  const [tanggal, setTanggal] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth() + 1;
    const d = now.getDate();

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setTanggal(now.toLocaleDateString("id-ID", options));

    fetch(`https://api.myquran.com/v2/sholat/jadwal/${KOTA_ID}/${y}/${m}/${d}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setJadwal(data.data.jadwal);
        } else {
          setError("Gagal mengambil jadwal sholat.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Terjadi kesalahan. Periksa koneksi internet.");
        setLoading(false);
      });
  }, []);

  const waktuBerikutnya = getWaktuBerikutnya(jadwal);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          Jadwal Sholat
        </h1>
        <p className="text-gray-500">Masjid Al-Muahhidin — Depok</p>
        <p className="text-green-700 font-medium mt-1">{tanggal}</p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-gray-400 py-20">
          Memuat jadwal sholat...
        </div>
      )}

      {/* Error */}
      {error && <div className="text-center text-red-500 py-20">{error}</div>}

      {/* Jadwal */}
      {jadwal && (
        <div className="flex flex-col gap-4">
          {WAKTU_SHOLAT.map((waktu) => {
            const isBerikutnya = waktu.key === waktuBerikutnya;
            return (
              <div
                key={waktu.key}
                className={`flex items-center justify-between px-6 py-4 rounded-2xl shadow-sm transition-all ${
                  isBerikutnya
                    ? "bg-green-700 text-white scale-105"
                    : "bg-white text-gray-800 border border-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{waktu.icon}</span>
                  <div>
                    <p
                      className={`font-bold text-lg ${isBerikutnya ? "text-white" : "text-green-800"}`}
                    >
                      {waktu.label}
                    </p>
                    {isBerikutnya && (
                      <p className="text-green-200 text-xs">Waktu berikutnya</p>
                    )}
                  </div>
                </div>
                <p
                  className={`text-xl font-mono font-bold ${isBerikutnya ? "text-white" : "text-green-700"}`}
                >
                  {jadwal[waktu.key]}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Jadwal;
