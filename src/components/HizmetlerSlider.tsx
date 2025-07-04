/*  HizmetlerSlider.tsx
    ————————————————
    • Tam işlevsel slider (auto + ok + dot)
    • Kartın tamamı veya “DEVAMI” butonu tıklanınca ilgili sayfaya yönlendirir
    • React Router (v6+) gerektirir               */

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';

type Slide = {
  src: string;
  alt: string;
  fallback: string;
  title: string;
  text: string;
  path: string;
  overlay: React.ReactNode;
};

/* ——— 7 temel kart ——— */
const baseSlides: Slide[] = [
  // {
  //   src: 'assets/oto-kaplama.jpeg',
  //   alt: 'Araç Kaplama',
  //   fallback: '🚗',
  //   title: 'Araç Kaplama',
  //   text: 'Aracınıza yeni bir görünüm kazandıran kaliteli kaplama hizmeti.',
  //   path: '/oto-kaplama',
  //   overlay: (
  //     <>
  //       <path d="M12 2L2 7L12 12L22 7L12 2Z" />
  //       <path d="M2 17L12 22L22 17" />
  //       <path d="M2 12L12 17L22 12" />
  //     </>
  //   ),
  // },
  {
    src: 'assets/cam-filmi.jpg',
    alt: 'Cam Filmi',
    fallback: '🪟',
    title: 'Cam Filmi',
    text: 'Güneş ışığına karşı koruma sağlar, mahremiyet sunar.',
    path: '/cam-filmi',
    overlay: (
      <>
        <path d="M9 12L11 14L15 10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    src: 'assets/seramik-kaplama.jpg',
    alt: 'Seramik Kaplama',
    fallback: '✨',
    title: 'Seramik Kaplama',
    text: 'Boyayı korur, çizilmelere karşı dirençli hale getirir.',
    path: '/seramik-kaplama',
    overlay: (
      <>
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
        <path d="M12 6V12L16 14" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  // {
  //   src: 'assets/boyasiz-gocuk.jpg',
  //   alt: 'Boyasız Göçük Düzeltme',
  //   fallback: '🔧',
  //   title: 'Boyasız Göçük Düzeltme',
  //   text: 'Kaportadaki göçükleri boyaya zarar vermeden onarır.',
  //   path: '/boyasiz-gocuk',
  //   overlay: (
  //     <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" strokeLinecap="round" strokeLinejoin="round" />
  //   ),
  // },
  {
    src: 'assets/oto-kaplama.jpeg',
    alt: 'PPF Kaplama',
    fallback: '🛡️',
    title: 'PPF Kaplama',
    text: 'Boya koruma filmi ile aracınızı dış etkenlere karşı koruyun.',
    path: '/ppf-kaplama',
    overlay: (
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    src: 'assets/renk-degisimi.jpeg',
    alt: 'Renk Değişimi',
    fallback: '🎨',
    title: 'Renk Değişimi',
    text: 'Binlerce renk ve doku seçeneğiyle aracınızı kişiselleştirin.',
    path: '/renk-degisim',
    overlay: (
      <path d="M12 2.61a5.04 5.04 0 0 0-4.33 7.39L3 15v4h4l5-5.04a5.04 5.04 0 0 0 2.33-7.35A5.02 5.02 0 0 0 12 2.61zM7 17l-1-1 4-4 1 1-4 4z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  // {
  //   src: 'assets/kisiye-ozel-tasarim.jpeg',
  //   alt: 'Kişiye Özel Tasarım',
  //   fallback: '✍️',
  //   title: 'Kişiye Özel Tasarım',
  //   text: 'Hayalinizdeki tasarımı aracınıza taşıyarak fark yaratın.',
  //   path: '/kisiye-ozel-tasarim',
  //   overlay: (
  //     <>
  //       <path d="M3 17l6-6 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
  //       <path d="M14 7h7v7" strokeLinecap="round" strokeLinejoin="round" />
  //     </>
  //   ),
  // },
];

/* 14 kart olsun diye diziyi iki kere zincirledim.
   İstersen .concat(baseSlides) kısmını kaldırabilirsin. */
const slides = baseSlides.concat(baseSlides);

const HizmetlerSlider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(1);
  const [step, setStep] = useState(0);

  /* boyut hesapla */
  const calcSizes = useCallback(() => {
    if (!sliderRef.current) return;
    const firstCard = sliderRef.current.children[0] as HTMLElement;
    if (!firstCard) return;
    const gap = parseInt(window.getComputedStyle(sliderRef.current).gap || '0', 10);
    setStep(firstCard.offsetWidth + gap);
    setVisible(Math.max(1, Math.floor(window.innerWidth / (firstCard.offsetWidth + gap))));
  }, []);

  const handleGo = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });   // ← eklenen satır
  };

  useEffect(() => {
    calcSizes();
    window.addEventListener('resize', calcSizes);
    return () => window.removeEventListener('resize', calcSizes);
  }, [calcSizes]);

  /* auto-slide */
  const maxSlide = Math.max(0, slides.length - visible);
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((p) => (p >= maxSlide ? 0 : p + 1));
    }, 5000);
    return () => clearInterval(id);
  }, [maxSlide]);

  /* buton/dot */
  const next = () => setCurrent((c) => (c >= maxSlide ? 0 : c + 1));
  const prev = () => setCurrent((c) => (c === 0 ? maxSlide : c - 1));
  const goDot = (i: number) => setCurrent(i);

  /* img hata yardımcıları */
  const hideFallback = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    img.style.display = 'none';
    const fallback = img.nextElementSibling as HTMLElement | null;
    fallback && (fallback.style.display = 'flex');
  };
  const replaceSrc = (altSrc: string) => (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    img.onerror = null;
    img.src = altSrc;
  };

  return (
    <section className="hizmetler-wrapper">
      <h2 className="hizmetler-title">Hizmetlerimiz</h2>

      {/* ——— SLIDER ——— */}
      <div className="hizmetler-slider-container">
        <div
          className="hizmetler-slider"
          ref={sliderRef}
          style={{ transform: `translateX(-${current * step}px)` }}
        >
          {slides.map((s, i) => (
            <div
              className="hizmet-karti"
              key={i}
              onClick={() => handleGo(s.path)}
              style={{ cursor: 'pointer' }}
            >
              <div className="hizmet-resim">
                <img
                  src={s.src}
                  alt={s.alt}
                  onError={
                    s.alt === 'PPF Kaplama' || s.alt === 'Renk Değişimi' || s.alt === 'Kişiye Özel Tasarım'
                      ? replaceSrc('assets/oto-kaplama.jpg')
                      : hideFallback
                  }
                />
                <div className="resim-fallback" style={{ display: 'none' }}>
                  {s.fallback}
                </div>
                <div className="hizmet-overlay">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    {s.overlay}
                  </svg>
                </div>
              </div>

              <h3>{s.title}</h3>
              <p>{s.text}</p>

              {/* “DEVAMI” → aynı sayfaya */}
              <div
                className="devami-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleGo(s.path);
                }}
              >
                DEVAMI
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ——— KONTROLLER ——— */}
      <div className="slider-controls">
        <button className="slider-btn prev-btn" onClick={prev}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="slider-dots">
          {Array.from({ length: maxSlide + 1 }).map((_, i) => (
            <span
              key={i}
              className={`dot${i === current ? ' active' : ''}`}
              data-slide={i}
              onClick={() => goDot(i)}
            />
          ))}
        </div>

        <button className="slider-btn next-btn" onClick={next}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HizmetlerSlider;
