import React from 'react';

const HeroSection: React.FC = () => (
  <>
    <video className="hero-video" autoPlay muted loop playsInline>
      <source src="/assets/assetsvideo.mp4" type="video/mp4" />
      Tarayıcınız video etiketini desteklemiyor.
    </video>

    <section className="hero parallax">
      <h1>Aracınıza Değer Katın</h1>
      <p>Kaplama, koruma ve kişiselleştirme hizmetlerinde uzman</p>
      <a href="#kod-sorgulama" className="button">Garanti Sorgula</a>
    </section>
  </>
);

export default HeroSection;
