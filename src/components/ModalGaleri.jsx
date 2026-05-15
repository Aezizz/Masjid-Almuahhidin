import { useState, useEffect } from "react";

export function ModalGaleri({ judul, deskripsi, icon, fotos, onClose }) {
  const [aktif, setAktif] = useState(0);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setAktif((p) => (p + 1) % fotos.length);
      if (e.key === "ArrowLeft")
        setAktif((p) => (p - 1 + fotos.length) % fotos.length);
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "auto";
    };
  }, [fotos.length, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden"
        style={{
          backgroundColor: "rgba(15, 25, 18, 0.92)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(201,168,76,0.25)",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative gold glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(201,168,76,0.6), transparent)",
          }}
        />

        {/* Header */}
        <div
          className="px-6 pt-6 pb-4 border-b"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {/* Icon dengan stagger */}
              {icon && (
                <div
                  className="stagger-item stagger-1 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    backgroundColor: "rgba(201,168,76,0.15)",
                    border: "1px solid rgba(201,168,76,0.25)",
                  }}
                >
                  {icon}
                </div>
              )}
              <div>
                <p className="stagger-item stagger-2 font-bold text-white text-lg leading-tight">
                  {judul}
                </p>
                {deskripsi && (
                  <p
                    className="stagger-item stagger-3 text-xs mt-0.5"
                    style={{ color: "rgba(201,168,76,0.7)" }}
                  >
                    {deskripsi}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="stagger-item stagger-1 w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200 flex-shrink-0"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              ✕
            </button>
          </div>

          {/* Counter */}
          <p
            className="stagger-item stagger-4 text-xs mt-3"
            style={{ color: "rgba(201,168,76,0.6)" }}
          >
            📷 {aktif + 1} / {fotos.length} foto
          </p>
        </div>

        {/* Foto Utama */}
        <div
          className="stagger-item stagger-3 relative bg-black overflow-hidden"
          style={{ aspectRatio: "16/9" }}
        >
          <img
            src={fotos[aktif]?.foto || fotos[aktif]}
            alt={fotos[aktif]?.keterangan || judul}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />

          {/* Prev / Next */}
          {fotos.length > 1 && (
            <>
              <button
                onClick={() =>
                  setAktif((p) => (p - 1 + fotos.length) % fotos.length)
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-200 hover:scale-110"
                style={{
                  backgroundColor: "rgba(0,0,0,0.6)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "white",
                }}
              >
                ‹
              </button>
              <button
                onClick={() => setAktif((p) => (p + 1) % fotos.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-200 hover:scale-110"
                style={{
                  backgroundColor: "rgba(0,0,0,0.6)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "white",
                }}
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Keterangan foto */}
        {fotos[aktif]?.keterangan && (
          <div
            className="px-6 py-3 border-t"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <p className="text-white/60 text-xs">{fotos[aktif].keterangan}</p>
          </div>
        )}

        {/* Thumbnail */}
        {fotos.length > 1 && (
          <div
            className="stagger-item stagger-5 flex gap-2 px-6 py-4 overflow-x-auto border-t"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            {fotos.map((item, i) => (
              <button
                key={i}
                onClick={() => setAktif(i)}
                className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden transition-all duration-200"
                style={{
                  border:
                    i === aktif
                      ? "2px solid var(--masjid-gold)"
                      : "2px solid rgba(255,255,255,0.1)",
                  opacity: i === aktif ? 1 : 0.5,
                  transform: i === aktif ? "scale(1.05)" : "scale(1)",
                }}
              >
                <img
                  src={item?.foto || item}
                  alt={item?.keterangan || ""}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Footer tombol */}
        <div className="stagger-item stagger-6 px-6 pb-6 pt-2">
          <button
            onClick={onClose}
            className="w-full h-11 rounded-xl font-bold text-sm transition-all duration-300 hover:opacity-85"
            style={{
              backgroundColor: "rgba(201,168,76,0.15)",
              color: "var(--masjid-gold)",
              border: "1px solid rgba(201,168,76,0.3)",
            }}
          >
            Tutup
          </button>
        </div>

        {/* Bottom gold glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)",
          }}
        />
      </div>
    </div>
  );
}
