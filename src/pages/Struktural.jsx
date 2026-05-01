const arabesque = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.5' opacity='0.15'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z'/%3E%3Cpath d='M40 10 L70 40 L40 70 L10 40 Z'/%3E%3Ccircle cx='40' cy='40' r='15'/%3E%3Ccircle cx='40' cy='40' r='25'/%3E%3Cpath d='M40 0 L40 80 M0 40 L80 40'/%3E%3Cpath d='M15 15 L65 65 M65 15 L15 65'/%3E%3C/g%3E%3C/svg%3E")`;

const pengurusData = [
  { jabatan: "Ketua DKM", nama: "Nama Ketua", foto: null },
  { jabatan: "Wakil Ketua", nama: "Nama Wakil", foto: null },
  { jabatan: "Sekretaris", nama: "Nama Sekretaris", foto: null },
  { jabatan: "Bendahara", nama: "Nama Bendahara", foto: null },
  { jabatan: "Sie. Ibadah", nama: "Nama Pengurus", foto: null },
  { jabatan: "Sie. Pendidikan", nama: "Nama Pengurus", foto: null },
];

function AvatarDefault({ nama }) {
  const inisial =
    nama
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("") || "?";
  return (
    <div
      className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold text-white mx-auto mb-3"
      style={{ backgroundColor: "var(--masjid-green-light)" }}
    >
      {inisial}
    </div>
  );
}

function Struktural() {
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
          <h1 className="text-4xl font-bold mb-2">Struktural Masjid</h1>
          <p className="text-white/70 text-sm">
            Pengurus & Divisi Masjid Al-Muahhidin
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-6 pt-8 pb-16">
        {/* Visi Misi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          <div
            className="rounded-2xl p-6 border"
            style={{ backgroundColor: "white", borderColor: "#e5d9cc" }}
          >
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--masjid-gold)" }}
            >
              Visi
            </p>
            <p
              className="font-bold text-lg mb-2"
              style={{ color: "var(--masjid-green)" }}
            >
              Menjadi Masjid yang Makmur
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Mewujudkan masjid sebagai pusat ibadah, pendidikan, dan
              pemberdayaan umat yang bermartabat.
            </p>
          </div>
          <div
            className="rounded-2xl p-6 border"
            style={{ backgroundColor: "white", borderColor: "#e5d9cc" }}
          >
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--masjid-gold)" }}
            >
              Misi
            </p>
            <p
              className="font-bold text-lg mb-2"
              style={{ color: "var(--masjid-green)" }}
            >
              Langkah Nyata untuk Umat
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Menyelenggarakan kegiatan ibadah, pendidikan, dan sosial yang
              bermanfaat bagi seluruh jamaah.
            </p>
          </div>
        </div>

        {/* Pengurus */}
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-6"
          style={{ color: "var(--masjid-gold)" }}
        >
          👥 Susunan Pengurus
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-12">
          {pengurusData.map((p, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 text-center border transition-all duration-300 hover:-translate-y-1"
              style={{ backgroundColor: "white", borderColor: "#e5d9cc" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 0 2px var(--masjid-green)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              {p.foto ? (
                <img
                  src={p.foto}
                  alt={p.nama}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                />
              ) : (
                <AvatarDefault nama={p.nama} />
              )}
              <p
                className="font-bold text-sm mb-1"
                style={{ color: "var(--masjid-green)" }}
              >
                {p.nama}
              </p>
              <p
                className="text-xs px-3 py-1 rounded-full inline-block"
                style={{
                  backgroundColor: "var(--masjid-cream-dark)",
                  color: "var(--masjid-green)",
                }}
              >
                {p.jabatan}
              </p>
            </div>
          ))}
        </div>

        {/* Coming Soon Banner */}
        <div
          className="rounded-2xl p-8 text-center text-white relative overflow-hidden"
          style={{ backgroundColor: "var(--masjid-green)" }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundImage: arabesque, backgroundSize: "80px 80px" }}
          />
          <div className="relative">
            <p className="text-3xl mb-3">🏗️</p>
            <h3 className="font-bold text-xl mb-2">
              Halaman Sedang Dikembangkan
            </h3>
            <p className="text-white/60 text-sm">
              Fitur lengkap struktural masjid akan segera hadir. Nantikan
              pembaruan selanjutnya!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Struktural;
