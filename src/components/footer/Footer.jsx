import React from "react";
import "./footer.css";

const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer__container container">
                <h1 className="footer__title">Mathias</h1>

                <ul className="footer__list">

                    <li>
                        <a href="#apropos" className="footer__link">À propos</a>
                    </li>

                    <li>
                        <a href="#skills" className="footer__link">Skills</a>
                    </li>

                    <li>
                        <a href="#projets" className="footer__link">Projets</a>
                    </li>
                </ul>

                <div className="footer__social">
                    <a href="" className="footer__social-link" target='_blank'>
                        <i class="uil uil-linkedin-alt"></i>
                    </a>

                    <a href="" className="footer__social-link" target='_blank'>
                        <i class="uil uil-github-alt"></i>
                    </a>
                </div>

                <span className="footer__copy">&#169; Mathias Fernandes .Tous droits réservés</span>
            </div>
        </footer>
    )
}

export default Footer;