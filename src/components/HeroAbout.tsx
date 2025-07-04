import React from 'react';

const HeroAbout: React.FC = () => (
  <section className="hero">
    <video autoPlay muted loop playsInline className="hero-video">
      <source src="/assets/assetsvideo.mp4" type="video/mp4" />
    </video>
    <div className="hero-overlay"></div>
    <h1>Hakkımızda</h1>
    <p>Kalitenin ve güvenin adresi: ZuCar</p>
  </section>
);

export default HeroAbout;
