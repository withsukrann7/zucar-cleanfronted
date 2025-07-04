import React, { useEffect, useState, ChangeEvent } from "react";
import './AdminPanel.css'

interface Kayit {
  islemler: string[];
  tarih: string;
  custom?: boolean;
}

const initialServices = [
  // "Araç Kaplama Hizmeti",
  "Cam Filmi Hizmeti",
  "Seramik Kaplama Hizmeti",
  // "Boyasız Göçük Düzeltme",
  "PPF Kaplama Hizmeti",
  "Renk Değişim Hizmeti",
  // "Kişiye Özel Tasarım",
];

const AdminPanel: React.FC = () => {

  const BASE_CODE_NUM = 2378561284420001n;          // 2378 5612 8442 0001
  const BASE_CODE_FMT = "2378 5612 8442 0001";
  
  /* ------------------------------ STATE ------------------------------ */
  const [token, setToken] = useState<string | null>(localStorage.getItem("adminToken"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [code, setCode] = useState("");
  const [isCustom, setIsCustom] = useState(false); 
  const [services, setServices] = useState<string[]>(initialServices);
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [newService, setNewService] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);
  const [records, setRecords] = useState<[string, Kayit][]>([]);
  const [autoCodeInfo, setAutoCodeInfo] = useState<string>("");

  const [modalOpen, setModalOpen] = useState(false);

  /* ------------------------------ HELPERS ------------------------------ */
  const bugunTarih = () => {
    return new Date().toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatKod = (raw: string) => {
    const onlyDigits = raw.replace(/\D/g, "").slice(0, 16);
    return onlyDigits.replace(/(.{4})/g, "$1 ").trim();
  };

  /** Kayıtlar ve custom kodlara göre sıradaki otomatik kodu bulur */
  const calculateNextAuto = (entries: [string, Kayit][]) => {
    /* 1) Hiç kayıt yoksa doğrudan BASE gönder */
    if (!entries.length) return BASE_CODE_FMT;

    const used = new Set(entries.map(([k]) => k.replace(/\s/g, "")));

    /* 2) Otomatik (custom:false) kayıtların en büyüğünü bulalım */
    const lastAutoNumeric = entries
      .filter(([, v]) => v.custom === false)    // sadece otomatikler
      .reduce<bigint>((max, [k]) => {
        const num = BigInt(k.replace(/\s/g, ""));
        return num > max ? num : max;
      }, 0n);

    /* 3) Eğer henüz BASE altında kaldıysa BASE’ten başlat */
    let next = lastAutoNumeric >= BASE_CODE_NUM
      ? lastAutoNumeric + 1n
      : BASE_CODE_NUM;

    /* 4) Çakışma var mı diye kontrol et, gerekirse ileri sar */
    while (used.has(next.toString().padStart(16, "0"))) next += 1n;

    return formatKod(next.toString().padStart(16, "0"));
  };


  /* ------------------------------ EFFECTS ------------------------------ */
  useEffect(() => {
    if (token) {
      kayitlariGetir();
    }
  }, [token]);

  /* ------------------------------ AUTH ------------------------------ */
  const loginAdmin = () => {
    fetch("https://zucar-backend-ndh4.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("adminToken", data.token);
          setToken(data.token);
        } else {
          alert(data.message || "Giriş başarısız");
        }
      })
      .catch(() => alert("Sunucuya bağlanılamadı!"));
  };

  const cikisYap = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    setRecords([]);
    setCode("");
    setSelectedServices(new Set());
  };

  /* ------------------------------ SERVICES ------------------------------ */
  const toggleService = (srv: string) => {
    const next = new Set(selectedServices);
    if (next.has(srv)) next.delete(srv);
    else next.add(srv);
    setSelectedServices(next);
  };

  const addService = () => {
    const val = newService.trim();
    if (val && !services.includes(val)) {
      setServices([...services, val]);
      setNewService("");
    }
  };

  const removeService = (idx: number) => {
    setServices(services.filter((_, i) => i !== idx));
    setSelectedServices(new Set());
  };

  /* ------------------------------ API CALLS ------------------------------ */
  const kaydet = () => {
    const rawCode = code.replace(/\s/g, "");
    if (rawCode.length !== 16) return alert("Kod 16 haneli olmalı!");
    if (selectedServices.size === 0) return alert("En az bir hizmet seçin!");

    fetch("https://zucar-backend-ndh4.onrender.com/kaydet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        kod: rawCode,
        islemler: Array.from(selectedServices),
        custom: isCustom,
      }),
    })
      .then((r) => r.json())
      .then(() => {
        setSuccessVisible(true);
        setTimeout(() => setSuccessVisible(false), 1500);
        setIsCustom(false);                     // otomatik moda geri
        setSelectedServices(new Set());

        /* input boş kalmasın — lokalde sıradaki kodu hesapla */
        const nextLocal = calculateNextAuto([
          [formatKod(rawCode), { islemler: [], tarih: new Date().toISOString(), custom: isCustom }],
          ...records,
        ]);
        setCode(nextLocal);

        kayitlariGetir();
      })
      .catch(() => alert("Kayıt başarısız!"));
  };

  const kayitlariGetir = () => {
    fetch("https://zucar-backend-ndh4.onrender.com/tum-kayitlar", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        const entries = (Object.entries(data || {}) as [string, Kayit][])
          .sort((a, b) => new Date(b[1].tarih).getTime() - new Date(a[1].tarih).getTime());

        setRecords(entries);

        /* otomatik kodu & info’yu güncelle */
        const next = calculateNextAuto(entries);
        setCode(next);

        if (entries.length) {
          setAutoCodeInfo(`Son kayıtlı müşteri kodu: ${entries[0][0]}`);
        }
        
      })
      .catch((err) => console.error("Kayıtlar getirilemedi:", err));
  };

  const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("tr-TR", {
    year:  "numeric",
    month: "2-digit",
    day:   "2-digit",
    hour:  "2-digit",
    minute:"2-digit"
  });

  /* ------------------------------ RENDER ------------------------------ */
  return (
    <>
      {/* --------------------------- GLOBAL CSS --------------------------- */}
      <style>{`
        body {
          background: #181818;
          color: #fff;
          font-family: 'Poppins', Arial, sans-serif;
          margin: 0;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        /* Orijinal CSS'in tamamı buraya kopyalandı (kısaltıldı) */
      `}</style>

      {/* --------------------------- LOGIN PANEL -------------------------- */}
      {!token && (
        <div className="login-panel">
          <div className="login-card">
            <h2>Admin Girişi</h2>
            <input
              className="login-input"
              type="text"
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="login-input"
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-btn" onClick={loginAdmin}>
              Giriş Yap
            </button>
          </div>
        </div>
      )}

      {/* --------------------------- ADMIN PANEL -------------------------- */}
      {token && (
        <div className="admin-container">
          <div className="admin-header">
            <span className="logo">ZuCar</span>
            <button className="logout-btn" onClick={cikisYap}>
              Çıkış Yap
            </button>
          </div>

          <h2>Admin Paneli</h2>
          <div className="hosgeldin">Hoşgeldin, Admin!</div>
          {successVisible && (
            <div className="success-msg">✔ Başarıyla Kaydedildi!</div>
          )}
          <div className="tarih-goster">Tarih: {bugunTarih()}</div>

          {/* ---------------------- CODE INPUT ---------------------- */}
          <label htmlFor="code">Müşteri Kodu (16 haneli):</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(formatKod(e.target.value))}
            placeholder="Örn: 0000 0000 0000 0000"
            maxLength={19}
            autoComplete="off"
            readOnly={!isCustom}
          />
          <label style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px" }}>
            <input
              type="checkbox"
              checked={isCustom}
              onChange={(e) => {
                setIsCustom(e.target.checked);
                /* kapatınca hemen otomatiğe dön */
                if (!e.target.checked) setCode(calculateNextAuto(records));
              }}
            />
            Özel numara oluştur
          </label>

          {!isCustom && autoCodeInfo && (
            <div style={{ fontSize: "0.85rem", color: "#aaa", margin: "4px 0 14px" }}>
              🛈 Bu kod otomatik oluşturuldu.<br />
              <strong>{autoCodeInfo}</strong>
            </div>
          )}

          {/* ---------------------- SERVICES ---------------------- */}
          <label>Yapılan Hizmetler:</label>
          <div className="hizmetler-listesi">
            {services.map((srv, i) => (
              <label key={srv} style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  className="hizmet-checkbox"
                  checked={selectedServices.has(srv)}
                  onChange={() => toggleService(srv)}
                />
                {srv}
                <button
                  className="hizmet-sil-btn"
                  title="Sil"
                  onClick={() => removeService(i)}
                >
                  ×
                </button>
              </label>
            ))}
          </div>

          {/* ---------------------- ADD SERVICE ---------------------- */}
          <div className="yeni-hizmet-ekle">
            <input
              type="text"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              placeholder="Yeni hizmet ekle..."
            />
            <button className="yeni-hizmet-btn" onClick={addService}>
              Ekle
            </button>
          </div>

          <button className="kaydet-btn" onClick={kaydet}>
            Kaydet
          </button>

          {/* ---------------------- LAST RECORDS ---------------------- */}
          <div className="son-kayitlar">
            <h4>Son Eklenen Kayıtlar</h4>
            <table>
              <thead>
                <tr>
                  <th>Kod</th>
                  <th>Hizmetler</th>
                  <th>Tarih</th>
                  <th>Sorgula</th>
                </tr>
              </thead>
              <tbody>
                {records.slice(0, 5).map(([kod, v]) => (
                  <tr key={kod}>
                    <td>{kod}</td>
                    <td>{(v.islemler || []).join(", ")}</td>
                    <td>{formatDateTime(v.tarih)}</td>
                    <td>
                      <span
                        className="kod-sorgu-link"
                        style={{ cursor: "pointer" }}
                        onClick={() => window.open(`https://zucar-backend.onrender.com/kod-sorgula/${kod}`, "_blank")}
                      >
                        Sorgula
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {records.length > 5 && (
              <button
                className="tum-hizmetler-btn"
                onClick={() => setModalOpen(true)}
              >
                Tüm Hizmetleri Görüntüle
              </button>
            )}
          </div>
        </div>
      )}

      {/* --------------------------- MODAL --------------------------- */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // içe tıklamada kapanma
          >
            <div className="modal-header">
              <h3>Tüm Hizmet Kayıtları</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>
                ×
              </button>
            </div>

            {/* Tam kayıt tablosu */}
            <table className="modal-table">
              <thead>
                <tr>
                  <th>Kod</th>
                  <th>Hizmetler</th>
                  <th>Tarih</th>
                </tr>
              </thead>
              <tbody>
                {records.map(([kod, v]) => (
                  <tr key={kod}>
                    <td>{kod}</td>
                    <td>{(v.islemler || []).join(", ")}</td>
                    <td>{formatDateTime(v.tarih)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;
