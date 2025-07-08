import React, { useState } from 'react';

interface FormState {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const EMPTY_FORM: FormState = {
  name: '',
  phone: '',
  email: '',
  message: '',
};

const EMAIL_RGX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const IletisimFormu: React.FC = () => {
  const [form, setForm]           = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  /* ---------- helpers ---------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () =>
    form.name.trim().length >= 3 &&
    EMAIL_RGX.test(form.email.trim()) &&
    form.message.trim().length >= 10;

  /* ---------- submit ---------- */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      alert('Lütfen zorunlu alanları doğru doldurun.');
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch('https://zucar-backend-ndh4.onrender.com/contact', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Gönderim hatası');
      }

      alert('Mesajınız başarıyla gönderildi!');
      setForm(EMPTY_FORM);
    } catch (err: any) {
      alert(`Gönderilemedi: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="iletisim" className="iletisim-section">
      <div className="iletisim-container">
        <div className="iletisim-header">
          <div className="iletisim-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
              <path d="M22 2H2V22H22V2ZM20 20H4V4H20V20Z" stroke="#ff0000" strokeWidth="2" />
              <path d="M12 6L12 18" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" />
              <path d="M8 10L12 6L16 10" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2>Bizimle İletişime Geçin</h2>
          <p>Aracınız için en iyi hizmeti almak için hemen iletişime geçin</p>
        </div>

        <div className="iletisim-content">
          <div className="iletisim-form-container">
            <div className="form-header">
              <h3>Mesaj Gönderin</h3>
              <p>Size en kısa sürede dönüş yapacağız</p>
            </div>

            <form className="iletisim-form" id="iletisimForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <input
                    name="name"
                    type="text"
                    placeholder="Adınız Soyadınız"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7292C21.7209 20.9842 21.5573 21.2136 21.3521 21.4019C21.1469 21.5902 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0973 21.9454 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3146 6.72533 15.2661 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.09461 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65174C2.82196 2.44678 3.04995 2.28314 3.30351 2.17124C3.55707 2.05934 3.83107 2.00174 4.10999 2.00001H7.10999C7.59522 1.99522 8.06574 2.16708 8.43373 2.48353C8.80172 2.79999 9.04201 3.23945 9.10999 3.72001C9.23662 4.68007 9.47144 5.62273 9.80999 6.53001C9.94454 6.88792 9.97348 7.27675 9.89382 7.65343C9.81416 8.03011 9.62984 8.37754 9.35999 8.65001L8.08999 9.92001C9.51355 12.4135 11.5865 14.4865 14.08 15.91L15.35 14.64C15.6225 14.3702 15.9699 14.1858 16.3466 14.1062C16.7233 14.0265 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Telefon Numaranız"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <input
                    name="email"
                    type="email"
                    placeholder="E-posta Adresiniz"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-wrapper textarea-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Size nasıl yardımcı olabiliriz?"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={submitting}>
                <span className="btn-text">
                  {submitting ? 'Gönderiliyor…' : 'Mesaj Gönder'}
                </span>
                <span className="btn-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </form>
          </div>

          <div className="iletisim-bilgileri">
            <div className="bilgi-kartlari">
              <div className="bilgi-kart">
                <div className="kart-icon">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2Z" stroke="#ff0000" strokeWidth="2" />
                    <path d="M12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z" stroke="#ff0000" strokeWidth="2" />
                  </svg>
                </div>
                <div className="kart-icerik">
                  <h4>Adres</h4>
                  <p>Ekşioğlu Mah. Kuran Kursu Cd. 30. Sk. No: 14/B,<br /><b>Çekmeköy / İstanbul</b></p>
                </div>
              </div>

              <div className="bilgi-kart">
                <div className="kart-icon">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7292C21.7209 20.9842 21.5573 21.2136 21.3521 21.4019C21.1469 21.5902 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0973 21.9454 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3146 6.72533 15.2661 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.09461 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65174C2.82196 2.44678 3.04995 2.28314 3.30351 2.17124C3.55707 2.05934 3.83107 2.00174 4.10999 2.00001H7.10999C7.59522 1.99522 8.06574 2.16708 8.43373 2.48353C8.80172 2.79999 9.04201 3.23945 9.10999 3.72001C9.23662 4.68007 9.47144 5.62273 9.80999 6.53001C9.94454 6.88792 9.97348 7.27675 9.89382 7.65343C9.81416 8.03011 9.62984 8.37754 9.35999 8.65001L8.08999 9.92001C9.51355 12.4135 11.5865 14.4865 14.08 15.91L15.35 14.64C15.6225 14.3702 15.9699 14.1858 16.3466 14.1062C16.7233 14.0265 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="#ff0000" strokeWidth="2" />
                  </svg>
                </div>
                <div className="kart-icerik">
                  <h4>Telefon</h4>
                  <p>+90 530 942 31 56</p>
                </div>
              </div>

              <div className="bilgi-kart">
                <div className="kart-icon">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#ff0000" strokeWidth="2" />
                    <path d="M22 6L12 13L2 6" stroke="#ff0000" strokeWidth="2" />
                  </svg>
                </div>
                <div className="kart-icerik">
                  <h4>E-posta</h4>
                    <span>
                      <p>
                        <a className="mail-link" style={{color: '#fff'}} href="mailto:info@zucararackaplama.com">
                          info@zucararackaplama.com
                        </a>
                      </p>
                    </span>
                </div>
              </div>

              <div className="bilgi-kart">
                <div className="kart-icon">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ff0000" strokeWidth="2" />
                    <path d="M12 6V12L16 14" stroke="#ff0000" strokeWidth="2" />
                  </svg>
                </div>
                <div className="kart-icerik">
                  <h4>Çalışma Saatleri</h4>
                  <p>Pazartesi - Pazar: 08:00 - 21:00</p>
                </div>
              </div>
            </div>

            <div className="sosyal-medya-iletisim">
              <h4>Bizi Takip Edin</h4>
              <div className="sosyal-buttons">
                <a href="https://wa.me/905309423156" className="sosyal-btn whatsapp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  <span>WhatsApp</span>
                </a>
                <a href="https://www.instagram.com/zucararackaplaama/" className="sosyal-btn instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.98.196-1.353.569-.373.373-.569.863-.569 1.353s.196.98.569 1.353c.373.373.863.569 1.353.569s.98-.196 1.353-.569c.373-.373.569-.863.569-1.353s-.196-.98-.569-1.353c-.373-.373-.863-.569-1.353-.569z" />
                  </svg>
                  <span>Instagram</span>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61578176573192" className="sosyal-btn facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IletisimFormu;
