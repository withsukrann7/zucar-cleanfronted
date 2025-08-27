import React, { useRef, useState, useEffect } from 'react';

/* ---------- Mini log helpers ---------- */
const log = (...m: any[]) =>
  console.log('%c[KOD-SORGU]', 'color:#ff0000;font-weight:bold', ...m);
const warn = (...m: any[]) =>
  console.warn('%c[KOD-SORGU]', 'color:#ff8800;font-weight:bold', ...m);
const err = (...m: any[]) =>
  console.error('%c[KOD-SORGU]', 'color:#ff0000;font-weight:bold', ...m);

/* ---------- Veri tipleri ---------- */
type ApiSuccess = {
  status: 'success' | 'warning' | 'error';
  title: string;
  message: string;
  details?: Record<string, string>;
};
type Result =
  | { type: 'placeholder' }
  | { type: 'error'; message: string }
  | { type: 'success'; data: ApiSuccess };

const KodSorgulamaBox: React.FC = () => {
  /* ---------- State ---------- */
  const [fields, setFields] = useState<string[]>(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result>({ type: 'placeholder' });

  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const fullCode = fields.join('');
  const isFull = fullCode.length === 16;

  /* ---------- Handlers ---------- */
  const handleChange = (idx: number, raw: string) => {
    const clean = raw.replace(/\D/g, '').slice(0, 4);
    setFields((prev) => {
      const next = [...prev];
      next[idx] = clean;
      return next;
    });
    if (clean.length === 4 && idx < 3) refs[idx + 1].current?.focus();
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !fields[idx] && idx > 0) {
      refs[idx - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 16);
    const next = [0, 1, 2, 3].map((i) => pasted.slice(i * 4, (i + 1) * 4));
    setFields(next);
    refs[next.findIndex((v) => v.length < 4) === -1 ? 3 : next.findIndex((v) => v.length < 4)].current?.focus();
  };

  const handleClear = () => {
    setFields(['', '', '', '']);
    refs[0].current?.focus();
    setResult({ type: 'placeholder' });
  };

 const handleQuery = () => {

  /* 1️⃣ 16 hane kontrolü */
  if (!isFull) {
    setResult({
      type: 'error',
      message: 'Lütfen 16 haneli kodu tam olarak girin',
    });
    return;
  }

  setLoading(true);
  setResult({ type: 'placeholder' });

  fetch(`https://zucar-backend-ndh4.onrender.com/kod-sorgula/${fullCode}`)
    .then((res) => {
      if (!res.ok) throw new Error('Kod bulunamadı');
      return res.json() as Promise<unknown>;  /* ✅ fetch generic yok, assert var */
    })
    .then((raw) => {
      const { islemler = [], plakaNo, garanti = {}, notlar } = raw as any;
      const {baslangic, bitis} = garanti;

      const details: Record<string, string> = {
        ...(Array.isArray(islemler)
          ? islemler.reduce<Record<string, string>>((acc, islem) => {
              acc[islem] = 'Yapıldı';
              return acc;
            }, {})
          : {}),
        ...(plakaNo ? { 'Plaka': plakaNo } : {}),
        ...(baslangic && bitis
          ? {
              'Garanti Süresi': `${new Date(baslangic).toLocaleDateString('tr-TR')} → ${new Date(bitis).toLocaleDateString('tr-TR')}`
            }
          : {}),
        ...(notlar ? { 'Notlar': notlar } : {}),
      };

      setResult({
        type: 'success',
        data: {
          status: 'success',
          title: 'Garanti Kayıtlı!',
          message: `${fullCode} numaralı kayıt bilgileri aşağıdaki gibidir.`,
          details,
        },
      });
    })

    .catch((e: Error) => {
      err('Fetch error:', e.message);
      setResult({
        type: 'error',
        message: 'Kod bulunamadı. Lütfen kartınızdaki kodu kontrol edin.',
      });
    })
    .finally(() => setLoading(false));
};


  /* İlk render – odak */
  useEffect(() => {
    refs[0].current?.focus({ preventScroll: true });
  }, []);

  /* ---------- Render helpers ---------- */
  const renderResult = () => {
    if (result.type === 'placeholder')
      return (
        <div className="result-placeholder">
          <div className="placeholder-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="#666"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p>Kodunuzu girip sorgulayın</p>
        </div>
      );

    if (result.type === 'error')
      return (
        <div className="result-error">
          <div className="result-icon">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#ff4444"
                strokeWidth="2"
              />
              <path
                d="M15 9L9 15M9 9L15 15"
                stroke="#ff4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3>{result.message}</h3>
        </div>
      );

    const { status, title, message, details = {} } = result.data;
    const entries = Object.entries(details);
    const statusColor = status === 'success' ? '#00ff88' : status === 'warning' ? '#ffaa00' : '#ff4444';

    return (
      <div className={`result-${status}`}>
        <div className="result-icon">
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
            {status === 'success' && (
              <>
                <path d="M9 12L11 14L15 10" stroke={statusColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={statusColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </>
            )}
            {status === 'warning' && (
              <>
                <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.66 21H20.34A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" stroke={statusColor} strokeWidth="2" />
                <path d="M12 9V13M12 17H12.01" stroke={statusColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </>
            )}
            {status === 'error' && (
              <>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={statusColor} strokeWidth="2" />
                <path d="M15 9L9 15M9 9L15 15" stroke={statusColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </>
            )}
          </svg>
        </div>
        <h3>{title}</h3>
        <p>{message}</p>
        {entries.length > 0 && (
          <div className="result-details">
            <h4 style={{ textAlign: 'center', fontSize: 18 }}>HİZMET DETAYLARI</h4>
            <ul>
              {entries.map(([k, v]) => (
                <li key={k}>
                  <strong>{k}:</strong> {v}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  /* ---------- JSX ---------- */
  return (
    <section id="kod-sorgulama" className="kod-sorgulama-section">
      <div className="kod-sorgulama-container">
        {/* --------- Header --------- */}
        <div className="kod-sorgulama-header">
          <div className="header-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#ff0000" strokeWidth="2" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" stroke="#ff0000" strokeWidth="2" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="#ff0000" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </div>
          <h2>Garanti Durumu Sorgulama</h2>
          <p>Kartınızdaki 16 haneli kodu girerek işleminizin durumunu öğrenin</p>
        </div>

        {/* --------- Input & Actions --------- */}
        <div className="kod-sorgulama-content">
          <div className="kod-input-container">
            <div className="kod-input-wrapper">
              <div className="kod-input-fields">
                {fields.map((v, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={4}
                    className="kod-field"
                    placeholder="0000"
                    value={v}
                    ref={refs[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={handlePaste}
                  />
                ))}
              </div>
              <div className="kod-input-line" />
            </div>

            <div className="kod-actions">
              <button type="button" className="sorgula-btn" onClick={handleQuery} disabled={loading}>
                <span className="btn-text">{loading ? 'Sorgulanıyor...' : 'Sorgula'}</span>
                <span className="btn-icon">
                  {loading ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="spinning">
                      <path
                        d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path
                        d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
              </button>

              <button type="button" className="temizle-btn" onClick={handleClear}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* --------- Result --------- */}
          <div className="kod-result">{renderResult()}</div>
        </div>

        {/* --------- Alt özellikler (statik) --------- */}
        <div className="kod-sorgulama-features">
          {[
            ['M12 6V12L16 14', 'Anında Sonuç'],
            [
              'M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z',
              'Güvenli Sorgulama',
            ],
            ['M13 2L3 14H12L11 22L21 10H12L13 2Z', '7/24 Erişim'],
          ].map(([d, text], i) => (
            <div className="feature-item" key={i}>
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ff0000" strokeWidth="2" />
                  <path d={d} stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KodSorgulamaBox;
