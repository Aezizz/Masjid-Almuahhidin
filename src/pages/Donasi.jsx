import { useState, useEffect } from "react";

const SHEETS_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRbvc5UFLbApaLKDUIPltm8Enh4H4UvqiTYk_s6AOWoYXcIb1Fjxpvb-BKwUfPVFbpwbaxnkJd1E5bn/pub?gid=0&single=true&output=csv";

const rekeningList = [
  {
    bank: "Bank Syariah Indonesia (BSI)",
    noRek: "1234567890",
    atasNama: "Masjid Al-Muahhidin",
    icon: "🏦",
  },
  {
    bank: "Bank BRI",
    noRek: "0987654321",
    atasNama: "Masjid Al-Muahhidin",
    icon: "🏦",
  },
];

function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}

function parseCSV(text) {
  const rows = text.trim().split("\n").slice(1);
  return rows.map((row) => {
    const [tanggal, keterangan, jumlah] = row.split(",");
    return {
      tanggal: tanggal?.trim(),
      keterangan: keterangan?.trim(),
      jumlah: parseInt(jumlah?.trim()) || 0,
    };
  });
}

function groupByTanggal(data) {
  const grouped = {};
  data.forEach((item) => {
    if (!grouped[item.tanggal]) grouped[item.tanggal] = [];
    grouped[item.tanggal].push(item);
  });
  return grouped;
}

function LaporanKeuangan({ laporan, loading, error }) {
  const [lihatSemua, setLihatSemua] = useState(false);

  const lima_terbaru = laporan.slice(0, 5);
  const grouped = groupByTanggal(laporan);

  if (loading)
    return (
      <div className="text-center text-gray-400 py-12">Memuat data...</div>
    );

  if (error)
    return <div className="text-center text-red-400 py-12">{error}</div>;

  return (
    <div className="flex flex-col gap-4">
      {/* Mode: 5 Terbaru */}
      {!lihatSemua && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">5 Transaksi Terbaru</h3>
            <p className="text-gray-400 text-xs mt-0.5">
              Data langsung dari Google Sheets pengurus
            </p>
          </div>

          {lima_terbaru.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-6 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm">
                  💰
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">
                    {item.keterangan}
                  </p>
                  <p className="text-xs text-gray-400">{item.tanggal}</p>
                </div>
              </div>
              <p className="font-bold text-green-700 text-sm">
                {formatRupiah(item.jumlah)}
              </p>
            </div>
          ))}

          <button
            onClick={() => setLihatSemua(true)}
            className="w-full py-4 text-sm font-semibold text-green-700 hover:bg-green-50 transition-colors border-t border-gray-100"
          >
            Lihat Semua Transaksi →
          </button>
        </div>
      )}

      {/* Mode: Per Hari */}
      {lihatSemua && (
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setLihatSemua(false)}
            className="self-start text-sm font-semibold text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            ← Kembali ke 5 Terbaru
          </button>

          {Object.entries(grouped).map(([tanggal, items]) => {
            const totalHari = items.reduce((acc, i) => acc + i.jumlah, 0);
            return (
              <div
                key={tanggal}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="px-6 py-3 bg-green-50 border-b border-green-100 flex items-center justify-between">
                  <p className="font-bold text-green-800 text-sm">
                    📅 {tanggal}
                  </p>
                  <p className="text-xs font-semibold text-green-600">
                    {formatRupiah(totalHari)}
                  </p>
                </div>

                <div className="max-h-60 overflow-y-auto">
                  {items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-6 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-xs">
                          💰
                        </div>
                        <p className="text-sm text-gray-700">
                          {item.keterangan}
                        </p>
                      </div>
                      <p className="font-semibold text-green-700 text-sm">
                        {formatRupiah(item.jumlah)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Donasi() {
  const [copied, setCopied] = useState(null);
  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("rekening");

  useEffect(() => {
    fetch(SHEETS_URL)
      .then((res) => res.text())
      .then((text) => {
        setLaporan(parseCSV(text));
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal memuat data laporan keuangan.");
        setLoading(false);
      });
  }, []);

  const totalSaldo = laporan.reduce((acc, item) => acc + item.jumlah, 0);

  function copyToClipboard(text, id) {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

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
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.5' opacity='0.15'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z'/%3E%3Cpath d='M40 10 L70 40 L40 70 L10 40 Z'/%3E%3Ccircle cx='40' cy='40' r='15'/%3E%3Ccircle cx='40' cy='40' r='25'/%3E%3Cpath d='M40 0 L40 80 M0 40 L80 40'/%3E%3Cpath d='M15 15 L65 65 M65 15 L15 65'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30" />
        <div className="relative">
          <p className="style text-xs font-semibold tracking-widest uppercase mb-3">
            Masjid Al-Muahhidin
          </p>
          <h1 className="text-4xl font-bold mb-2">Donasi & Infaq</h1>
          <p className="text-green-200 text-sm">
            Salurkan donasi Anda untuk kemakmuran Masjid Al-Muahhidin
          </p>

          <div className="mt-8 inline-block bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-10 py-5">
            <p className="text-green-200 text-xs mb-1">Total Saldo Sedekah</p>
            {loading ? (
              <p className="text-2xl font-bold">Memuat...</p>
            ) : (
              <p className="text-3xl font-bold">{formatRupiah(totalSaldo)}</p>
            )}
            <p className="text-green-300 text-xs mt-1">
              *Diperbarui secara berkala
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-6 pt-8 pb-16">
        {/* Tab */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5 flex gap-1 mb-6">
          {[
            { key: "rekening", label: "💳 Cara Donasi" },
            { key: "laporan", label: "📊 Laporan Keuangan" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.key
                  ? "bg-green-700 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: Cara Donasi */}
        {activeTab === "rekening" && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">
                Nomor Rekening
              </h2>
              <div className="flex flex-col gap-3">
                {rekeningList.map((rek, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">
                          {rek.icon} {rek.bank}
                        </p>
                        <p className="text-2xl font-mono font-bold text-green-800">
                          {rek.noRek}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          a.n. {rek.atasNama}
                        </p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(rek.noRek, i)}
                        className={`text-sm font-semibold px-4 py-2 rounded-full transition-all ${
                          copied === i
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700"
                        }`}
                      >
                        {copied === i ? "✅ Tersalin!" : "Salin"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">
                QRIS
              </h2>
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 text-center">
                <div className="bg-gray-50 rounded-xl w-48 h-48 mx-auto flex items-center justify-center text-gray-300 text-sm border-2 border-dashed border-gray-200">
                  📱 Upload QRIS di sini
                </div>
                <p className="text-gray-400 text-xs mt-3">
                  Scan QRIS untuk donasi via aplikasi apapun
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Laporan */}
        {activeTab === "laporan" && (
          <LaporanKeuangan laporan={laporan} loading={loading} error={error} />
        )}
      </div>
    </div>
  );
}

export default Donasi;
