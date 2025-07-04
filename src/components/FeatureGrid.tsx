import React from 'react';

const features = [
  {
    title: 'Öncü Şirket',
    desc: 'Kaliteli ve yenilikçi araç kaplama hizmetleri sunan öncü bir şirketiz.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#ff0000" strokeWidth="2" strokeLinejoin="round" />
        <path d="M2 17L12 22L22 17" stroke="#ff0000" strokeWidth="2" strokeLinejoin="round" />
        <path d="M2 12L12 17L22 12" stroke="#ff0000" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Tutkulu Çözümler',
    desc: 'Araçlarınızı kişiselleştirmek ve korumak için en iyi çözümleri sunma konusunda tutkuluyuz.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
        <path d="M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Müşteri Odaklılık',
    desc: 'Kurulduğumuz günden bu yana müşteri memnuniyetini her zaman en ön planda tutmaktayız.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const FeatureGrid: React.FC = () => (
  <section className="biz-kimiz-section">
    <h2>Biz Kimiz?</h2>
    <div className="feature-cards">
      {features.map((f, i) => (
        <div className="feature-item" key={i}>
          <div className="feature-icon">{f.icon}</div>
          <h3>{f.title}</h3>
          <p>{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FeatureGrid;
