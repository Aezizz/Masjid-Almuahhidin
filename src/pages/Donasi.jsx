import { useState, useEffect } from "react";

const SHEETS_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRbvc5UFLbApaLKDUIPltm8Enh4H4UvqiTYk_s6AOWoYXcIb1Fjxpvb-BKwUfPVFbpwbaxnkJd1E5bn/pub?gid=0&single=true&output=csv";

const WA_ADMIN = "6281210667215"; // Ganti dengan nomor WA admin

const rekeningList = [
  {
    bank: "Bank Syariah Indonesia (BSI)",
    noRek: "1234567890",
    atasNama: "Masjid Al-Muahhidin",
  },
  { bank: "Bank BRI", noRek: "0987654321", atasNama: "Masjid Al-Muahhidin" },
];

const nominalCepat = [10000, 25000, 50000, 100000, 250000, 500000];

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
            className="w-full py-4 text-sm font-semibold hover:bg-green-50 transition-colors border-t border-gray-100"
            style={{ color: "var(--masjid-green)" }}
          >
            Lihat Semua Transaksi →
          </button>
        </div>
      )}

      {lihatSemua && (
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setLihatSemua(false)}
            className="self-start text-sm font-semibold text-gray-500 hover:text-gray-700"
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
                <div
                  className="px-6 py-3 border-b flex items-center justify-between"
                  style={{
                    backgroundColor: "var(--masjid-cream-dark)",
                    borderColor: "#e5d9cc",
                  }}
                >
                  <p
                    className="font-bold text-sm"
                    style={{ color: "var(--masjid-green)" }}
                  >
                    📅 {tanggal}
                  </p>
                  <p
                    className="text-xs font-semibold"
                    style={{ color: "var(--masjid-green)" }}
                  >
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
  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("donasi");

  // Form state
  const [step, setStep] = useState(1); // 1: Form, 2: Pembayaran, 3: Konfirmasi
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [metode, setMetode] = useState("");
  const [bankDipilih, setBankDipilih] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(SHEETS_URL)
      .then((res) => res.text())
      .then((text) => {
        setLaporan(parseCSV(text));
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal memuat data.");
        setLoading(false);
      });
  }, []);

  const totalSaldo = laporan.reduce((acc, item) => acc + item.jumlah, 0);

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleLanjut() {
    if (!nama || !jumlah || !metode)
      return alert("Mohon lengkapi semua field!");
    if (metode === "bank" && !bankDipilih) return alert("Pilih bank tujuan!");
    setStep(2);
  }

  function handleKonfirmasiWA() {
    const bank = rekeningList.find((r) => r.noRek === bankDipilih);
    const pesan = `Assalamu'alaikum, saya *${nama}* ingin konfirmasi donasi:\n\n📋 *Keterangan:* ${deskripsi || "-"}\n💰 *Jumlah:* ${formatRupiah(jumlah)}\n🏦 *Metode:* ${metode === "qris" ? "QRIS" : `Transfer ${bank?.bank}`}\n\nMohon konfirmasi penerimaan donasi. Jazakallahu khairan.`;
    window.open(
      `https://wa.me/${WA_ADMIN}?text=${encodeURIComponent(pesan)}`,
      "_blank",
    );
    setStep(3);
  }

  const arabesque = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.5' opacity='0.15'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z'/%3E%3Cpath d='M40 10 L70 40 L40 70 L10 40 Z'/%3E%3Ccircle cx='40' cy='40' r='15'/%3E%3Ccircle cx='40' cy='40' r='25'/%3E%3Cpath d='M40 0 L40 80 M0 40 L80 40'/%3E%3Cpath d='M15 15 L65 65 M65 15 L15 65'/%3E%3C/g%3E%3C/svg%3E")`;

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
          <h1 className="text-4xl font-bold mb-2">Donasi & Infaq</h1>
          <p className="text-white/70 text-sm">
            Salurkan donasi Anda untuk kemakmuran Masjid Al-Muahhidin
          </p>
          <div
            className="mt-8 inline-block backdrop-blur border border-white/20 rounded-2xl px-10 py-5"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            <p className="text-xs mb-1" style={{ color: "var(--masjid-gold)" }}>
              Total Saldo Sedekah
            </p>
            {loading ? (
              <p className="text-2xl font-bold">Memuat...</p>
            ) : (
              <p className="text-3xl font-bold">{formatRupiah(totalSaldo)}</p>
            )}
            <p className="text-xs mt-1 text-white/40">
              *Diperbarui secara berkala
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-6 pt-8 pb-16">
        {/* Tab */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5 flex gap-1 mb-6">
          {[
            { key: "donasi", label: "💝 Donasi Sekarang" },
            { key: "laporan", label: "📊 Laporan Keuangan" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setStep(1);
              }}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={
                activeTab === tab.key
                  ? { backgroundColor: "var(--masjid-green)", color: "white" }
                  : { color: "#6b7280" }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Donasi */}
        {activeTab === "donasi" && (
          <div>
            {/* Step 1 — Form */}
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2
                  className="font-bold text-lg mb-6"
                  style={{ color: "var(--masjid-green)" }}
                >
                  📋 Isi Data Donasi
                </h2>

                {/* Nama */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      className="text-sm font-semibold"
                      style={{ color: "var(--masjid-green)" }}
                    >
                      Nama Donatur <span className="text-red-400">*</span>
                    </label>
                    <button
                      onClick={() =>
                        setNama(nama === "Hamba Allah" ? "" : "Hamba Allah")
                      }
                      className="text-xs px-3 py-1 rounded-full transition-all border"
                      style={
                        nama === "Hamba Allah"
                          ? {
                              backgroundColor: "var(--masjid-green)",
                              color: "white",
                              borderColor: "var(--masjid-green)",
                            }
                          : {
                              backgroundColor: "var(--masjid-cream)",
                              color: "var(--masjid-green)",
                              borderColor: "#e5d9cc",
                            }
                      }
                    >
                      🤫{" "}
                      {nama === "Hamba Allah"
                        ? "Anonim aktif"
                        : "Donasi Anonim"}
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Masukkan nama Anda"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                    style={{
                      borderColor: "#e5d9cc",
                      backgroundColor: "var(--masjid-cream)",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--masjid-green)")
                    }
                    onBlur={(e) => (e.target.style.borderColor = "#e5d9cc")}
                  />
                </div>

                {/* Deskripsi */}
                <div className="mb-4">
                  <label
                    className="text-sm font-semibold mb-1.5 block"
                    style={{ color: "var(--masjid-green)" }}
                  >
                    Keterangan Donasi
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Infaq pembangunan, Sedekah Jumat, dll"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                    style={{
                      borderColor: "#e5d9cc",
                      backgroundColor: "var(--masjid-cream)",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--masjid-green)")
                    }
                    onBlur={(e) => (e.target.style.borderColor = "#e5d9cc")}
                  />
                </div>

                {/* Nominal */}
                <div className="mb-4">
                  <label
                    className="text-sm font-semibold mb-1.5 block"
                    style={{ color: "var(--masjid-green)" }}
                  >
                    Jumlah Donasi <span className="text-red-400">*</span>
                  </label>
                  {/* Nominal Cepat */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {nominalCepat.map((n) => (
                      <button
                        key={n}
                        onClick={() => setJumlah(n.toString())}
                        className="py-2 rounded-xl text-sm font-semibold transition-all border"
                        style={
                          jumlah === n.toString()
                            ? {
                                backgroundColor: "var(--masjid-green)",
                                color: "white",
                                borderColor: "var(--masjid-green)",
                              }
                            : {
                                backgroundColor: "var(--masjid-cream)",
                                color: "var(--masjid-green)",
                                borderColor: "#e5d9cc",
                              }
                        }
                      >
                        {formatRupiah(n)}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="Atau masukkan nominal lain..."
                    value={jumlah}
                    onChange={(e) => setJumlah(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                    style={{
                      borderColor: "#e5d9cc",
                      backgroundColor: "var(--masjid-cream)",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--masjid-green)")
                    }
                    onBlur={(e) => (e.target.style.borderColor = "#e5d9cc")}
                  />
                </div>

                {/* Metode */}
                <div className="mb-6">
                  <label
                    className="text-sm font-semibold mb-1.5 block"
                    style={{ color: "var(--masjid-green)" }}
                  >
                    Metode Pembayaran <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: "qris", label: "📱 QRIS", desc: "Scan QR Code" },
                      {
                        key: "bank",
                        label: "🏦 Transfer Bank",
                        desc: "Via ATM / Mobile Banking",
                      },
                    ].map((m) => (
                      <button
                        key={m.key}
                        onClick={() => setMetode(m.key)}
                        className="p-4 rounded-xl border text-left transition-all"
                        style={
                          metode === m.key
                            ? {
                                backgroundColor: "var(--masjid-green)",
                                borderColor: "var(--masjid-green)",
                              }
                            : {
                                backgroundColor: "var(--masjid-cream)",
                                borderColor: "#e5d9cc",
                              }
                        }
                      >
                        <p
                          className="font-bold text-sm"
                          style={{
                            color:
                              metode === m.key
                                ? "white"
                                : "var(--masjid-green)",
                          }}
                        >
                          {m.label}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{
                            color:
                              metode === m.key
                                ? "rgba(255,255,255,0.7)"
                                : "#9ca3af",
                          }}
                        >
                          {m.desc}
                        </p>
                      </button>
                    ))}
                  </div>

                  {/* Pilih Bank */}
                  {metode === "bank" && (
                    <div className="mt-3 flex flex-col gap-2">
                      {rekeningList.map((rek, i) => (
                        <button
                          key={i}
                          onClick={() => setBankDipilih(rek.noRek)}
                          className="p-4 rounded-xl border text-left transition-all"
                          style={
                            bankDipilih === rek.noRek
                              ? {
                                  backgroundColor: "rgba(26,61,43,0.08)",
                                  borderColor: "var(--masjid-green)",
                                }
                              : {
                                  backgroundColor: "white",
                                  borderColor: "#e5d9cc",
                                }
                          }
                        >
                          <p
                            className="font-bold text-sm"
                            style={{ color: "var(--masjid-green)" }}
                          >
                            {rek.bank}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            a.n. {rek.atasNama}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Ringkasan */}
                {nama && jumlah && metode && (
                  <div
                    className="rounded-xl p-4 mb-4 border"
                    style={{
                      backgroundColor: "var(--masjid-cream-dark)",
                      borderColor: "#e5d9cc",
                    }}
                  >
                    <p
                      className="text-xs font-semibold uppercase tracking-widest mb-3"
                      style={{ color: "var(--masjid-gold)" }}
                    >
                      Ringkasan Donasi
                    </p>
                    <div className="flex flex-col gap-1.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Nama</span>
                        <span
                          className="font-semibold"
                          style={{ color: "var(--masjid-green)" }}
                        >
                          {nama}
                        </span>
                      </div>
                      {deskripsi && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Keterangan</span>
                          <span
                            className="font-semibold"
                            style={{ color: "var(--masjid-green)" }}
                          >
                            {deskripsi}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-500">Jumlah</span>
                        <span
                          className="font-bold text-base"
                          style={{ color: "var(--masjid-green)" }}
                        >
                          {formatRupiah(jumlah)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Metode</span>
                        <span
                          className="font-semibold"
                          style={{ color: "var(--masjid-green)" }}
                        >
                          {metode === "qris" ? "QRIS" : `Transfer Bank`}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleLanjut}
                  className="w-full py-4 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                  style={{
                    backgroundColor: "var(--masjid-green)",
                    color: "white",
                  }}
                >
                  Lanjut ke Pembayaran →
                </button>
              </div>
            )}

            {/* Step 2 — Pembayaran */}
            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-gray-400 hover:text-gray-600 mb-4 flex items-center gap-1"
                >
                  ← Kembali
                </button>
                <h2
                  className="font-bold text-lg mb-2"
                  style={{ color: "var(--masjid-green)" }}
                >
                  {metode === "qris" ? "📱 Scan QRIS" : "🏦 Transfer Bank"}
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Silakan lakukan pembayaran sebesar{" "}
                  <span
                    className="font-bold"
                    style={{ color: "var(--masjid-green)" }}
                  >
                    {formatRupiah(jumlah)}
                  </span>
                </p>

                {/* QRIS */}
                {metode === "qris" && (
                  <div className="text-center">
                    <div className="bg-gray-50 rounded-2xl w-56 h-56 mx-auto flex items-center justify-center border-2 border-dashed border-gray-200 mb-4">
                      <div className="text-center">
                        <p className="text-4xl mb-2">📱</p>
                        <p className="text-xs text-gray-400">
                          Upload foto QRIS di sini
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">
                      Scan QR Code di atas menggunakan aplikasi apapun
                    </p>
                    <div
                      className="mt-4 p-3 rounded-xl text-sm font-bold"
                      style={{
                        backgroundColor: "var(--masjid-cream-dark)",
                        color: "var(--masjid-green)",
                      }}
                    >
                      Total: {formatRupiah(jumlah)}
                    </div>
                  </div>
                )}

                {/* Transfer Bank */}
                {metode === "bank" && (
                  <div className="flex flex-col gap-3">
                    {rekeningList
                      .filter((r) => r.noRek === bankDipilih)
                      .map((rek, i) => (
                        <div
                          key={i}
                          className="rounded-2xl p-5 border"
                          style={{ borderColor: "#e5d9cc" }}
                        >
                          <p className="text-xs text-gray-400 mb-1">
                            🏦 {rek.bank}
                          </p>
                          <p
                            className="text-2xl font-mono font-bold mb-1"
                            style={{ color: "var(--masjid-green)" }}
                          >
                            {rek.noRek}
                          </p>
                          <p className="text-xs text-gray-400 mb-3">
                            a.n. {rek.atasNama}
                          </p>
                          <div
                            className="flex items-center justify-between p-3 rounded-xl mb-3"
                            style={{
                              backgroundColor: "var(--masjid-cream-dark)",
                            }}
                          >
                            <span
                              className="text-sm font-bold"
                              style={{ color: "var(--masjid-green)" }}
                            >
                              Jumlah Transfer: {formatRupiah(jumlah)}
                            </span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(rek.noRek)}
                            className="w-full py-2 rounded-xl text-sm font-semibold transition-all"
                            style={{
                              backgroundColor: "var(--masjid-green)",
                              color: "white",
                            }}
                          >
                            {copied ? "✅ Tersalin!" : "Salin Nomor Rekening"}
                          </button>
                        </div>
                      ))}
                  </div>
                )}

                {/* Tombol Konfirmasi WA */}
                <button
                  onClick={handleKonfirmasiWA}
                  className="w-full mt-6 py-4 rounded-xl font-bold text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#25D366", color: "white" }}
                >
                  💬 Perlu konfirmasi pembayaran?
                </button>
              </div>
            )}

            {/* Step 3 — Selesai */}
            {step === 3 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                <p className="text-6xl mb-4">🎉</p>
                <h2
                  className="font-bold text-xl mb-2"
                  style={{ color: "var(--masjid-green)" }}
                >
                  Jazakallahu Khairan!
                </h2>
                <p className="text-gray-500 text-sm mb-2">
                  Konfirmasi donasi atas nama{" "}
                  <span className="font-bold">{nama}</span> telah dikirim ke
                  admin masjid.
                </p>
                <p className="text-gray-400 text-xs mb-6">
                  Semoga donasi Anda menjadi amal jariyah yang berkah. 🤲
                </p>
                <button
                  onClick={() => {
                    setStep(1);
                    setNama("");
                    setDeskripsi("");
                    setJumlah("");
                    setMetode("");
                    setBankDipilih(null);
                  }}
                  className="px-6 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                  style={{
                    backgroundColor: "var(--masjid-green)",
                    color: "white",
                  }}
                >
                  Donasi Lagi
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab Laporan */}
        {activeTab === "laporan" && (
          <LaporanKeuangan laporan={laporan} loading={loading} error={error} />
        )}
      </div>
    </div>
  );
}

export default Donasi;
