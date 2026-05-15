import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ModalGaleri } from "../components/ModalGaleri";

const DOCS_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSsdFggl3w1ZuW4hcKsv0bZcF6ZjR30a9pbLXzGcPrlSGbNkr4pareH6xcKBOixxWshWZfBXPn9nIu2/pub?gid=0&single=true&output=csv";

const arabesque = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.5' opacity='0.15'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z'/%3E%3Cpath d='M40 10 L70 40 L40 70 L10 40 Z'/%3E%3Ccircle cx='40' cy='40' r='15'/%3E%3Ccircle cx='40' cy='40' r='25'/%3E%3Cpath d='M40 0 L40 80 M0 40 L80 40'/%3E%3Cpath d='M15 15 L65 65 M65 15 L15 65'/%3E%3C/g%3E%3C/svg%3E")`;

const kegiatanList = [
  {
    id: 1,
    nama: "Kajian Subuh",
    hari: "Setiap Ahad",
    waktu: "05:30 - 06:30",
    tempat: "Masjid Al-Muwahhidin",
    deskripsi: "Kajian rutin ba'da subuh bersama ustadz.",
    icon: "📖",
    kategori: "Kajian",
  },
  {
    id: 2,
    nama: "Pengajian Anak & Remaja",
    hari: "Setiap Senin & Rabu",
    waktu: "16:00 - 17:30",
    tempat: "Masjid Al-Muwahhidin",
    deskripsi: "Belajar Al-Quran dan akhlak untuk anak-anak dan remaja.",
    icon: "🧒",
    kategori: "Pendidikan",
  },
  {
    id: 3,
    nama: "Majelis Taklim Ibu-Ibu",
    hari: "Setiap Jumat",
    waktu: "09:00 - 11:00",
    tempat: "Masjid Al-Muwahhidin",
    deskripsi: "Pengajian rutin ibu-ibu jamaah masjid.",
    icon: "👩",
    kategori: "Kajian",
  },
  {
    id: 4,
    nama: "Sholat Jumat Berjamaah",
    hari: "Setiap Jumat",
    waktu: "11:45 - 13:00",
    tempat: "Masjid Al-Muwahhidin",
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

function Kegiatan() {
  const [dokumentasi, setDokumentasi] = useState({});
  const [modalData, setModalData] = useState(null);
  const [loadingDocs, setLoadingDocs] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 80,
    });

    fetch(DOCS_URL)
      .then((res) => res.text())
      .then((text) => {
        const parsed = parseCSV(text);
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

  const floatClass = ["float-a", "float-b", "float-c", "float-a"];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--masjid-cream)" }}
    >
      {modalData && (
        <ModalGaleri
          judul={modalData.nama}
          deskripsi={`${dokumentasi[modalData.nama]?.length || 0} foto dokumentasi`}
          icon={kegiatanList.find((k) => k.nama === modalData.nama)?.icon}
          fotos={modalData.fotos}
          onClose={() => setModalData(null)}
        />
      )}

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
            Kegiatan Masjid
          </h1>
          <p className="text-white/70 text-sm">
            Jadwal kegiatan rutin untuk seluruh jamaah
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 pt-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {kegiatanList.map((kegiatan, idx) => {
            const fotos = dokumentasi[kegiatan.nama] || [];
            return (
              <div
                key={kegiatan.id}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className={`rounded-2xl p-6 border transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg cursor-pointer ${floatClass[idx]}`}
                style={{ backgroundColor: "white", borderColor: "#e5d9cc" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-13 h-13 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
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
                  className="font-bold text-base mb-1"
                  style={{ color: "var(--masjid-green)" }}
                >
                  {kegiatan.nama}
                </h2>
                <p className="text-slate-500 text-sm mb-4">
                  {kegiatan.deskripsi}
                </p>

                <div
                  className="border-t pt-3 flex flex-col gap-1.5 mb-4"
                  style={{ borderColor: "#e5d9cc" }}
                >
                  {[
                    { icon: "📅", text: kegiatan.hari },
                    { icon: "🕐", text: kegiatan.waktu },
                    { icon: "📍", text: kegiatan.tempat },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-slate-500"
                    >
                      <span>{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    if (fotos.length > 0) {
                      setModalData({ nama: kegiatan.nama, fotos });
                    }
                  }}
                  className="w-full h-10 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor:
                      fotos.length > 0 ? "var(--masjid-cream-dark)" : "#f3f4f6",
                    color: fotos.length > 0 ? "var(--masjid-green)" : "#9ca3af",
                    cursor: fotos.length > 0 ? "pointer" : "not-allowed",
                  }}
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

        <div
          className="mt-10 rounded-2xl p-8 text-center text-white relative overflow-hidden"
          data-aos="fade-up"
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
