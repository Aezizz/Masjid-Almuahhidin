import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 80,
    });
  }, []);

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
            Struktural Masjid
          </h1>
          <p className="text-white/70 text-sm">
            Pengurus & Divisi Masjid Al-Muwahhidin
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-6 pt-8 pb-16">
        {/* Visi Misi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {[
            {
              dir: "fade-right",
              label: "Visi",
              judul: "Menjadi Masjid yang Makmur",
              isi: "Mewujudkan masjid sebagai pusat ibadah, pendidikan, dan pemberdayaan umat yang bermartabat.",
            },
            {
              dir: "fade-left",
              label: "Misi",
              judul: "Langkah Nyata untuk Umat",
              isi: "Menyelenggarakan kegiatan ibadah, pendidikan, dan sosial yang bermanfaat bagi seluruh jamaah.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 border transition-all duration-300 hover:shadow-md"
              data-aos={item.dir}
              style={{ backgroundColor: "white", borderColor: "#e5d9cc" }}
            >
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: "var(--masjid-gold)" }}
              >
                {item.label}
              </p>
              <p
                className="font-bold text-lg mb-2"
                style={{ color: "var(--masjid-green)" }}
              >
                {item.judul}
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">
                {item.isi}
              </p>
            </div>
          ))}
        </div>

        {/* Pengurus */}
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-6"
          style={{ color: "var(--masjid-gold)" }}
        >
          👥 Susunan Pengurus
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {pengurusData.map((p, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 80}
              className="rounded-2xl p-5 text-center border transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md"
              style={{ backgroundColor: "white", borderColor: "#e5d9cc" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 0 2px var(--masjid-green), 0 4px 20px rgba(26,61,43,0.1)")
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

        {/* Coming Soon */}
        <div
          className="rounded-2xl p-8 text-center text-white relative overflow-hidden"
          data-aos="fade-up"
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
