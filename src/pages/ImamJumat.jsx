import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const SHEETS_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRPzziWYcG7rNySVh2Xg32kgMonogpC5QZNJOuFJhZTHG1cqjzrsUzoqWjTXudwsxEYb9Mf3Ri2iNj0/pub?gid=0&single=true&output=csv";

const arabesque = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.5' opacity='0.15'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z'/%3E%3Cpath d='M40 10 L70 40 L40 70 L10 40 Z'/%3E%3Ccircle cx='40' cy='40' r='15'/%3E%3Ccircle cx='40' cy='40' r='25'/%3E%3Cpath d='M40 0 L40 80 M0 40 L80 40'/%3E%3Cpath d='M15 15 L65 65 M65 15 L15 65'/%3E%3C/g%3E%3C/svg%3E")`;

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

function parseTanggal(str) {
  if (!str) return null;
  const parts = str.trim().split(" ");
  if (parts.length < 3) return null;
  const day = parseInt(parts[0]);
  const month = bulanMap[parts[1]];
  const year = parseInt(parts[2]);
  if (isNaN(day) || month === undefined || isNaN(year)) return null;
  return new Date(year, month, day);
}

function filterData(data) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const sebulanLalu = new Date(now);
  sebulanLalu.setMonth(sebulanLalu.getMonth() - 1);
  return data.filter((item) => {
    const tgl = parseTanggal(item.tanggal);
    return tgl && tgl >= sebulanLalu;
  });
}

function getMingguIni(data) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const mendatang = data.filter((item) => {
    const tgl = parseTanggal(item.tanggal);
    return tgl && tgl >= now;
  });
  return mendatang.length > 0 ? mendatang[0] : data[data.length - 1];
}

function SkeletonCard() {
  return (
    <div
      className="rounded-2xl p-8 relative overflow-hidden"
      style={{ backgroundColor: "var(--masjid-green)" }}
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div
          className="w-24 h-24 rounded-full animate-pulse flex-shrink-0"
          style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
        />
        <div className="flex-1 w-full flex flex-col gap-3">
          <div
            className="h-3 rounded-full w-24 animate-pulse"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          />
          <div
            className="h-6 rounded-full w-48 animate-pulse"
            style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
          />
          <div
            className="h-3 rounded-full w-32 animate-pulse"
            style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
          />
          <div
            className="h-8 rounded-full w-56 animate-pulse mt-1"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          />
        </div>
      </div>
    </div>
  );
}

function SkeletonList() {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-2xl p-5 border flex items-center gap-5"
          style={{ backgroundColor: "white", borderColor: "#e5d9cc" }}
        >
          <div
            className="w-14 h-14 rounded-full animate-pulse flex-shrink-0"
            style={{ backgroundColor: "var(--masjid-cream-dark)" }}
          />
          <div className="flex-1 flex flex-col gap-2">
            <div
              className="h-4 rounded-full w-40 animate-pulse"
              style={{ backgroundColor: "var(--masjid-cream-dark)" }}
            />
            <div
              className="h-3 rounded-full w-24 animate-pulse"
              style={{ backgroundColor: "var(--masjid-cream-dark)" }}
            />
            <div
              className="h-3 rounded-full w-52 animate-pulse"
              style={{ backgroundColor: "var(--masjid-cream-dark)" }}
            />
          </div>
          <div
            className="h-3 rounded-full w-20 animate-pulse flex-shrink-0"
            style={{ backgroundColor: "var(--masjid-cream-dark)" }}
          />
        </div>
      ))}
    </div>
  );
}

function AvatarDefault({ nama, size = "lg" }) {
  const inisial =
    nama
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("") || "?";
  const cls = size === "lg" ? "w-20 h-20 text-xl" : "w-14 h-14 text-base";
  return (
    <div
      className={`${cls} rounded-full flex items-center justify-center font-bold text-white mx-auto`}
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
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 80,
    });
    fetch(SHEETS_URL)
      .then((res) => res.text())
      .then((text) => {
        const parsed = parseCSV(text);
        const filtered = filterData(parsed);
        filtered.sort(
          (a, b) => parseTanggal(a.tanggal) - parseTanggal(b.tanggal),
        );
        setData(filtered);
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal memuat data jadwal imam.");
        setLoading(false);
      });
  }, []);

  const mingguIni = getMingguIni(data);
  const jadwalLainnya = data.filter(
    (item) => item.tanggal !== mingguIni?.tanggal,
  );

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--masjid-cream)" }}
    >
      {/* Header */}
      <div
        className="relative overflow-hidden pt-28 pb-16 px-6 text-center text-white"
        style={{ backgroundColor: "var(--masjid-green)" }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundImage: arabesque, backgroundSize: "80px 80px" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" />
        <div className="relative">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--masjid-gold)" }}
          >
            Masjid Al-Muwahhidin
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Jadwal Imam & Penceramah
          </h1>
          <p className="text-white/70 text-sm">
            Jadwal Sholat Jumat Masjid Al-Muwahhidin
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 pt-8 pb-16">
        {error && <div className="text-center text-red-400 py-20">{error}</div>}

        {loading && (
          <div className="flex flex-col gap-6">
            <div>
              <div
                className="h-3 rounded-full w-32 animate-pulse mb-4"
                style={{ backgroundColor: "var(--masjid-cream-dark)" }}
              />
              <SkeletonCard />
            </div>
            <div>
              <div
                className="h-3 rounded-full w-28 animate-pulse mb-4"
                style={{ backgroundColor: "var(--masjid-cream-dark)" }}
              />
              <SkeletonList />
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {mingguIni && (
              <div className="mb-8" data-aos="fade-up">
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-4"
                  style={{ color: "var(--masjid-gold)" }}
                >
                  ⭐ Jumat Terdekat
                </p>
                <div
                  className="rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden"
                  style={{ backgroundColor: "var(--masjid-green)" }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: arabesque,
                      backgroundSize: "80px 80px",
                    }}
                  />
                  <div className="relative flex flex-col sm:flex-row items-center gap-6">
                    <div className="flex-shrink-0">
                      {mingguIni.foto ? (
                        <img
                          src={mingguIni.foto}
                          alt={mingguIni.nama}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white/20 mx-auto"
                        />
                      ) : (
                        <AvatarDefault nama={mingguIni.nama} />
                      )}
                    </div>
                    <div className="text-center sm:text-left flex-1">
                      <p className="text-white/60 text-xs mb-1">
                        📅 {mingguIni.tanggal}
                      </p>
                      <h2 className="text-xl sm:text-2xl font-bold mb-1">
                        {mingguIni.nama}
                      </h2>
                      <p
                        className="text-sm mb-3"
                        style={{ color: "var(--masjid-gold)" }}
                      >
                        {mingguIni.jabatan}
                      </p>
                      <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-white/20">
                        📖 {mingguIni.materi}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {jadwalLainnya.length > 0 && (
              <>
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-4"
                  style={{ color: "var(--masjid-gold)" }}
                >
                  📅 Jadwal Lengkap
                </p>
                <div className="relative">
                  <div
                    className="absolute top-0 left-0 right-0 h-8 z-10 pointer-events-none rounded-t-2xl"
                    style={{
                      background:
                        "linear-gradient(to bottom, var(--masjid-cream), transparent)",
                    }}
                  />
                  <div
                    className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1"
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor:
                        "var(--masjid-green) var(--masjid-cream-dark)",
                    }}
                  >
                    {jadwalLainnya.map((item, i) => (
                      <div
                        key={i}
                        data-aos="fade-up"
                        data-aos-delay={Math.min(i * 80, 400)}
                        className="rounded-2xl p-4 sm:p-5 border flex items-center gap-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md"
                        style={{
                          backgroundColor: "white",
                          borderColor: "#e5d9cc",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.boxShadow =
                            "0 0 0 2px var(--masjid-green), 0 4px 20px rgba(26,61,43,0.1)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.boxShadow = "none")
                        }
                      >
                        <div className="flex-shrink-0">
                          {item.foto ? (
                            <img
                              src={item.foto}
                              alt={item.nama}
                              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2"
                              style={{ borderColor: "#e5d9cc" }}
                            />
                          ) : (
                            <AvatarDefault nama={item.nama} size="sm" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className="font-bold text-sm truncate"
                            style={{ color: "var(--masjid-green)" }}
                          >
                            {item.nama}
                          </p>
                          <p
                            className="text-xs mb-0.5"
                            style={{ color: "#9ca3af" }}
                          >
                            {item.jabatan}
                          </p>
                          <p className="text-xs text-slate-500 truncate">
                            📖 {item.materi}
                          </p>
                        </div>
                        <p
                          className="text-xs font-medium flex-shrink-0"
                          style={{ color: "#9ca3af" }}
                        >
                          {item.tanggal}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-8 z-10 pointer-events-none rounded-b-2xl"
                    style={{
                      background:
                        "linear-gradient(to top, var(--masjid-cream), transparent)",
                    }}
                  />
                </div>
              </>
            )}

            {data.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <p className="text-4xl mb-3">📭</p>
                <p>Belum ada jadwal imam yang tersedia.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ImamJumat;
