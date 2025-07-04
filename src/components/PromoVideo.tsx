import React from 'react';

const PromoVideo: React.FC = () => (
  <section className="video-section">
    <h2>Tanıtım Videomuz</h2>
    <video width="80%" controls autoPlay muted loop>
      <source src="/assets/assetsvideo.mp4" type="video/mp4" />
      Tarayıcınız video etiketini desteklemiyor.
    </video>
  </section>
);

export default PromoVideo;
