import React, { useState, useEffect } from 'react';
import './header.css';
import Login from './Login';
import Logout from './Logout';

const Header = () => {

  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (this.scrollY >= 80) header.classList.add("scroll-header");
    else header.classList.remove("scroll-header");
  });

  const [Toggle, showMenu] = useState(false);
  const [activeNav, setActiveNav] = useState('#accueil');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Vérifier si l'utilisateur est connecté en vérifiant le JWT
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <header className="header">
      <nav className="nav container">
        <a href="index.html" className="nav__logo">Mathias</a>

        <div className={Toggle ? "nav__menu show-menu" : "nav__menu"}>

          <ul className="nav__list grid">

            <li className="nav__item">
              <a href="#accueil"
                onClick={() => setActiveNav('#accueil')}
                className={
                  activeNav === "#accueil" ? "nav__link active-link" : "nav__link"
                }>
                <i className="uil uil-estate nav__icon"></i> Accueil
              </a>
            </li>

            <li className="nav__item">
              <a href="#apropos"
                onClick={() => setActiveNav('#apropos')}
                className={
                  activeNav === "#apropos" ? "nav__link active-link" : "nav__link"
                }>
                <i className="uil uil-user nav__icon"></i> À propos
              </a>
            </li>

            <li className="nav__item">
              <a href="#skills"
                onClick={() => setActiveNav('#skills')}
                className={
                  activeNav === "#skills" ? "nav__link active-link" : "nav__link"
                }>
                <i className="uil uil-file-alt nav__icon"></i> Skills
              </a>
            </li>

            <li className="nav__item">
              <a href="#qualification"
                onClick={() => setActiveNav('#qualification')}
                className={
                  activeNav === "#qualification" ? "nav__link active-link" : "nav__link"
                }>
                <i className="uil uil-parcel nav__icon"></i> Qualification
              </a>
            </li>

            <li className="nav__item">
              <a href="#projets"
                onClick={() => setActiveNav('#projets')}
                className={
                  activeNav === "#projets" ? "nav__link active-link" : "nav__link"
                }>
                <i className="uil uil-scenery nav__icon"></i> Projets
              </a>
            </li>

            <li className="nav__item">
              <a href="#contact"
                onClick={() => setActiveNav('#contact')}
                className={
                  activeNav === "#contact" ? "nav__link active-link" : "nav__link"
                }>
                <i className="uil uil-message nav__icon"></i> Contact
              </a>
            </li>

            {/* Afficher Déconnexion si l'utilisateur est connecté, sinon afficher Connexion */}
            {isLoggedIn ? (
              <Logout />
            ) : (
              <Login />
            )}

          </ul>

          <i className="uil uil-times nav__close" onClick={() => showMenu(!Toggle)}></i>

        </div>

        <div className="nav__toggle" onClick={() => showMenu(!Toggle)}>
          <i className="uil uil-apps"></i>
        </div>
      </nav>
    </header>
  );
}

export default Header;
