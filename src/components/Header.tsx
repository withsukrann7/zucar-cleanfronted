// src/components/Header.tsx
import { useState, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const hizmetYollari = [
  '/cam-filmi',
  '/seramik-kaplama',
  '/ppf-kaplama',
  '/renk-degisim',
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);      // slide panel
  const [dropdownOpen, setDropdownOpen] = useState(false);  // alt menü (mobil)
  const { pathname } = useLocation();

  /* Hizmetler sekmesi aktif mi? */
  const hizmetlerActive = useMemo(
    () => hizmetYollari.some((p) => pathname.startsWith(p)),
    [pathname]
  );

  /* Ortak NavLink class’ı */
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link${isActive ? ' nav-active' : ''}`;

  /* Menüdeki bir linke tıklandı → hepsini kapat */
  const handleNavClick = () => {
    setMobileOpen(false);
    setDropdownOpen(false);
  };

  /* “Hizmetlerimiz” başlığına tıkla (mobil) */
  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();          // nav’ı kapatmasın
    e.preventDefault();           // sayfa kaymasın
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="site-header">
      {/* Burger */}
      <button
        className={`burger${mobileOpen ? ' open' : ''}`}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Menüyü Aç / Kapat"
      >
        <span></span><span></span><span></span>
      </button>

      {/* Logo */}
      <div className="logo">
        <span>ZuCar</span>
      </div>

      {/* NAV – mobileOpen ⇒ sağdan görünür */}
      <nav className={mobileOpen ? 'open' : ''}>
        <ul onClick={handleNavClick}>
          <li>
            <NavLink to="/" end className={linkClass}>
              Ana Sayfa
            </NavLink>
          </li>

          <li>
            <a href="#kod-sorgulama" className="nav-link">
              Garanti Sorgulama
            </a>
          </li>

          {/* Hizmetlerimiz */}
          <li className="dropdown">
            <span
              className={`dropdown-toggle${hizmetlerActive ? ' nav-active' : ''}`}
              onClick={toggleDropdown}           // <— dokununca aç/kapat
            >
              Hizmetlerimiz ▾
            </span>

            <ul className={`dropdown-menu${dropdownOpen ? ' show' : ''}`}>
              <li>
                <NavLink to="/cam-filmi" className={linkClass}>
                  Cam Filmi Hizmeti
                </NavLink>
              </li>
              <li>
                <NavLink to="/seramik-kaplama" className={linkClass}>
                  Seramik Kaplama Hizmeti
                </NavLink>
              </li>
              <li>
                <NavLink to="/ppf-kaplama" className={linkClass}>
                  PPF Kaplama Hizmeti
                </NavLink>
              </li>
              <li>
                <NavLink to="/renk-degisim" className={linkClass}>
                  Renk Değişim Hizmeti
                </NavLink>
              </li>
            </ul>
          </li>

          <li>
            <a href="/#iletisim" className="nav-link">
              İletişim
            </a>
          </li>

          <li>
            <NavLink to="/hakkimizda" className={linkClass}>
              Hakkımızda
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
