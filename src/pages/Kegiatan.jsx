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
  Kajian: "bg-blue-100 text-blue-700",
  Pendidikan: "bg-yellow-100 text-yellow-700",
  Ibadah: "bg-green-100 text-green-700",
};

function Kegiatan() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-800 pt-28 pb-16 px-4 text-center text-white">
        <p className="text-green-300 text-xs font-semibold tracking-widest uppercase mb-3">
          Masjid Al-Muahhidin
        </p>
        <h1 className="text-4xl font-bold mb-2">Kegiatan Masjid</h1>
        <p className="text-green-200 text-sm">
          Jadwal kegiatan rutin untuk seluruh jamaah
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-6 pb-16">
        {/* Grid Kegiatan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {kegiatanList.map((kegiatan) => (
            <div
              key={kegiatan.id}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all border border-gray-100"
            >
              {/* Top Row */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-3xl">
                  {kegiatan.icon}
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${kategoriWarna[kegiatan.kategori]}`}
                >
                  {kegiatan.kategori}
                </span>
              </div>

              {/* Info */}
              <h2 className="font-bold text-gray-800 text-lg mb-1">
                {kegiatan.nama}
              </h2>
              <p className="text-gray-500 text-sm mb-4">{kegiatan.deskripsi}</p>

              {/* Detail */}
              <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="text-base">📅</span>
                  <span>{kegiatan.hari}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="text-base">🕐</span>
                  <span>{kegiatan.waktu}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="text-base">📍</span>
                  <span>{kegiatan.tempat}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner */}
        <div className="mt-10 bg-green-800 rounded-2xl p-8 text-center text-white">
          <p className="text-2xl mb-2">🤝</p>
          <h3 className="font-bold text-lg mb-2">
            Ingin Menambahkan Kegiatan?
          </h3>
          <p className="text-green-200 text-sm">
            Hubungi pengurus masjid untuk informasi pendaftaran dan penambahan
            kegiatan baru.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Kegiatan;
