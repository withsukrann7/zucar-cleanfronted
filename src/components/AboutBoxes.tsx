import React from 'react';

const boxes = [
  {
    title: 'Kalite ve Deneyim',
    desc: 'ZuCar, araç kaplama alanında geniş deneyime sahiptir ve bu alandaki en son trendleri ve teknolojileri takip eder.',
  },
  {
    title: 'Tecrübe',
    desc: "1990'dan beri süregelen tecrübemizle, binlerce araca estetik ve koruma kazandırıyoruz.",
  },
  {
    title: 'Müşteri Memnuniyeti',
    desc: 'Müşterilerimizin memnuniyeti bizim için önceliklidir. Her projeyi dikkatle yönetiriz.',
  },
  {
    title: 'Yenilikçilik',
    desc: 'Sektördeki en yeni teknolojileri takip eder, müşterilere en güncel çözümleri sunarız.',
  },
];

const AboutBoxes: React.FC = () => (
  <section className="content-section">
    <div className="about-boxes">
      {boxes.map((b, i) => (
        <div className="about-card" key={i}>
          <h3>{b.title}</h3>
          <p>{b.desc}</p>
        </div>
      ))}
      <div className="about-card full">
        <h3>Uygun Fiyatlar</h3>
        <p>Rekabetçi fiyatlarımızla yüksek kaliteyi uygun maliyetle sunarız.</p>
      </div>
    </div>
  </section>
);

export default AboutBoxes;
