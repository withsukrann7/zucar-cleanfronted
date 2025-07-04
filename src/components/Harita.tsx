import React from 'react';

const Harita: React.FC = () => {
  
  const src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1202.3672231877365!2d29.23952285028763!3d41.02885363296421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cad1ae97ee43e3%3A0xdb93a5525146f208!2sZucar%20Ara%C3%A7%20Kaplama!5e0!3m2!1str!2str!4v1719770648562!5m2!1str!2str';

  return (
    <section className="harita-section">
      <div className="harita-container">
        <div className="harita-header">
          <h3>Bizi Nerede Bulabilirsiniz?</h3>
          <p>Merkezi konumumuzda sizleri bekliyoruz</p>
        </div>

        <div className="harita-wrapper">
          <iframe
            title="ZuCar Araç Kaplama Konum"
            src={src}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
              </div>
              
          </div>
          
          <div className="harita-address">
              <h4>
                  Ekşioğlu Mah. Kuran Kursu Cd. 30. Sk. No: 14/B, <b>Çekmeköy / İstanbul</b>
          </h4>
        </div>
    </section>
  );
};

export default Harita;
