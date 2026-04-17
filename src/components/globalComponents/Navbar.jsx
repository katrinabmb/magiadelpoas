import { useContext, useEffect, useMemo, useState } from "react";
import { LanguageContext } from "../LanguageProvider";

const Navbar = () => {
  const { translation, toggleLanguage } = useContext(LanguageContext);
  const baseUrl = import.meta.env.BASE_URL
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let rafId = null;

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 8);
        rafId = null;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const links = useMemo(
    () => [
      { label: translation?.home, href: "#home" },
      { label: translation?.cabins, href: "#cabanas" },
      { label: translation?.restaurant, href: "#restaurante" },
      { label: translation?.testimonials, href: "#testimonios" },
    ],
    [translation]
  );

  const navClassName = `nav ${isScrolled ? "nav--scrolled" : "nav--top"}`;

  return (
    <header className={navClassName}>
      <div className="nav__inner">
        <a className="nav__logo" href="#home" aria-label="Ir al inicio">
          <img
            src={isScrolled ? `${baseUrl}images/logoLcolor.svg` : `${baseUrl}images/logoLblanco.svg`}
            alt="logo"
            className="logo-navbar"
          />
        </a>

        <button
          type="button"
          className="nav__burger"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((v) => !v)}
        >
          <span className="nav__burgerLine" />
          <span className="nav__burgerLine" />
          <span className="nav__burgerLine" />
        </button>

        <nav className={`nav__right ${isMenuOpen ? "nav__right--open" : ""}`}>
          <ul className="nav__links">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  className="nav__link"
                  href={l.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav__actions">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={toggleLanguage}
              aria-label="Cambiar idioma"
            >
              {translation?.buttonText ?? "ES"}
            </button>
            <a
              className="btnBP-booking nav__bookingBtn"
              href="#reservar"
              onClick={() => setIsMenuOpen(false)}
            >
              {translation?.explore}
              <img src={`${baseUrl}images/arrowBTN.svg`} alt="arrow right" className="arrowBTN" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
