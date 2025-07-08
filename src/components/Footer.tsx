import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* --- Logo & Sosyal --- */}
        <div className="footer-section">
          <div className="footer-logo">
            <h3>ZuCar</h3>
            <p>Aracınız için en iyi kaplama çözümleri</p>
          </div>

          <div className="social-links">
            <a href="https://www.facebook.com/profile.php?id=61578176573192" className="social-link" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/zucararackaplaama/" className="social-link" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.98.196-1.353.569-.373.373-.569.863-.569 1.353s.196.98.569 1.353c.373.373.863.569 1.353.569s.98-.196 1.353-.569c.373-.373.569-.863.569-1.353s-.196-.98-.569-1.353c-.373-.373-.863-.569-1.353-.569z" />
              </svg>
            </a>
          </div>
        </div>

        {/* --- Hizmetler --- */}
        <div className="footer-section">
          <h4>Hizmetlerimiz</h4>
          <ul className="footer-links">
            {/* <li><Link to="/arac-kaplama">Araç Kaplama</Link></li> */}
            <li><Link to="/cam-filmi">Cam Filmi</Link></li>
            <li><Link to="/seramik-kaplama">Seramik Kaplama</Link></li>
            {/* <li><Link to="/boyasiz-gocuk">Boyasız Göçük Düzeltme</Link></li> */}
            <li><Link to="/ppf-kaplama">PPF Kaplama</Link></li>
            <li><Link to="/renk-degisim">Renk Değişimi</Link></li>
            {/* <li><Link to="/kisiye-ozel-tasarim">Kişiye Özel Tasarım</Link></li> */}
          </ul>
        </div>

        {/* --- Hızlı linkler --- */}
        <div className="footer-section">
          <h4>Hızlı Linkler</h4>
          <ul className="footer-links">
            <li><a href="/#kod-sorgulama">Garanti Sorgulama</a></li>
          <li><Link to="/hakkimizda">Hakkımızda</Link></li>
          <li><a href="/#iletisim">İletişim</a></li>
          <li><Link to="#">Gizlilik Politikası</Link></li>
          </ul>
        </div>

        {/* --- İletişim --- */}
        <div className="footer-section">
          <h4>İletişim Bilgileri</h4>
          <div className="contact-info">
            <div className="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2Z" stroke="#ff0000" strokeWidth="2" />
                <path d="M12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z" stroke="#ff0000" strokeWidth="2" />
              </svg>
              <span>Ekşioğlu Mah. Kuran Kursu Cd. 30. Sk. No: 14/B, <b>Çekmeköy / İstanbul</b></span>
            </div>
            <div className="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27.27.67.36 1.02.24 1.12-.37 2.33-.57 3.57-.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.323.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <span>+90 530 942 31 56</span>
            </div>
            <div className="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <span>
               <p>
                  <a className="mail-link" style={{color: '#fff'}} href="mailto:info@zucararackaplama.com">
                    info@zucararackaplama.com
                  </a>
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Alt kısım --- */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2025 ZuCar Araç Kaplama. Tüm hakları saklıdır.</p>
          <div className="footer-bottom-links">
            <a href="#">Kullanım Şartları</a>
            <a href="#">Gizlilik Politikası</a>
            <a href="#">Çerez Politikası</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
