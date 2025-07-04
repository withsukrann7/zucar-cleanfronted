import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SeramikKaplama: React.FC = () => (
  <>
    <Header />

    {/* ---------- Video ---------- */}
    <video className="hero-video" autoPlay muted loop playsInline>
      <source src={'/assets/assetsvideo.mp4'} type="video/mp4" />
      Tarayıcınız video etiketini desteklemiyor.
    </video>

    {/* ---------- HERO ---------- */}
    <section className="hero parallax">
      <h1>Seramik Kaplama Hizmeti</h1>
      <p>Boya korumada zirve teknoloji ile tanışın.</p>
      <a href="#detaylar" className="button">
        Detayları Gör
      </a>
    </section>

    {/* ---------- DETAYLAR ---------- */}
    <section id="detaylar" className="hizmet-detay-section">
      <div className="detay-container">
        <div className="detay-header">
          <h2>Neden Seramik Kaplama Yaptırmalısınız?</h2>
          <p>Aracınızın boyasını ilk günkü parlaklığıyla korumanın en etkili yolu.</p>
        </div>

        <div className="detay-content">
          {/* Sol görsel */}
          <div className="detay-image">
            <img src={'/assets/seramik-kaplama.jpg'} alt="Seramik Kaplama Uygulaması" />
          </div>

          {/* Sağ liste */}
          <div className="detay-listesi">
            {/* 1 */}
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
                <h4>Üstün Parlaklık ve Derinlik</h4>
                <p>
                  Aracınızın boyasına göz alıcı, cam gibi bir parlaklık ve renk
                  derinliği katar, showroom görünümü sağlar.
                </p>
              </div>
            </div>

            {/* 2 */}
            <div className="detay-item">
              <div className="detay-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.09 9.09L12 12M12 12L14.91 14.91M12 12L9.09 14.91M12 12L14.91 9.09"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="detay-text">
                <h4>Hidrofobik Yüzey (Su İtme)</h4>
                <p>
                  Sıvıların, kirin ve çamurun yüzeye yapışmasını engelleyerek
                  aracınızın daha uzun süre temiz kalmasını sağlar.
                </p>
              </div>
            </div>

            {/* 3 */}
            <div className="detay-item">
              <div className="detay-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 12L11 14L15 10"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="detay-text">
                <h4>Çizilmelere Karşı Koruma</h4>
                <p>
                  Boya yüzeyinde sert bir katman oluşturarak fırça izleri ve ince
                  çizikler gibi mikro hasarlara karşı direnç gösterir.
                </p>
              </div>
            </div>

            {/* 4 */}
            <div className="detay-item">
              <div className="detay-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="detay-text">
                <h4>Kimyasal ve UV Direnci</h4>
                <p>
                  Asit yağmurları, kuş pislikleri, böcek kalıntıları ve güneşin
                  zararlı UV ışınlarının boyaya zarar vermesini engeller.
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

export default SeramikKaplama;
