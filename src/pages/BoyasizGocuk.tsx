import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BoyasizGocuk: React.FC = () => (
  <>
    <Header />

    {/* ---------- HERO VIDEO ---------- */}
    <video
      autoPlay
      muted
      loop
      playsInline
      className="hero-video"
    >
      <source src={'../../public/assets/assetsvideo.mp4'} type="video/mp4" />
      Tarayıcınız video etiketini desteklemiyor.
    </video>

    {/* ---------- HERO BAŞLIK ---------- */}
    <section className="hero parallax">
      <h1>Boyasız Göçük Düzeltme</h1>
      <p>Aracınızın orijinalliğini koruyan sihirli dokunuş.</p>
      <a href="#detaylar" className="button">
        Detayları Gör
      </a>
    </section>

    {/* ---------- DETAY BÖLÜMÜ ---------- */}
    <section id="detaylar" className="hizmet-detay-section">
      <div className="detay-container">

        <div className="detay-header">
          <h2>Neden Boyasız Göçük Düzeltme?</h2>
          <p>Aracınızın değerini ve orijinalliğini korumanın en akıllı yolu.</p>
        </div>

        <div className="detay-content">
          {/* Sol görsel */}
          <div className="detay-image">
            <img
              src={'/assets/boyasiz-gocuk.jpg'}
              alt="Boyasız Göçük Düzeltme Uygulaması"
            />
          </div>

          {/* Sağ özellik listesi */}
          <div className="detay-listesi">

            {/* 1 */}
            <div className="detay-item">
              <div className="detay-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="detay-text">
                <h4>Orijinalliği Korur</h4>
                <p>
                  Boya işlemi yapılmadığı için aracınızın fabrika çıkışı
                  orijinalliği bozulmaz ve boya kalınlığı değişmez.
                </p>
              </div>
            </div>

            {/* 2 */}
            <div className="detay-item">
              <div className="detay-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="detay-text">
                <h4>Hızlı ve Ekonomik Çözüm</h4>
                <p>
                  Geleneksel boya ve kaporta işlemlerine göre çok daha kısa sürede
                  ve daha uygun maliyetle tamamlanır.
                </p>
              </div>
            </div>

            {/* 3 */}
            <div className="detay-item">
              <div className="detay-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="detay-text">
                <h4>Değer Kaybı Yaratmaz</h4>
                <p>
                  İşlem <em>boyasız</em> olarak yapıldığı için aracınızın ikinci
                  el satış değerinde herhangi bir düşüş yaşanmaz.
                </p>
              </div>
            </div>

            {/* 4 */}
            <div className="detay-item">
              <div className="detay-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 16V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2zM9 14l3-3 3 3"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="detay-text">
                <h4>Kusursuz Sonuç</h4>
                <p>
                  Özel aletler ve uzman teknisyenlerimiz sayesinde göçükler, iz
                  bırakmadan %100&rsquo;e yakın bir başarıyla düzeltilir.
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

export default BoyasizGocuk;
