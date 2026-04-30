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
  const rows = text.trim().split("\n").slice(1); // skip header
  return rows.map((row) => {
    const [tanggal, keterangan, jumlah] = row.split(",");
    return {
      tanggal: tanggal?.trim(),
      keterangan: keterangan?.trim(),
      jumlah: parseInt(jumlah?.trim()) || 0,
    };
  });
}

function Donasi() {
  const [copied, setCopied] = useState(null);
  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(SHEETS_URL)
      .then((res) => res.text())
      .then((text) => {
        const data = parseCSV(text);
        setLaporan(data);
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
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          Donasi & Infaq
        </h1>
        <p className="text-gray-500">
          Salurkan donasi Anda untuk kemakmuran Masjid Al-Muahhidin
        </p>
      </div>

      {/* Rekening */}
      <h2 className="text-xl font-bold text-green-800 mb-4">
        💳 Nomor Rekening
      </h2>
      <div className="flex flex-col gap-4 mb-10">
        {rekeningList.map((rek, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  {rek.icon} {rek.bank}
                </p>
                <p className="text-2xl font-mono font-bold text-green-800">
                  {rek.noRek}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  a.n. {rek.atasNama}
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(rek.noRek, i)}
                className="bg-green-100 text-green-700 font-semibold text-sm px-4 py-2 rounded-full hover:bg-green-200 transition-colors"
              >
                {copied === i ? "✅ Tersalin!" : "Salin"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* QRIS */}
      <h2 className="text-xl font-bold text-green-800 mb-4">📱 QRIS</h2>
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 text-center mb-10">
        <div className="bg-gray-100 rounded-xl w-48 h-48 mx-auto flex items-center justify-center text-gray-400 text-sm">
          Upload foto QRIS di sini
        </div>
        <p className="text-gray-500 text-sm mt-3">
          Scan QRIS untuk donasi via aplikasi apapun
        </p>
      </div>

      {/* Saldo */}
      <h2 className="text-xl font-bold text-green-800 mb-4">
        📊 Laporan Keuangan
      </h2>
      <div className="bg-green-700 text-white rounded-2xl p-6 text-center mb-6">
        <p className="text-green-200 text-sm mb-1">Total Saldo Sedekah</p>
        {loading ? (
          <p className="text-2xl font-bold">Memuat...</p>
        ) : (
          <p className="text-4xl font-bold">{formatRupiah(totalSaldo)}</p>
        )}
        <p className="text-green-300 text-xs mt-2">
          *Data diperbarui secara berkala
        </p>
      </div>

      {/* Riwayat */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-green-800">Riwayat Pemasukan</h3>
        </div>

        {loading && (
          <div className="text-center text-gray-400 py-10">Memuat data...</div>
        )}

        {error && <div className="text-center text-red-400 py-10">{error}</div>}

        {!loading &&
          !error &&
          laporan.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-6 py-4 border-b border-gray-50 last:border-0"
            >
              <div>
                <p className="font-medium text-gray-800">{item.keterangan}</p>
                <p className="text-xs text-gray-400">{item.tanggal}</p>
              </div>
              <p className="font-bold text-green-700">
                {formatRupiah(item.jumlah)}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Donasi;
