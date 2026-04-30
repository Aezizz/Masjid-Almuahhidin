const kegiatanList = [
  {
    id: 1,
    nama: "Kajian Subuh",
    hari: "Setiap Ahad",
    waktu: "05:30 - 06:30",
    tempat: "Masjid Al-Muahhidin",
    deskripsi: "Kajian rutin ba'da subuh bersama ustadz.",
    icon: "📖",
  },
  {
    id: 2,
    nama: "Pengajian Anak & Remaja",
    hari: "Setiap Senin & Rabu",
    waktu: "16:00 - 17:30",
    tempat: "Masjid Al-Muahhidin",
    deskripsi: "Belajar Al-Quran dan akhlak untuk anak-anak dan remaja.",
    icon: "🧒",
  },
  {
    id: 3,
    nama: "Majelis Taklim Ibu-Ibu",
    hari: "Setiap Jumat",
    waktu: "09:00 - 11:00",
    tempat: "Masjid Al-Muahhidin",
    deskripsi: "Pengajian rutin ibu-ibu jamaah masjid.",
    icon: "👩",
  },
  {
    id: 4,
    nama: "Sholat Jumat Berjamaah",
    hari: "Setiap Jumat",
    waktu: "11:45 - 13:00",
    tempat: "Masjid Al-Muahhidin",
    deskripsi: "Sholat Jumat berjamaah dengan khutbah.",
    icon: "🕌",
  },
];

function Kegiatan() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          Kegiatan Masjid
        </h1>
        <p className="text-gray-500">
          Jadwal kegiatan rutin Masjid Al-Muahhidin
        </p>
      </div>

      {/* List Kegiatan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {kegiatanList.map((kegiatan) => (
          <div
            key={kegiatan.id}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{kegiatan.icon}</span>
              <div>
                <h2 className="font-bold text-green-800 text-lg">
                  {kegiatan.nama}
                </h2>
                <p className="text-green-600 text-sm font-medium">
                  {kegiatan.hari}
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">{kegiatan.deskripsi}</p>
            <div className="flex flex-col gap-1 text-sm text-gray-500">
              <span>🕐 {kegiatan.waktu}</span>
              <span>📍 {kegiatan.tempat}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Banner Info */}
      <div className="mt-12 bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <p className="text-green-800 font-medium">
          Ada kegiatan lain yang ingin ditambahkan?
        </p>
        <p className="text-green-600 text-sm mt-1">
          Hubungi pengurus masjid untuk informasi lebih lanjut.
        </p>
      </div>
    </div>
  );
}

export default Kegiatan;
