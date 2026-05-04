import { useState } from "react";

const arabesque = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.5' opacity='0.15'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z'/%3E%3Cpath d='M40 10 L70 40 L40 70 L10 40 Z'/%3E%3Ccircle cx='40' cy='40' r='15'/%3E%3Ccircle cx='40' cy='40' r='25'/%3E%3Cpath d='M40 0 L40 80 M0 40 L80 40'/%3E%3Cpath d='M15 15 L65 65 M65 15 L15 65'/%3E%3C/g%3E%3C/svg%3E")`;

const HARGA_EMAS = 1200000; // per gram, bisa diupdate
const NISAB_EMAS = 85; // gram
const NISAB_MAAL = HARGA_EMAS * NISAB_EMAS;
const HARGA_BERAS = 12000; // per kg
const FITRAH_KG = 2.7; // kg per jiwa

function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}

function KalkulatorMaal() {
  const [harta, setHarta] = useState("");
  const [hutang, setHutang] = useState("");
  const [hasil, setHasil] = useState(null);

  function hitung() {
    const hartaBersih = (parseFloat(harta) || 0) - (parseFloat(hutang) || 0);
    const wajibZakat = hartaBersih >= NISAB_MAAL;
    const zakatDibayar = wajibZakat ? hartaBersih * 0.025 : 0;
    setHasil({ hartaBersih, wajibZakat, zakatDibayar });
  }

  return (
    <div
      className="bg-white rounded-2xl border p-6"
      style={{ borderColor: "#e5d9cc" }}
    >
      <h3
        className="font-bold text-lg mb-1"
        style={{ color: "var(--masjid-green)" }}
      >
        💰 Zakat Maal
      </h3>
      <p className="text-xs text-gray-400 mb-5">
        Zakat harta yang telah mencapai nisab & haul (1 tahun)
      </p>

      <div className="flex flex-col gap-4 mb-5">
        <div>
          <label
            className="text-sm font-semibold mb-1.5 block"
            style={{ color: "var(--masjid-green)" }}
          >
            Total Harta (Rp)
          </label>
          <input
            type="number"
            placeholder="Masukkan total harta Anda"
            value={harta}
            onChange={(e) => setHarta(e.target.value)}
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
        <div>
          <label
            className="text-sm font-semibold mb-1.5 block"
            style={{ color: "var(--masjid-green)" }}
          >
            Total Hutang (Rp)
          </label>
          <input
            type="number"
            placeholder="Masukkan total hutang (jika ada)"
            value={hutang}
            onChange={(e) => setHutang(e.target.value)}
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
      </div>

      <div
        className="rounded-xl p-3 mb-4 text-xs text-gray-500 border"
        style={{
          backgroundColor: "var(--masjid-cream-dark)",
          borderColor: "#e5d9cc",
        }}
      >
        📊 Nisab: {formatRupiah(NISAB_MAAL)} (85gr emas ×{" "}
        {formatRupiah(HARGA_EMAS)}/gr) • Kadar: 2.5%
      </div>

      <button
        onClick={hitung}
        className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 mb-4"
        style={{ backgroundColor: "var(--masjid-green)", color: "white" }}
      >
        Hitung Zakat Maal
      </button>

      {hasil && (
        <div
          className="rounded-xl p-4 border"
          style={{
            backgroundColor: hasil.wajibZakat
              ? "rgba(26,61,43,0.05)"
              : "rgba(239,68,68,0.05)",
            borderColor: hasil.wajibZakat ? "var(--masjid-green)" : "#fca5a5",
          }}
        >
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Harta Bersih</span>
              <span
                className="font-bold"
                style={{ color: "var(--masjid-green)" }}
              >
                {formatRupiah(hasil.hartaBersih)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Nisab</span>
              <span
                className="font-bold"
                style={{ color: "var(--masjid-green)" }}
              >
                {formatRupiah(NISAB_MAAL)}
              </span>
            </div>
            <div className="h-px my-1" style={{ backgroundColor: "#e5d9cc" }} />
            <div className="flex justify-between items-center">
              <span
                className="font-bold"
                style={{
                  color: hasil.wajibZakat ? "var(--masjid-green)" : "#ef4444",
                }}
              >
                {hasil.wajibZakat ? "✅ Wajib Zakat" : "❌ Belum Wajib Zakat"}
              </span>
              {hasil.wajibZakat && (
                <span
                  className="font-bold text-base"
                  style={{ color: "var(--masjid-gold)" }}
                >
                  {formatRupiah(hasil.zakatDibayar)}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function KalkulatorFitrah() {
  const [jiwa, setJiwa] = useState("");
  const [metode, setMetode] = useState("uang");
  const [hasil, setHasil] = useState(null);

  function hitung() {
    const jumlahJiwa = parseInt(jiwa) || 0;
    const berasKg = jumlahJiwa * FITRAH_KG;
    const uang = berasKg * HARGA_BERAS;
    setHasil({ jumlahJiwa, berasKg, uang });
  }

  return (
    <div
      className="bg-white rounded-2xl border p-6"
      style={{ borderColor: "#e5d9cc" }}
    >
      <h3
        className="font-bold text-lg mb-1"
        style={{ color: "var(--masjid-green)" }}
      >
        🌾 Zakat Fitrah
      </h3>
      <p className="text-xs text-gray-400 mb-5">
        Zakat yang wajib dikeluarkan di bulan Ramadan
      </p>

      <div className="flex flex-col gap-4 mb-5">
        <div>
          <label
            className="text-sm font-semibold mb-1.5 block"
            style={{ color: "var(--masjid-green)" }}
          >
            Jumlah Jiwa (Tanggungan)
          </label>
          <input
            type="number"
            placeholder="Berapa orang yang ditanggung?"
            value={jiwa}
            onChange={(e) => setJiwa(e.target.value)}
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

        <div>
          <label
            className="text-sm font-semibold mb-1.5 block"
            style={{ color: "var(--masjid-green)" }}
          >
            Metode Pembayaran
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { key: "uang", label: "💵 Uang" },
              { key: "beras", label: "🌾 Beras" },
            ].map((m) => (
              <button
                key={m.key}
                onClick={() => setMetode(m.key)}
                className="py-2.5 rounded-xl text-sm font-semibold border transition-all"
                style={
                  metode === m.key
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
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className="rounded-xl p-3 mb-4 text-xs text-gray-500 border"
        style={{
          backgroundColor: "var(--masjid-cream-dark)",
          borderColor: "#e5d9cc",
        }}
      >
        📊 Standar: {FITRAH_KG} kg beras per jiwa • Harga beras:{" "}
        {formatRupiah(HARGA_BERAS)}/kg
      </div>

      <button
        onClick={hitung}
        className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 mb-4"
        style={{ backgroundColor: "var(--masjid-green)", color: "white" }}
      >
        Hitung Zakat Fitrah
      </button>

      {hasil && (
        <div
          className="rounded-xl p-4 border"
          style={{
            backgroundColor: "rgba(26,61,43,0.05)",
            borderColor: "var(--masjid-green)",
          }}
        >
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Jumlah Jiwa</span>
              <span
                className="font-bold"
                style={{ color: "var(--masjid-green)" }}
              >
                {hasil.jumlahJiwa} orang
              </span>
            </div>
            <div className="h-px my-1" style={{ backgroundColor: "#e5d9cc" }} />
            {metode === "beras" ? (
              <div className="flex justify-between items-center">
                <span
                  className="font-bold"
                  style={{ color: "var(--masjid-green)" }}
                >
                  Total Beras
                </span>
                <span
                  className="font-bold text-base"
                  style={{ color: "var(--masjid-gold)" }}
                >
                  {hasil.berasKg.toFixed(1)} kg
                </span>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span
                  className="font-bold"
                  style={{ color: "var(--masjid-green)" }}
                >
                  Total Uang
                </span>
                <span
                  className="font-bold text-base"
                  style={{ color: "var(--masjid-gold)" }}
                >
                  {formatRupiah(hasil.uang)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function KalkulatorPenghasilan() {
  const [gaji, setGaji] = useState("");
  const [penghasilanLain, setPenghasilanLain] = useState("");
  const [hasil, setHasil] = useState(null);

  const NISAB_PENGHASILAN = 698000; // nisab per bulan (setara 520kg beras)

  function hitung() {
    const totalPenghasilan =
      (parseFloat(gaji) || 0) + (parseFloat(penghasilanLain) || 0);
    const wajibZakat = totalPenghasilan >= NISAB_PENGHASILAN;
    const zakatDibayar = wajibZakat ? totalPenghasilan * 0.025 : 0;
    setHasil({ totalPenghasilan, wajibZakat, zakatDibayar });
  }

  return (
    <div
      className="bg-white rounded-2xl border p-6"
      style={{ borderColor: "#e5d9cc" }}
    >
      <h3
        className="font-bold text-lg mb-1"
        style={{ color: "var(--masjid-green)" }}
      >
        👔 Zakat Penghasilan
      </h3>
      <p className="text-xs text-gray-400 mb-5">
        Zakat dari penghasilan/profesi yang diterima setiap bulan
      </p>

      <div className="flex flex-col gap-4 mb-5">
        <div>
          <label
            className="text-sm font-semibold mb-1.5 block"
            style={{ color: "var(--masjid-green)" }}
          >
            Gaji / Pendapatan Utama (Rp/bulan)
          </label>
          <input
            type="number"
            placeholder="Masukkan gaji bulanan"
            value={gaji}
            onChange={(e) => setGaji(e.target.value)}
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
        <div>
          <label
            className="text-sm font-semibold mb-1.5 block"
            style={{ color: "var(--masjid-green)" }}
          >
            Pendapatan Lain (Rp/bulan)
          </label>
          <input
            type="number"
            placeholder="Bonus, freelance, dll (opsional)"
            value={penghasilanLain}
            onChange={(e) => setPenghasilanLain(e.target.value)}
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
      </div>

      <div
        className="rounded-xl p-3 mb-4 text-xs text-gray-500 border"
        style={{
          backgroundColor: "var(--masjid-cream-dark)",
          borderColor: "#e5d9cc",
        }}
      >
        📊 Nisab: {formatRupiah(NISAB_PENGHASILAN)}/bulan (setara 520kg beras) •
        Kadar: 2.5%
      </div>

      <button
        onClick={hitung}
        className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 mb-4"
        style={{ backgroundColor: "var(--masjid-green)", color: "white" }}
      >
        Hitung Zakat Penghasilan
      </button>

      {hasil && (
        <div
          className="rounded-xl p-4 border"
          style={{
            backgroundColor: hasil.wajibZakat
              ? "rgba(26,61,43,0.05)"
              : "rgba(239,68,68,0.05)",
            borderColor: hasil.wajibZakat ? "var(--masjid-green)" : "#fca5a5",
          }}
        >
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Total Penghasilan</span>
              <span
                className="font-bold"
                style={{ color: "var(--masjid-green)" }}
              >
                {formatRupiah(hasil.totalPenghasilan)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Nisab</span>
              <span
                className="font-bold"
                style={{ color: "var(--masjid-green)" }}
              >
                {formatRupiah(NISAB_PENGHASILAN)}
              </span>
            </div>
            <div className="h-px my-1" style={{ backgroundColor: "#e5d9cc" }} />
            <div className="flex justify-between items-center">
              <span
                className="font-bold"
                style={{
                  color: hasil.wajibZakat ? "var(--masjid-green)" : "#ef4444",
                }}
              >
                {hasil.wajibZakat ? "✅ Wajib Zakat" : "❌ Belum Wajib Zakat"}
              </span>
              {hasil.wajibZakat && (
                <span
                  className="font-bold text-base"
                  style={{ color: "var(--masjid-gold)" }}
                >
                  {formatRupiah(hasil.zakatDibayar)}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Zakat() {
  const [activeTab, setActiveTab] = useState("maal");

  const tabs = [
    { key: "maal", label: "💰 Zakat Maal" },
    { key: "fitrah", label: "🌾 Zakat Fitrah" },
    { key: "penghasilan", label: "👔 Zakat Penghasilan" },
  ];

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
            Masjid Al-Muwahhidin
          </p>
          <h1 className="text-4xl font-bold mb-2">Kalkulator Zakat</h1>
          <p className="text-white/70 text-sm">
            Hitung kewajiban zakat Anda dengan mudah dan akurat
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-6 pt-8 pb-16">
        {/* Info Nisab */}
        <div
          className="rounded-2xl p-4 mb-6 border relative overflow-hidden"
          style={{
            backgroundColor: "var(--masjid-green)",
            borderColor: "var(--masjid-green)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundImage: arabesque, backgroundSize: "80px 80px" }}
          />
          <div className="relative flex items-center gap-3">
            <span className="text-2xl">📌</span>
            <div>
              <p className="text-white font-semibold text-sm">
                Catatan Penting
              </p>
              <p className="text-white/70 text-xs mt-0.5">
                Perhitungan berdasarkan harga emas Rp{" "}
                {HARGA_EMAS.toLocaleString("id-ID")}/gr. Konsultasikan dengan
                ustadz untuk kepastian hukum.
              </p>
            </div>
          </div>
        </div>

        {/* Tab */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5 flex gap-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all"
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

        {/* Kalkulator */}
        {activeTab === "maal" && <KalkulatorMaal />}
        {activeTab === "fitrah" && <KalkulatorFitrah />}
        {activeTab === "penghasilan" && <KalkulatorPenghasilan />}

        {/* CTA Donasi */}
        <div
          className="mt-6 rounded-2xl p-5 text-center border"
          style={{
            backgroundColor: "var(--masjid-cream-dark)",
            borderColor: "#e5d9cc",
          }}
        >
          <p
            className="text-sm font-semibold mb-1"
            style={{ color: "var(--masjid-green)" }}
          >
            Sudah hitung zakat? Tunaikan sekarang! 🤲
          </p>
          <p className="text-xs text-gray-500 mb-3">
            Salurkan zakat Anda melalui Masjid Al-Muwahhidin
          </p>
          <a
            href="/donasi"
            className="inline-block px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
            style={{ backgroundColor: "var(--masjid-green)", color: "white" }}
          >
            💝 Bayar Zakat via Donasi
          </a>
        </div>
      </div>
    </div>
  );
}

export default Zakat;
