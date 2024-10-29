import React from "react";
import "./skills.css";
import Frontend from "./Frontend";
import Backend from "./Backend";
import Autres from "./Autres";

const Skills = () => {
    return (
        <section className="skills section" id="skills">
            <h2 className="section__title">Skills</h2>
            <span className="section__subtitle">Mon level technique</span>

            <div className="skills__container container grid">
                <Frontend />
                <Backend />
                <Autres />
            </div>
        </section>
    )
}

export default Skills;