import React from 'react';

interface HizmetSayfasiProps {
  title: string;
  subtitle: string;
  image: string;
  detaylar: {
    title: string;
    desc: string;
    icon: React.JSX.Element;
  }[];
}

const HizmetSayfasi: React.FC<HizmetSayfasiProps> = ({ title, subtitle, image, detaylar }) => {
  return (
    <>
      <video autoPlay muted loop playsInline className="hero-video">
        <source src="/assets/assetsvideo.mp4" type="video/mp4" />
      </video>

      <section className="hero parallax">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <a href="#detaylar" className="button">Detayları Gör</a>
      </section>

      <section id="detaylar" className="hizmet-detay-section">
        <div className="detay-container">
          <div className="detay-header">
            <h2>Neden {title} Yaptırmalısınız?</h2>
            <p>{subtitle}</p>
          </div>

          <div className="detay-content">
            <div className="detay-image">
              <img src={image} alt={`${title} Görseli`} />
            </div>
            <div className="detay-listesi">
              {detaylar.map((d, i) => (
                <div className="detay-item" key={i}>
                  <div className="detay-icon">{d.icon}</div>
                  <div className="detay-text">
                    <h4>{d.title}</h4>
                    <p>{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HizmetSayfasi;
