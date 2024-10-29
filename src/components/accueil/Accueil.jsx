import React from "react";
import "./accueil.css";
import Social from "./Social";
import Data from "./Data";
import ScrollDown from "./ScrollDown";

const Accueil = () => {

    return (
        <section className="home section" id="accueil">
            <div className="home__container container grid">
                <div className="home__content grid">
                    <Social />

                    <div className="home__img"></div>

                    <Data />
                </div>

                <ScrollDown />
            </div>
        </section>
    )

}

export default Accueil;