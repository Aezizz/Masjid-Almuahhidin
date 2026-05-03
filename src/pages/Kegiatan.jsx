import { useState, useEffect } from "react";

const DOCS_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSsdFggl3w1ZuW4hcKsv0bZcF6ZjR30a9pbLXzGcPrlSGbNkr4pareH6xcKBOixxWshWZfBXPn9nIu2/pub?gid=0&single=true&output=csv";

const arabesque = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.5' opacity='0.15'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z'/%3E%3Cpath d='M40 10 L70 40 L40 70 L10 40 Z'/%3E%3Ccircle cx='40' cy='40' r='15'/%3E%3Ccircle cx='40' cy='40' r='25'/%3E%3Cpath d='M40 0 L40 80 M0 40 L80 40'/%3E%3Cpath d='M15 15 L65 65 M65 15 L15 65'/%3E%3C/g%3E%3C/svg%3E")`;

const kegiatanList = [
  {
    id: 1,
    nama: "Kajian Subuh",
    hari: "Setiap Ahad",
    waktu: "05:30 - 06:30",
    tempat: "Masjid Al-Muahhidin",
    deskripsi: "Kajian rutin ba'da subuh bersama ustadz.",
    icon: "📖",
    kategori: "Kajian",
  },
  {
    id: 2,
    nama: "Pengajian Anak & Remaja",
    hari: "Setiap Senin & Rabu",
    waktu: "16:00 - 17:30",
    tempat: "Masjid Al-Muahhidin",
    deskripsi: "Belajar Al-Quran dan akhlak untuk anak-anak dan remaja.",
    icon: "🧒",
    kategori: "Pendidikan",
  },
  {
    id: 3,
    nama: "Majelis Taklim Ibu-Ibu",
    hari: "Setiap Jumat",
    waktu: "09:00 - 11:00",
    tempat: "Masjid Al-Muahhidin",
    deskripsi: "Pengajian rutin ibu-ibu jamaah masjid.",
    icon: "👩",
    kategori: "Kajian",
  },
  {
    id: 4,
    nama: "Sholat Jumat Berjamaah",
    hari: "Setiap Jumat",
    waktu: "11:45 - 13:00",
    tempat: "Masjid Al-Muahhidin",
    deskripsi: "Sholat Jumat berjamaah dengan khutbah.",
    icon: "🕌",
    kategori: "Ibadah",
  },
];

const kategoriWarna = {
  Kajian: { bg: "rgba(201,168,76,0.15)", text: "#8a6d1e" },
  Pendidikan: { bg: "rgba(59,130,246,0.1)", text: "#1d4ed8" },
  Ibadah: { bg: "rgba(26,61,43,0.1)", text: "var(--masjid-green)" },
};

function parseCSV(text) {
  const rows = text.trim().split("\n").slice(1);
  return rows
    .map((row) => {
      const cols = row.split(",");
      return {
        kegiatan: cols[0]?.trim(),
        keterangan: cols[1]?.trim(),
        foto: cols[2]?.trim(),
      };
    })
    .filter((item) => item.foto);
}

// Modal Carousel
function ModalKarousel({ kegiatan, fotos, onClose }) {
  const [aktif, setAktif] = useState(0);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setAktif((p) => (p + 1) % fotos.length);
      if (e.key === "ArrowLeft")
        setAktif((p) => (p - 1 + fotos.length) % fotos.length);
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "auto";
    };
  }, [fotos.length, onClose]);

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
            <p className="font-bold text-white">{kegiatan}</p>
            <p className="text-xs" style={{ color: "var(--masjid-gold)" }}>
              {aktif + 1} / {fotos.length} foto
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Foto Utama */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          <img
            src={fotos[aktif].foto}
            alt={fotos[aktif].keterangan}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.src = "";
              e.target.style.display = "none";
            }}
          />

          {/* Tombol Prev */}
          {fotos.length > 1 && (
            <>
              <button
                onClick={() =>
                  setAktif((p) => (p - 1 + fotos.length) % fotos.length)
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-all hover:scale-110"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              >
                ‹
              </button>
              {/* Tombol Next */}
              <button
                onClick={() => setAktif((p) => (p + 1) % fotos.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-all hover:scale-110"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Keterangan */}
        <div className="px-6 py-3 border-t border-white/10">
          <p className="text-white/70 text-sm">{fotos[aktif].keterangan}</p>
        </div>

        {/* Thumbnail */}
        {fotos.length > 1 && (
          <div className="flex gap-2 px-6 pb-5 overflow-x-auto">
            {fotos.map((item, i) => (
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

function Kegiatan() {
  const [dokumentasi, setDokumentasi] = useState({});
  const [modalData, setModalData] = useState(null);
  const [loadingDocs, setLoadingDocs] = useState(true);

  useEffect(() => {
    fetch(DOCS_URL)
      .then((res) => res.text())
      .then((text) => {
        const parsed = parseCSV(text);
        // Group by kegiatan
        const grouped = {};
        parsed.forEach((item) => {
          if (!grouped[item.kegiatan]) grouped[item.kegiatan] = [];
          grouped[item.kegiatan].push(item);
        });
        setDokumentasi(grouped);
        setLoadingDocs(false);
      })
      .catch(() => setLoadingDocs(false));
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--masjid-cream)" }}
    >
      {/* Modal */}
      {modalData && (
        <ModalKarousel
          kegiatan={modalData.nama}
          fotos={modalData.fotos}
          onClose={() => setModalData(null)}
        />
      )}

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
          <h1 className="text-4xl font-bold mb-2">Kegiatan Masjid</h1>
          <p className="text-white/70 text-sm">
            Jadwal kegiatan rutin untuk seluruh jamaah
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-6 pt-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {kegiatanList.map((kegiatan) => {
            const fotos = dokumentasi[kegiatan.nama] || [];
            return (
              <div
                key={kegiatan.id}
                className="rounded-2xl p-6 hover:shadow-md hover:-translate-y-1 transition-all border"
                style={{ backgroundColor: "white", borderColor: "#e5d9cc" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 0 0 2px var(--masjid-green)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                {/* Top Row */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                    style={{ backgroundColor: "var(--masjid-cream-dark)" }}
                  >
                    {kegiatan.icon}
                  </div>
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: kategoriWarna[kegiatan.kategori].bg,
                      color: kategoriWarna[kegiatan.kategori].text,
                    }}
                  >
                    {kegiatan.kategori}
                  </span>
                </div>

                <h2
                  className="font-bold text-lg mb-1"
                  style={{ color: "var(--masjid-green)" }}
                >
                  {kegiatan.nama}
                </h2>
                <p className="text-gray-500 text-sm mb-4">
                  {kegiatan.deskripsi}
                </p>

                <div
                  className="border-t pt-4 flex flex-col gap-2 mb-4"
                  style={{ borderColor: "#e5d9cc" }}
                >
                  {[
                    { icon: "📅", text: kegiatan.hari },
                    { icon: "🕐", text: kegiatan.waktu },
                    { icon: "📍", text: kegiatan.tempat },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-500"
                    >
                      <span>{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Tombol Dokumentasi */}
                <button
                  onClick={() =>
                    fotos.length > 0 &&
                    setModalData({ nama: kegiatan.nama, fotos })
                  }
                  className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
                  style={
                    fotos.length > 0
                      ? {
                          backgroundColor: "var(--masjid-cream-dark)",
                          color: "var(--masjid-green)",
                          cursor: "pointer",
                        }
                      : {
                          backgroundColor: "#f3f4f6",
                          color: "#9ca3af",
                          cursor: "not-allowed",
                        }
                  }
                >
                  📷{" "}
                  {loadingDocs
                    ? "Memuat..."
                    : fotos.length > 0
                      ? `Lihat Dokumentasi (${fotos.length} foto)`
                      : "Belum ada dokumentasi"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Banner */}
        <div
          className="mt-10 rounded-2xl p-8 text-center text-white relative overflow-hidden"
          style={{ backgroundColor: "var(--masjid-green)" }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundImage: arabesque, backgroundSize: "80px 80px" }}
          />
          <div className="relative">
            <p className="text-2xl mb-2">🤝</p>
            <h3 className="font-bold text-lg mb-2">
              Ingin Menambahkan Kegiatan?
            </h3>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Hubungi pengurus masjid untuk informasi pendaftaran dan penambahan
              kegiatan baru.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kegiatan;
