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

function Kegiatan() {
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
          <h1 className="text-4xl font-bold mb-2">Kegiatan Masjid</h1>
          <p className="text-white/70 text-sm">
            Jadwal kegiatan rutin untuk seluruh jamaah
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-6 pt-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {kegiatanList.map((kegiatan) => (
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "white",
                transition: "box-shadow 0.3s ease, transform 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 0 2px var(--masjid-green)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
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
              <p className="text-gray-500 text-sm mb-4">{kegiatan.deskripsi}</p>

              <div
                className="border-t pt-4 flex flex-col gap-2"
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
            </div>
          ))}
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
