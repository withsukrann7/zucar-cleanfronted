import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';


const KisiyeOzelTasarim: React.FC = () => (
  <>
    <Header />

    {/* ---------- HERO VIDEO ---------- */}
    <video className="hero-video" autoPlay muted loop playsInline>
      <source src={'/assets/assetsvideo.mp4'} type="video/mp4" />
      Tarayıcınız video etiketini desteklemiyor.
    </video>

    {/* ---------- HERO ---------- */}
    <section className="hero parallax">
      <h1>Hayalinizdeki Tasarımı Aracınıza Taşıyın</h1>
      <p>Tamamen size özel, benzersiz grafik ve desenlerle fark yaratın.</p>
      <a href="#detaylar" className="button">
        Tasarımını Yarat
      </a>
    </section>

    {/* ---------- DETAYLAR ---------- */}
    <section id="detaylar" className="hizmet-detay-section">
      <div className="detay-container">
        <div className="detay-header">
          <h2>Neden Kişiye Özel Tasarım?</h2>
          <p>Aracınızı bir sanat eserine dönüştürün.</p>
        </div>

        <div className="detay-content">
          {/* Sol resim */}
          <div className="detay-image">
            <img
              src={'assets/kisiye-ozel-tasarim.jpeg'}
              alt="Kişiye Özel Tasarım Kaplama"
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
                    d="M3 17l6-6 4 4 8-8"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 7h7v7"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="detay-text">
                <h4>Sınırsız Yaratıcılık</h4>
                <p>
                  İstediğiniz her türlü grafik, desen, logo veya metni
                  aracınıza uygulayarak tamamen benzersiz bir görünüm elde
                  edin.
                </p>
              </div>
            </div>

            {/* 2 */}
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
                <h4>Profesyonel Uygulama</h4>
                <p>
                  Tasarım ekibimiz hayalinizdeki konsepti dijital olarak
                  tasarlar ve uzman ekibimiz kusursuzca uygular.
                </p>
              </div>
            </div>

            {/* 3 */}
            <div className="detay-item">
              <div className="detay-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4.93 4.93l4.24 4.24M14.83 9.17l4.24 4.24M9.17 14.83l-4.24 4.24M19.07 4.93l-4.24 4.24"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="detay-text">
                <h4>Yüksek Kaliteli Malzeme</h4>
                <p>
                  Tasarımınız uzun yıllar canlılığını koruyan, solmaya ve
                  yıpranmaya dirençli malzemelerle hayata geçirilir.
                </p>
              </div>
            </div>

            {/* 4 */}
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
                <h4>Koruyucu ve Estetik</h4>
                <p>
                  Özel tasarım kaplamalarımız harika görünmenin yanında
                  aracınızın orijinal boyasını da korur.
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

export default KisiyeOzelTasarim;
