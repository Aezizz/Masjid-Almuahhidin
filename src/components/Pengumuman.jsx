import { useState, useEffect } from "react";

const PENGUMUMAN_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTbpSeuMCTO4n5krfN05lUU0m3e35qTsPskwBWtn590FKaLywEdp9o9zmXZa42jJc6vwquOHcfeA9Dp/pub?gid=0&single=true&output=csv";

function parseCSV(text) {
  const rows = text.trim().split("\n").slice(1);
  return rows
    .map((row) => {
      const cols = row.split(",");
      return {
        judul: cols[0]?.trim(),
        isi: cols[1]?.trim(),
        tipe: cols[2]?.trim().toLowerCase(),
        tanggal: cols[3]?.trim(),
      };
    })
    .filter((item) => item.judul);
}

const tipeStyle = {
  penting: {
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.3)",
    badge: { bg: "#ef4444", text: "white" },
    icon: "🚨",
    label: "Penting",
  },
  info: {
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.2)",
    badge: { bg: "#3b82f6", text: "white" },
    icon: "ℹ️",
    label: "Info",
  },
  donasi: {
    bg: "rgba(201,168,76,0.1)",
    border: "rgba(201,168,76,0.3)",
    badge: { bg: "var(--masjid-gold)", text: "var(--masjid-green)" },
    icon: "💝",
    label: "Donasi",
  },
};

export function PengumumanBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sudahDitutup = sessionStorage.getItem("pengumuman_ditutup");
    if (!sudahDitutup) {
      setTimeout(() => setVisible(true), 1000);
    }
  }, []);

  function tutup() {
    sessionStorage.setItem("pengumuman_ditutup", "true");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
      }}
      onClick={tutup}
    >
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: "white" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="relative px-6 py-5 text-white"
          style={{ backgroundColor: "var(--masjid-green)" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.5' opacity='0.15'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "80px 80px",
            }}
          />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🕌</span>
              <div>
                <p className="font-bold text-sm">Masjid Al-Muwahhidin</p>
                <p className="text-xs text-white/60">Pemberitahuan</p>
              </div>
            </div>
            <button
              onClick={tutup}
              className="text-white/60 hover:text-white text-xl transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Konten */}
        <div className="p-6 text-center">
          <p className="text-4xl mb-4">🚧</p>
          <h3
            className="text-xl font-bold mb-2"
            style={{ color: "var(--masjid-green)" }}
          >
            Website Sedang Dikembangkan
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            Website Masjid Al-Muwahhidin saat ini masih dalam tahap
            pengembangan. Beberapa fitur mungkin belum sempurna atau masih dalam
            proses penyesuaian.
          </p>
          <p className="text-xs text-gray-400">
            Terima kasih atas kesabaran dan dukungan Anda. 🙏
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={tutup}
            className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
            style={{ backgroundColor: "var(--masjid-green)", color: "white" }}
          >
            Oke, Mengerti!
          </button>
          <p className="text-xs text-gray-400 text-center mt-3">
            Klik di luar untuk menutup
          </p>
        </div>
      </div>
    </div>
  );
}

export function PengumumanSection() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(PENGUMUMAN_URL)
      .then((res) => res.text())
      .then((text) => {
        setData(parseCSV(text));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || data.length === 0) return null;

  return (
    <section
      className="py-16 px-4"
      style={{ backgroundColor: "var(--masjid-cream)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8" data-aos="fade-up">
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--masjid-gold)" }}
          >
            Terbaru
          </p>
          <h2
            className="text-3xl font-bold"
            style={{ color: "var(--masjid-green)" }}
          >
            Pengumuman Masjid
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item, i) => {
            const style = tipeStyle[item.tipe] || tipeStyle.info;
            return (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-1"
                style={{ backgroundColor: style.bg, borderColor: style.border }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 0 0 2px var(--masjid-green)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: style.badge.bg,
                      color: style.badge.text,
                    }}
                  >
                    {style.icon} {style.label}
                  </span>
                  <span className="text-xs text-gray-400">{item.tanggal}</span>
                </div>

                {/* Judul */}
                <h3
                  className="font-bold mb-2"
                  style={{ color: "var(--masjid-green)" }}
                >
                  {item.judul}
                </h3>

                {/* Isi */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.isi}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
