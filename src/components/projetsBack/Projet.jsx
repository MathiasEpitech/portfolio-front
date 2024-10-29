import React from "react";
import "./projet.css";
import Projets from "./Projets.jsx";

const Projet = () => {

    return (
        <section className="projet section" id="projets">
            <h2 className="section__title">Projets</h2>
            <span className="section__subtitle">Mes travail récens</span>

            <Projets />
        </section>
    )

}

export default Projet;