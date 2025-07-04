import React from 'react';

interface Yorum {
  ad: string;
  meslek: string;
  yorum: string;
  avatar: string;
  fallback: string;
}

const yorumlar: Yorum[] = [
  {
    ad: 'Mühendis Ali Bey',
    meslek: 'BMW 320i Sahibi',
    yorum: 'Aracımın kaplaması gerçekten mükemmel oldu. 6 aydır hiçbir sorun yaşamadım. ZuCar ekibine teşekkürler!',
    avatar: '/assets/musteri1.jpg',
    fallback: 'A',
  },
  {
    ad: 'Doktor Büşra Hanım',
    meslek: 'Mercedes C200 Sahibi',
    yorum: 'Cam filmi uygulaması çok profesyonelce yapıldı. Hem güneş koruması hem de mahremiyet sağladı.',
    avatar: '/assets/musteri2.jpg',
    fallback: 'B',
  },
  {
    ad: 'Avukat Mehmet Bey',
    meslek: 'Audi A6 Sahibi',
    yorum: 'Seramik kaplama sayesinde aracım her zaman yeni gibi görünüyor. Yıkama bile çok kolaylaştı.',
    avatar: '/assets/musteri3.jpg',
    fallback: 'M',
  },
  {
    ad: 'Öğretmen Ayşe Hanım',
    meslek: 'Volkswagen Golf Sahibi',
    yorum: 'Boyasız göçük düzeltme hizmeti gerçekten harika. Kaportadaki çizikler tamamen kayboldu.',
    avatar: '/assets/musteri4.jpg',
    fallback: 'A',
  },
  {
    ad: 'İş İnsanı Can Bey',
    meslek: 'Şirket Sahibi',
    yorum: 'Filo araçlarımızın hepsini burada kaplattık. Kalite ve fiyat açısından en iyi seçim.',
    avatar: '/assets/musteri5.jpg',
    fallback: 'C',
  },
  {
    ad: 'Mimar Zeynep Hanım',
    meslek: 'Mini Cooper Sahibi',
    yorum: 'Renk seçimi konusunda çok yardımcı oldular. Aracım artık çok daha şık görünüyor.',
    avatar: '/assets/musteri6.jpg',
    fallback: 'Z',
  },
];

const Yorumlar: React.FC = () => {
  return (
    <section className="musteri-yorumlari">
      <div className="yorumlar-container">
        <div className="yorumlar-header">
          <h2>Müşterilerimiz Ne Diyor?</h2>
          <p>Binlerce memnun müşterimizin deneyimleri</p>
        </div>

        <div className="yorumlar-grid">
          {yorumlar.map((item, i) => (
            <div className="yorum-karti" key={i}>
              <div className="yorum-avatar">
                <img
                  src={item.avatar}
                  alt={item.ad}
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="avatar-fallback" style={{ display: 'none' }}>{item.fallback}</div>
                <div className="yorum-yildizlar">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="yildiz">★</span>
                  ))}
                </div>
              </div>
              <div className="yorum-icerik">
                <p>"{item.yorum}"</p>
                <div className="yorum-kisi">
                  <h4>{item.ad}</h4>
                  <span>{item.meslek}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="yorumlar-istatistik">
          <div className="istatistik-item">
            <div className="istatistik-sayi">5000+</div>
            <div className="istatistik-label">Memnun Müşteri</div>
          </div>
          <div className="istatistik-item">
            <div className="istatistik-sayi">4.9</div>
            <div className="istatistik-label">Ortalama Puan</div>
          </div>
          <div className="istatistik-item">
            <div className="istatistik-sayi">98%</div>
            <div className="istatistik-label">Memnuniyet Oranı</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Yorumlar;
