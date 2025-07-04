import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AracKaplama: React.FC = () => (
  <>
    <Header />

    {/* ---------- Video Arka Planı ---------- */}
    <video className="hero-video" autoPlay muted loop playsInline>
      <source src={'/assets/assetsvideo.mp4'} type="video/mp4" />
      Tarayıcınız video etiketini desteklemiyor.
    </video>

    {/* ---------- HERO ---------- */}
    <section className="hero parallax">
      <h1>Araç Kaplama Hizmeti</h1>
      <p>Aracınıza yepyeni bir görünüm kazandıran profesyonel kaplama çözümleri.</p>
      <a href="#detaylar" className="button">
        Detayları Gör
      </a>
    </section>

    {/* ---------- DETAYLAR ---------- */}
    <section id="detaylar" className="hizmet-detay-section">
      <div className="detay-container">
        <div className="detay-header">
          <h2>Neden Araç Kaplama Yaptırmalısınız?</h2>
          <p>Aracınızı korumanın ve kişiselleştirmenin en etkili yolu.</p>
        </div>

        <div className="detay-content">
          {/* Sol görsel */}
          <div className="detay-image">
            <img src={'assets/oto-kaplama.jpeg'} alt="Araç Kaplama Uygulaması" />
          </div>

          {/* Sağ liste */}
          <div className="detay-listesi">
            {/* 1 — Boya Koruması */}
            <div className="detay-item">
              <div className="detay-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#ff0000" strokeWidth="2" />
                  <path d="M2 17L12 22L22 17" stroke="#ff0000" strokeWidth="2" />
                  <path d="M2 12L12 17L22 12" stroke="#ff0000" strokeWidth="2" />
                </svg>
              </div>
              <div className="detay-text">
                <h4>Boya Koruması</h4>
                <p>
                  Orijinal boyayı küçük çiziklere, taş izlerine ve güneşin zararlı UV
                  ışınlarına karşı korur.
                </p>
              </div>
            </div>

            {/* 2 — Kişiselleştirme */}
            <div className="detay-item">
              <div className="detay-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21.25 10.25C21.25 15.65 16.65 21.25 12 21.25C7.35 21.25 2.75 15.65 2.75 10.25C2.75 4.85 6.9 2.75 12 2.75C17.1 2.75 21.25 4.85 21.25 10.25Z"
                    stroke="#ff0000"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                    stroke="#ff0000"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="detay-text">
                <h4>Kişiselleştirme</h4>
                <p>
                  Mat, parlak, metalik veya desenli yüzlerce renk seçeneği ile
                  aracınızı zevkinize göre tasarlayın.
                </p>
              </div>
            </div>

            {/* 3 — Uzun Ömür */}
            <div className="detay-item">
              <div className="detay-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#ff0000"
                    strokeWidth="2"
                  />
                  <path d="M12 6V12L16 14" stroke="#ff0000" strokeWidth="2" />
                </svg>
              </div>
              <div className="detay-text">
                <h4>Uzun Ömür ve Dayanıklılık</h4>
                <p>
                  Kaliteli kaplama malzemelerimiz, yıllarca ilk günkü görünümünü
                  korur ve kolayca temizlenir.
                </p>
              </div>
            </div>

            {/* 4 — Değer Artışı */}
            <div className="detay-item">
              <div className="detay-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                    stroke="#ff0000"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="detay-text">
                <h4>Değer Artışı</h4>
                <p>
                  Aracınızın orijinal boyasını koruyarak ikinci el değerini artırır
                  ve satış sürecini kolaylaştırır.
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

export default AracKaplama;
