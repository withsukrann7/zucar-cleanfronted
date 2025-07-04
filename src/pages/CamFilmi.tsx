import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CamFilmi: React.FC = () => (
  <>
    <Header />

    {/* ---------- VIDEO ---------- */}
    <video className="hero-video" autoPlay muted loop playsInline>
      <source src={'/assets/assetsvideo.mp4'} type="video/mp4" />
      Tarayıcınız video etiketini desteklemiyor.
    </video>

    {/* ---------- HERO ---------- */}
    <section className="hero parallax">
      <h1>Cam Filmi Hizmeti</h1>
      <p>Konfor, güvenlik ve estetiği bir arada sunan profesyonel çözümler.</p>
      <a href="#detaylar" className="button">
        Detayları Gör
      </a>
    </section>

    {/* ---------- DETAYLAR ---------- */}
    <section id="detaylar" className="hizmet-detay-section">
      <div className="detay-container">
        <div className="detay-header">
          <h2>Neden Cam Filmi Yaptırmalısınız?</h2>
          <p>Sürüş kalitenizi ve aracınızın güvenliğini artırın.</p>
        </div>

        <div className="detay-content">
          {/* Sol resim */}
          <div className="detay-image">
            <img src={'/assets/cam-filmi.jpg'} alt="Cam Filmi Uygulaması" />
          </div>

          {/* Sağ liste */}
          <div className="detay-listesi">
            {/* 1 */}
            <div className="detay-item">
              <div className="detay-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 16a4 4 0 100-8 4 4 0 000 8z"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="detay-text">
                <h4>Güneş Kontrolü ve UV Koruma</h4>
                <p>
                  Zararlı UV ışınlarını %99'a kadar engelleyerek hem sağlığınızı
                  hem de aracınızın döşemelerini korur.
                </p>
              </div>
            </div>

            {/* 2 */}
            <div className="detay-item">
              <div className="detay-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 12V2m0 10c-3.5 0-7 1.6-7 4v5h14v-5c0-2.4-3.5-4-7-4zM8 2h8v2H8V2z"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="detay-text">
                <h4>Mahremiyet ve Güvenlik</h4>
                <p>
                  Dışarıdan içerisinin görünmesini zorlaştırarak özel alanınızı
                  korur ve hırsızlığa karşı caydırıcılık sağlar.
                </p>
              </div>
            </div>

            {/* 3 */}
            <div className="detay-item">
              <div className="detay-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17.657 17.657L19.07 19.07M6.343 6.343L4.93 4.93m11.314 0L4.929 17.657M12 2v2m0 16v2M4.929 4.929L19.07 19.07m-14.142 0L19.07 4.93"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="detay-text">
                <h4>Konforlu Sürüş ve Isı Yalıtımı</h4>
                <p>
                  Yazın aracın içini serin tutar, kışın ısıyı içeride tutarak
                  yakıt tasarrufu sağlar.
                </p>
              </div>
            </div>

            {/* 4 */}
            <div className="detay-item">
              <div className="detay-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v4h-2zm0 6h2v2h-2z"
                    stroke="#ff0000"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="detay-text">
                <h4>Kaza Anında Koruma</h4>
                <p>
                  Cam kırıldığında parçaların dağılmasını önleyerek sizi ve
                  sevdiklerinizi cam kırıklarından korur.
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

export default CamFilmi;
