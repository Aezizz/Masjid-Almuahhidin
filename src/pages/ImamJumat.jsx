import { useState, useEffect } from "react";

const SHEETS_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRPzziWYcG7rNySVh2Xg32kgMonogpC5QZNJOuFJhZTHG1cqjzrsUzoqWjTXudwsxEYb9Mf3Ri2iNj0/pub?gid=0&single=true&output=csv";

const arabesque = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.5' opacity='0.15'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z'/%3E%3Cpath d='M40 10 L70 40 L40 70 L10 40 Z'/%3E%3Ccircle cx='40' cy='40' r='15'/%3E%3Ccircle cx='40' cy='40' r='25'/%3E%3Cpath d='M40 0 L40 80 M0 40 L80 40'/%3E%3Cpath d='M15 15 L65 65 M65 15 L15 65'/%3E%3C/g%3E%3C/svg%3E")`;

function parseCSV(text) {
  const rows = text.trim().split("\n").slice(1);
  return rows.map((row) => {
    const [tanggal, nama, jabatan, materi, foto] = row.split(",");
    return {
      tanggal: tanggal?.trim(),
      nama: nama?.trim(),
      jabatan: jabatan?.trim(),
      materi: materi?.trim(),
      foto: foto?.trim() || null,
    };
  });
}

function getMingguIni(data) {
  const now = new Date();
  // Cari Jumat minggu ini atau terdekat
  return (
    data.find((item) => {
      const [day, month, year] = item.tanggal.split(" ");
      const bulanMap = {
        Januari: 0,
        Februari: 1,
        Maret: 2,
        April: 3,
        Mei: 4,
        Juni: 5,
        Juli: 6,
        Agustus: 7,
        September: 8,
        Oktober: 9,
        November: 10,
        Desember: 11,
      };
      const tgl = new Date(year, bulanMap[month], parseInt(day));
      return tgl >= new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }) || data[0]
  );
}

function AvatarDefault({ nama }) {
  const inisial =
    nama
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("") || "?";
  return (
    <div
      className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto"
      style={{ backgroundColor: "var(--masjid-green-light)" }}
    >
      {inisial}
    </div>
  );
}

function ImamJumat() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(SHEETS_URL)
      .then((res) => res.text())
      .then((text) => {
        setData(parseCSV(text));
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal memuat data jadwal imam.");
        setLoading(false);
      });
  }, []);

  const mingguIni = getMingguIni(data);

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
            Masjid Al-Muahhidin
          </p>
          <h1 className="text-4xl font-bold mb-2">Jadwal Imam & Penceramah</h1>
          <p className="text-white/70 text-sm">
            Jadwal Sholat Jumat Masjid Al-Muahhidin
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-6 pt-8 pb-16">
        {loading && (
          <div className="text-center text-gray-400 py-20">
            Memuat jadwal...
          </div>
        )}

        {error && <div className="text-center text-red-400 py-20">{error}</div>}

        {!loading && !error && (
          <>
            {/* Card Minggu Ini */}
            {mingguIni && (
              <div className="mb-10">
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-4"
                  style={{ color: "var(--masjid-gold)" }}
                >
                  ⭐ Jumat Terdekat
                </p>
                <div
                  className="rounded-2xl p-8 text-white relative overflow-hidden"
                  style={{ backgroundColor: "var(--masjid-green)" }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: arabesque,
                      backgroundSize: "80px 80px",
                    }}
                  />
                  <div className="relative flex flex-col md:flex-row items-center gap-6">
                    {/* Foto */}
                    <div className="flex-shrink-0">
                      {mingguIni.foto ? (
                        <img
                          src={mingguIni.foto}
                          alt={mingguIni.nama}
                          className="w-24 h-24 rounded-full object-cover border-4 border-white/20 mx-auto"
                        />
                      ) : (
                        <AvatarDefault nama={mingguIni.nama} />
                      )}
                    </div>
                    {/* Info */}
                    <div className="text-center md:text-left flex-1">
                      <p className="text-white/60 text-xs mb-1">
                        📅 {mingguIni.tanggal}
                      </p>
                      <h2 className="text-2xl font-bold mb-1">
                        {mingguIni.nama}
                      </h2>
                      <p
                        className="text-sm mb-3"
                        style={{ color: "var(--masjid-gold)" }}
                      >
                        {mingguIni.jabatan}
                      </p>
                      <div className="inline-block bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm border border-white/20">
                        📖 {mingguIni.materi}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Jadwal Bulan Ini */}
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: "var(--masjid-gold)" }}
            >
              📅 Jadwal Lengkap
            </p>
            <div className="flex flex-col gap-4">
              {data.map((item, i) => {
                const isAktif = mingguIni?.tanggal === item.tanggal;
                return (
                  <div
                    key={i}
                    className="rounded-2xl p-5 border flex items-center gap-5 transition-all duration-300 hover:-translate-y-1"
                    style={{
                      backgroundColor: isAktif
                        ? "var(--masjid-green)"
                        : "white",
                      borderColor: isAktif ? "var(--masjid-green)" : "#e5d9cc",
                      boxShadow: isAktif ? "0 8px 30px rgba(26,61,43,0.2)" : "",
                    }}
                    onMouseEnter={(e) => {
                      if (!isAktif)
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px var(--masjid-green)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isAktif) e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {/* Foto */}
                    <div className="flex-shrink-0">
                      {item.foto ? (
                        <img
                          src={item.foto}
                          alt={item.nama}
                          className="w-14 h-14 rounded-full object-cover border-2"
                          style={{
                            borderColor: isAktif
                              ? "rgba(255,255,255,0.3)"
                              : "#e5d9cc",
                          }}
                        />
                      ) : (
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold"
                          style={{
                            backgroundColor: isAktif
                              ? "rgba(255,255,255,0.15)"
                              : "var(--masjid-cream-dark)",
                            color: isAktif ? "white" : "var(--masjid-green)",
                          }}
                        >
                          {item.nama
                            ?.split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p
                          className="font-bold"
                          style={{
                            color: isAktif ? "white" : "var(--masjid-green)",
                          }}
                        >
                          {item.nama}
                        </p>
                        {isAktif && (
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-semibold"
                            style={{
                              backgroundColor: "var(--masjid-gold)",
                              color: "var(--masjid-green)",
                            }}
                          >
                            Minggu Ini
                          </span>
                        )}
                      </div>
                      <p
                        className="text-xs mb-1"
                        style={{
                          color: isAktif ? "rgba(255,255,255,0.6)" : "#9ca3af",
                        }}
                      >
                        {item.jabatan}
                      </p>
                      <p
                        className="text-sm"
                        style={{
                          color: isAktif ? "rgba(255,255,255,0.8)" : "#6b7280",
                        }}
                      >
                        📖 {item.materi}
                      </p>
                    </div>

                    {/* Tanggal */}
                    <div className="text-right flex-shrink-0">
                      <p
                        className="text-xs font-medium"
                        style={{
                          color: isAktif ? "rgba(255,255,255,0.6)" : "#9ca3af",
                        }}
                      >
                        {item.tanggal}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ImamJumat;
