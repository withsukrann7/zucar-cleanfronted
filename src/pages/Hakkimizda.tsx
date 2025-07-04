// src/pages/Hakkimizda.tsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Harita from '../components/Harita';

const Hakkimizda: React.FC = () => {
  return (
    <>
      <Header />

      {/* -------------------------------------------------- HERO */}
      <section
        className="hero"
        style={{
          position: 'relative',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            zIndex: -1,
            objectFit: 'cover',
          }}
        >
          <source src="/assets/assetsvideo.mp4" type="video/mp4" />
        </video>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 0,
          }}
        />

        <h1 style={{ position: 'relative', zIndex: 1 }}>Hakkımızda</h1>
        <p style={{ position: 'relative', zIndex: 1 }}>
          Kalitenin ve güvenin adresi: ZuCar
        </p>
      </section>

      {/* -------------------------------------------------- BİZ KİMİZ */}
      <section
        className="biz-kimiz-section"
        style={{
          backgroundColor: '#101010',
          padding: '80px 20px 40px',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            color: '#ff0000',
            fontSize: 36,
            marginBottom: 50,
            textTransform: 'uppercase',
            letterSpacing: 2,
          }}
        >
          Biz Kimiz?
        </h2>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            alignItems: 'stretch',
            gap: 40,
            maxWidth: 1200,
            margin: '0 auto',
          }}
        >
          {[
            {
              title: 'Öncü Şirket',
              desc: 'Kaliteli ve yenilikçi araç kaplama hizmetleri sunan öncü bir şirketiz.',
              icon: (
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
            },
            {
              title: 'Tutkulu Çözümler',
              desc: 'Araçlarınızı kişiselleştirmek ve korumak için en iyi çözümleri sunma konusunda tutkuluyuz.',
              icon: (
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
            },
            {
              title: 'Müşteri Odaklılık',
              desc: 'Kurulduğumuz günden bu yana müşteri memnuniyetini her zaman en ön planda tutmaktayız.',
              icon: (
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
            },
          ].map(({ title, desc, icon }) => (
            <div
              key={title}
              className="feature-item"
              style={{
                background: '#1a1a1a',
                padding: 30,
                borderRadius: 15,
                width: 300,
                textAlign: 'center',
                borderBottom: '3px solid #ff0000',
                transition: 'transform 0.3s, box-shadow 0.3s',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div className="feature-icon" style={{ marginBottom: 20 }}>
                {icon}
              </div>
              <h3
                style={{
                  color: 'white',
                  fontSize: 20,
                  marginBottom: 10,
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  color: '#ccc',
                  fontSize: 16,
                  lineHeight: 1.6,
                  flexGrow: 1,
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------- HAKKIMIZDA KUTULARI */}
      <section
        className="content-section"
        style={{
          background: '#101010',
          color: 'white',
          padding: '40px 20px 60px',
        }}
      >
        <div
          className="about-boxes"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '40px 20px',
            justifyContent: 'center',
            maxWidth: 1000,
            margin: '0 auto',
          }}
        >
          {[
            {
              title: 'Kalite ve Deneyim',
              desc: 'ZuCar, araç kaplama alanında geniş deneyime sahiptir ve bu alandaki en son trendleri ve teknolojileri takip eder. Kullandığımız malzemeler ve işçiliğimiz, en yüksek kalite standartlarına uyar ve uzun ömürlü sonuçlar sunar.',
            },
            {
              title: 'Tecrübe',
              desc: "1990'dan beri süregelen tecrübemizle, binlerce araca estetik ve koruma kazandırarak sektörde fark yaratıyoruz.",
            },
            {
              title: 'Müşteri Memnuniyeti',
              desc: 'Müşterilerimizin memnuniyeti bizim için önceliklidir. Her projeyi dikkatle yönetir, müşteri taleplerine özel çözümler sunarız.',
            },
            {
              title: 'Yenilikçilik',
              desc: 'ZuCar, sektördeki en yeni teknolojileri ve kaplama trendlerini takip eder ve müşterilere bu yenilikleri sunar.',
            },
          ].map(({ title, desc }) => (
            <div
              key={title}
              className="about-card"
              style={{
                flex: '1 1 400px',
                background: '#1a1a1a',
                textAlign: 'left',
                marginBottom: 20,
                borderRadius: 18,
                padding: '32px 28px',
                borderLeft: '4px solid #ff0000',
                color: 'white',
              }}
            >
              <h3
                style={{
                  fontSize: 38,
                  color: '#ff0000',
                  fontWeight: 'bold',
                  marginBottom: 20,
                }}
              >
                {title}
              </h3>
              <p style={{ fontSize: 18, color: '#ccc' }}>{desc}</p>
            </div>
          ))}

          {/* Uygun Fiyat kutusu */}
          <div
            className="about-card"
            style={{
              flex: '1 1 100%',
              maxWidth: 500,
              background: '#1a1a1a',
              textAlign: 'center',
              margin: '20px auto',
              borderRadius: 18,
              padding: '32px 28px',
              borderTop: '4px solid #ff0000',
              color: 'white',
            }}
          >
            <h3
              style={{
                fontSize: 38,
                color: '#ff0000',
                fontWeight: 'bold',
                marginBottom: 20,
              }}
            >
              Uygun Fiyatlar
            </h3>
            <p style={{ fontSize: 18, color: '#ccc' }}>
              Rekabetçi fiyatlarımızla, yüksek kaliteli araç kaplama hizmetlerini
              uygun maliyetlerle sunarız.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: 1000,
            margin: '40px auto 0',
          }}
        >
          <p style={{ color: 'white' }}>
            ZuCar, araçlarınızı dönüştürmek ve korumak için güvenebileceğiniz bir
            iş ortağıdır. Size özel kaplama çözümleri ile aracınıza zarif bir
            görünüm kazandırmak için sabırsızlanıyoruz. Bize ulaşın ve
            hayalinizdeki aracı yaratmanıza nasıl yardımcı olabileceğimizi
            öğrenin.
          </p>
          <a
            href="/#iletisim"
            className="cta-button"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#f0ad4e',
              color: 'white',
              textDecoration: 'none',
              borderRadius: 5,
              marginTop: 10,
            }}
          >
            Bize Ulaşın
          </a>
        </div>
      </section>

      {/* -------------------------------------------------- TANITIM VİDEOSU */}
      <section
        className="video-section"
        style={{ textAlign: 'center', padding: '60px 20px' }}
      >
        <h2 style={{ color: 'white', marginBottom: 20 }}>Tanıtım Videomuz</h2>
        <video width="80%" controls autoPlay muted loop>
          <source src="/assets/assetsvideo.mp4" type="video/mp4" />
          Tarayıcınız video etiketini desteklemiyor.
        </video>
      </section>

      {/* -------------------------------------------------- FOOTER */}
      <Harita />
      <Footer />
    </>
  );
};

export default Hakkimizda;
