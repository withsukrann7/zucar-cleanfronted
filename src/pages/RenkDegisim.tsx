import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RenkDegisim: React.FC = () => (
  <>
    <Header />

    {/* ---------- Video ---------- */}
    <video className="hero-video" autoPlay muted loop playsInline>
      <source src={'/assets/assetsvideo.mp4'} type="video/mp4" />
      Tarayıcınız video etiketini desteklemiyor.
    </video>

    {/* ---------- HERO ---------- */}
    <section className="hero parallax">
      <h1>Aracınıza Yeni Bir Kimlik Kazandırın</h1>
      <p>Sınırsız renk seçeneği ile hayalinizdeki aracı yaratın.</p>
      <a href="#detaylar" className="button">
        Renkleri Keşfet
      </a>
    </section>

    {/* ---------- DETAYLAR ---------- */}
    <section id="detaylar" className="hizmet-detay-section">
      <div className="detay-container">
        <div className="detay-header">
          <h2>Neden Renk Değişim Kaplaması?</h2>
          <p>Aracınızı sıradanlıktan kurtarın ve tarzınızı yansıtın.</p>
        </div>

        <div className="detay-content">
          {/* Sol görsel */}
          <div className="detay-image">
            <img
              src={'assets/renk-degisimi.jpeg'}
              alt="Renk Değişim Kaplama"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/assets/oto-kaplama.jpg';
              }}
            />
          </div>

          {/* Sağ liste */}
          <div className="detay-listesi">
            {/* 1 */}
            <div className="detay-item">
              <div className="detay-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2.61a5.04 5.04 0 0 0-4.33 7.39L3 15v4h4l5-5.04a5.04 5.04 0 0 0 2.33-7.35A5.02 5.02 0 0 0 12 2.61zM7 17l-1-1 4-4 1 1-4 4z"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="detay-text">
                <h4>Geniş Renk Yelpazesi</h4>
                <p>
                  Binlerce renk ve doku (mat, parlak, metalik, krom)
                  seçeneğiyle aracınızı tamamen kişiselleştirin.
                </p>
              </div>
            </div>

            {/* 2 */}
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
                <h4>Orijinal Boya Koruması</h4>
                <p>
                  Kaplama, aracınızın orijinal boyasını UV ışınlarından,
                  küçük çiziklerden ve dış etkenlerden korur.
                </p>
              </div>
            </div>

            {/* 3 */}
            <div className="detay-item">
              <div className="detay-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M23 6L13.5 15.5L8.5 10.5L1 18"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 6h6v6"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="detay-text">
                <h4>Değerini Korur</h4>
                <p>
                  Orijinal boya zarar görmez; kaplama sökülebildiği için ikinci
                  el değerini korur.
                </p>
              </div>
            </div>

            {/* 4 */}
            <div className="detay-item">
              <div className="detay-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="detay-text">
                <h4>Hızlı ve Geri Dönüşümlü</h4>
                <p>
                  Boyamaya göre çok daha hızlı uygulanır ve istediğinizde
                  kolayca eski renginize dönebilirsiniz.
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

export default RenkDegisim;
