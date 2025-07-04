import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PpfKaplama: React.FC = () => (
  <>
    <Header />

    {/* ---------- Arka Plan Videosu ---------- */}
    <video className="hero-video" autoPlay muted loop playsInline>
      <source src={'/assets/assetsvideo.mp4'} type="video/mp4" />
      Tarayıcınız video etiketini desteklemiyor.
    </video>

    {/* ---------- HERO ---------- */}
    <section className="hero parallax">
      <h1>PPF Şeffaf Koruma Filmi</h1>
      <p>Aracınızın boyası için görünmez bir zırh.</p>
      <a href="#detaylar" className="button">
        Detayları Gör
      </a>
    </section>

    {/* ---------- DETAYLAR ---------- */}
    <section id="detaylar" className="hizmet-detay-section">
      <div className="detay-container">
        <div className="detay-header">
          <h2>Neden PPF Kaplama Yaptırmalısınız?</h2>
          <p>Aracınızın boyasını ilk günkü gibi korumanın en gelişmiş yolu.</p>
        </div>

        <div className="detay-content">
          {/* Sol görsel */}
          <div className="detay-image">
            <img
              src={'/assets/ppf-kaplama.jpg'}
              alt="PPF Kaplama Uygulaması"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/assets/oto-kaplama.jpg';
              }}
            />
          </div>

          {/* Sağ liste */}
          <div className="detay-listesi">
            {/* 1 — Görünmez Zırh */}
            <div className="detay-item">
              <div className="detay-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="detay-text">
                <h4>Görünmez Zırh</h4>
                <p>
                  Taş sekmesi, sürtme ve küçük çiziklere karşı aracınızın
                  orijinal boyasını fark edilmeyen bir katmanla korur.
                </p>
              </div>
            </div>

            {/* 2 — Kendi Kendini Yenileme */}
            <div className="detay-item">
              <div className="detay-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15.5 2.5a2.12 2.12 0 0 1 3 3L8 16H5v-3l10.5-10.5zM19.5 7.5l-3-3"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="detay-text">
                <h4>Kendi Kendini Yenileme</h4>
                <p>
                  Özel teknolojisi sayesinde, yüzeydeki ince çizikler ısı
                  (güneş veya sıcak su) yardımıyla kendi kendine kaybolur.
                </p>
              </div>
            </div>

            {/* 3 — Leke ve Kimyasal Direnci */}
            <div className="detay-item">
              <div className="detay-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 22a7 7 0 007-7c0-3.87-7-13-7-13s-7 9.13-7 13a7 7 0 007 7zM5 15l14-14"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="detay-text">
                <h4>Leke ve Kimyasal Direnci</h4>
                <p>
                  Asit yağmuru, kuş pisliği, böcek kalıntıları ve diğer
                  kimyasalların boyanıza zarar vermesini engeller.
                </p>
              </div>
            </div>

            {/* 4 — Uzun Ömürlü Parlaklık */}
            <div className="detay-item">
              <div className="detay-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L14.39 8.26L21 9.27L16.31 13.91L17.62 21L12 17.77L6.38 21L7.69 13.91L3 9.27L9.61 8.26L12 2Z"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="detay-text">
                <h4>Uzun Ömürlü Parlaklık</h4>
                <p>
                  PPF filmi, aracınızın orijinal boyasının parlaklığını ve
                  canlılığını korur, sararma yapmaz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </>
);

export default PpfKaplama;
