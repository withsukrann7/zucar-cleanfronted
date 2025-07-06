import React, { useEffect, useState, ChangeEvent } from "react";
import './AdminPanel.css'

interface Kayit {
  plakaNo: string;
  garanti: {
    baslangic: string;
    bitis: string;
  };
  notlar: string;
  islemler: string[];
  tarih: string;
  custom?: boolean;
}

const initialServices = [
  "Cam Filmi Hizmeti",
  "Seramik Kaplama Hizmeti",
  "PPF Kaplama Hizmeti",
  "Renk Değişim Hizmeti",
];

const AdminPanel: React.FC = () => {
  const BASE_CODE_NUM = 2378561284420001n;  // 2378 5612 8442 0001
  const BASE_CODE_FMT = "2378 5612 8442 0001";
  
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
  const [editMode, setEditMode] = useState(false);

  const [plakaNo, setPlakaNo] = useState("");
  const [garantiBaslangic, setGarantiBaslangic] = useState("");
  const [garantiBitis, setGarantiBitis] = useState("");
  const [notlar, setNotlar] = useState("");

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

  const calculateNextAuto = (entries: [string, Kayit][]) => {
    if (!entries.length) return BASE_CODE_FMT;
    const used = new Set(entries.map(([k]) => k.replace(/\s/g, "")));
    const lastAutoNumeric = entries
      .filter(([, v]) => v.custom === false)
      .reduce<bigint>((max, [k]) => {
        const num = BigInt(k.replace(/\s/g, ""));
        return num > max ? num : max;
      }, 0n);

    let next = lastAutoNumeric >= BASE_CODE_NUM
      ? lastAutoNumeric + 1n
      : BASE_CODE_NUM;

    while (used.has(next.toString().padStart(16, "0"))) next += 1n;

    return formatKod(next.toString().padStart(16, "0"));
  };

  useEffect(() => {
    if (token) {
      kayitlariGetir();
    }
  }, [token]);

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

  const kaydet = () => {
    const rawCode = code.replace(/\s/g, "");
    if (rawCode.length !== 16) return alert("Kod 16 haneli olmalı!");
    if (selectedServices.size === 0) return alert("En az bir hizmet seçin.");

    if (
      plakaNo.trim() === "" ||
      garantiBaslangic.trim() === "" ||
      garantiBitis.trim() === ""
    ) {
      return alert("Plaka, garanti başlangıç ve bitiş tarihleri zorunludur.");
    }

    const body = {
      plakaNo,
      garantiBaslangic,
      garantiBitis,
      notlar,
      islemler: Array.from(selectedServices),
      custom: isCustom,
    };

    const url = editMode ? `https://zucar-backend-ndh4.onrender.com/kayit/${rawCode}` : "https://zucar-backend-ndh4.onrender.com/kaydet";

    fetch(url, {
      method: editMode ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editMode ? body : { kod: rawCode, ...body }),
    })
      .then((r) => r.json())
      .then(() => {
        setSuccessVisible(true);
        setTimeout(() => setSuccessVisible(false), 1500);
        setIsCustom(false);
        setSelectedServices(new Set());
        setEditMode(false);
        setCode(calculateNextAuto(records));
        setPlakaNo("");
        setGarantiBaslangic("");
        setGarantiBitis("");
        setNotlar("");
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
        const next = calculateNextAuto(entries);
        setCode(next);
        if (entries.length) {
          setAutoCodeInfo(`Son kayıtlı müşteri kodu: ${entries[0][0]}`);
        }
      })
      .catch((err) => console.error("Kayıtlar getirilemedi:", err));
  };

  const handleEdit = (kod: string) => {
    const kayit = records.find(([k]) => k === kod);
    if (!kayit) return;
    const v = kayit[1];
    setCode(kod);
    setIsCustom(true);
    setEditMode(true);
    setPlakaNo(v.plakaNo);
    setGarantiBaslangic(v.garanti?.baslangic || "");
    setGarantiBitis(v.garanti?.bitis || "");
    setNotlar(v.notlar);
    setSelectedServices(new Set(v.islemler));
  };

  const handleDelete = (kod: string) => {
    if (!window.confirm("Bu kaydı silmek istediğinize emin misiniz?")) return;
    fetch(`https://zucar-backend-ndh4.onrender.com/kayit/${kod}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        kayitlariGetir();
      })
      .catch(() => alert("Silme başarısız oldu."));
  };

  const formatDateTime = (iso: string) =>
    new Date(iso).toLocaleString("tr-TR", {
      year:  "numeric",
      month: "2-digit",
      day:   "2-digit",
      hour:  "2-digit",
      minute:"2-digit"
  });

  const formatDateTimeForInsurance = (iso: string) => 
    new Date(iso).toLocaleString("tr-TR", {
      year:  "numeric",
      month: "2-digit",
      day:   "2-digit",
    })
  

  return (
    <>
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

          <div className="form-group">
              <label>Plaka No:</label>
              <input
                type="text"
                value={plakaNo}
                onChange={(e) => setPlakaNo(e.target.value)}
                placeholder="34 ABC 67"
              />

              <label>Garanti Başlangıç Tarihi: (<b>ay-gün-yıl</b> cinsinden)</label>
              <input
                type="date"
                value={garantiBaslangic}
                onChange={(e) => setGarantiBaslangic(e.target.value)}
              />

              <label>Garanti Bitiş Tarihi: (<b>ay-gün-yıl</b> cinsinden)</label>
              <input
                type="date"
                value={garantiBitis}
                onChange={(e) => setGarantiBitis(e.target.value)}
              />

              <label>Notlar:</label>
              <textarea
                style={{fontFamily: 'Poppins'}}
                value={notlar}
                onChange={(e) => setNotlar(e.target.value)}
                placeholder="Eklemek istediğiniz notlar"
              />
            </div>

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
                  <th>Plaka</th>
                  <th>Garanti</th>
                  <th>Hizmetler</th>
                  <th>Notlar</th>
                  <th>Tarih</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {records.slice(0, 5).map(([kod, v]) => (
                  <tr key={kod}>
                    <td>{kod}</td>
                    <td>{v.plakaNo}</td>
                    <td>
                      <td>{formatDateTimeForInsurance(v.garanti?.baslangic)} → {formatDateTimeForInsurance(v.garanti?.bitis)}</td>
                    </td>
                    <td>{(v.islemler || []).join(", ")}</td>
                    <td>{v.notlar || "-"}</td>
                    <td>{formatDateTime(v.tarih)}</td>
                    <td>
                      <button className="btn-edit" onClick={() => handleEdit(kod)}>Düzenle</button>
                      <button className="btn-delete" onClick={() => handleDelete(kod)}>Sil</button>
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
            className="modal-content fullscreen"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Tüm Hizmet Kayıtları</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>×</button>
            </div>

            <div className="modal-body">
              <table className="modal-table">
                <thead>
                  <tr>
                    <th>Kod</th>
                    <th>Plaka</th>
                    <th>Garanti</th>
                    <th>Hizmetler</th>
                    <th>Notlar</th>
                    <th>Tarih</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map(([kod, v]) => (
                    <tr key={kod}>
                      <td>{kod}</td>
                      <td>{v.plakaNo}</td>
                      <td>{formatDateTimeForInsurance(v.garanti?.baslangic)} → {formatDateTimeForInsurance(v.garanti?.bitis)}</td>
                      <td>{(v.islemler || []).join(", ")}</td>
                      <td>{v.notlar || "-"}</td>
                      <td>{formatDateTime(v.tarih)}</td>
                      <td>
                        <button className="btn-edit" onClick={() => handleEdit(kod)}>Düzenle</button>
                        <button className="btn-delete" onClick={() => handleDelete(kod)}>Sil</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default AdminPanel;
