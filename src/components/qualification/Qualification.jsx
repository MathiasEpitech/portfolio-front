import React, { useState } from "react";
import "./qualification.css";

const Qualification = () => {

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    }

    return (
        <section className="qualification section" id="qualification">
            <h2 className="section__title">Qualification</h2>
            <span className="section__subtitle">Mon parcours personnel</span>

            <div className="qualification__container container">
                <div className="qualification__tabs">

                    <div className={toggleState === 1 ?
                        "qualification__button qualification__active button--flex" : "qualification__button button--flex"
                    } onClick={() => toggleTab(1)}>
                        <i className="uil uil-graduation-cap qualification__icon"></i> Formations
                    </div>

                    <div className={toggleState === 2 ?
                        "qualification__button qualification__active button--flex" : "qualification__button button--flex"
                    } onClick={() => toggleTab(2)}>
                        <i className="uil uil-briefcase-alt qualification__icon"></i> Expérience
                    </div>

                </div>

                <div className="qualification__sections">

                    <div className={toggleState === 1 ? "qualification__content qualification__content-active" : "qualification__content"}>

                        <div className="qualification__data">

                            <div>
                                <h3 className="qualification__title">
                                    Intégrateur - Développeur web
                                </h3>

                                <span className="qualification__subtitle">
                                    Web Academy by Epitech
                                </span>

                                <div className="qualification__calender">
                                    <i className="uil uil-calendar-alt"></i> 2022 - 2024
                                </div>
                            </div>

                            <div>
                                <span className="qualification__rounder"></span>
                                <span className="qualification__line"></span>
                            </div>

                        </div>

                        <div className="qualification__data">

                            <div></div>

                            <div>
                                <span className="qualification__rounder"></span>
                                <span className="qualification__line"></span>
                            </div>

                            <div>
                                <h3 className="qualification__title">
                                    Développeur web & Web mobile
                                </h3>

                                <span className="qualification__subtitle">
                                    ALT-RH - Doranco
                                </span>

                                <div className="qualification__calender">
                                    <i className="uil uil-calendar-alt"></i> 2022
                                </div>
                            </div>

                        </div>

                        {/* <div className="qualification__data">

                            <div>
                                <h3 className="qualification__title">
                                    Web
                                </h3>

                                <span className="qualification__subtitle">
                                    WebAcademy
                                </span>

                                <div className="qualification__calender">
                                    <i className="uil uil-calendar-alt"></i> 2022 - 2024
                                </div>
                            </div>

                            <div>
                                <span className="qualification__rounder"></span>
                                <span className="qualification__line"></span>
                            </div>

                        </div>

                        <div className="qualification__data">

                            <div></div>

                            <div>
                                <span className="qualification__rounder"></span>
                                <span className="qualification__line"></span>
                            </div>

                            <div>
                                <h3 className="qualification__title">
                                    Web
                                </h3>

                                <span className="qualification__subtitle">
                                    WebAcademy
                                </span>

                                <div className="qualification__calender">
                                    <i className="uil uil-calendar-alt"></i> 2022 - 2024
                                </div>
                            </div>

                        </div> */}

                    </div>

                    <div className={toggleState === 2 ? "qualification__content qualification__content-active" : "qualification__content"}>

                        <div className="qualification__data">

                            <div>
                                <h3 className="qualification__title">
                                    Intégrateur - développeur web
                                </h3>

                                <span className="qualification__subtitle">
                                    Fairlane editions & Communication
                                </span>

                                <div className="qualification__calender">
                                    <i className="uil uil-calendar-alt"></i> 2024
                                </div>
                            </div>

                            <div>
                                <span className="qualification__rounder"></span>
                                <span className="qualification__line"></span>
                            </div>

                        </div>

                        <div className="qualification__data">

                            <div></div>

                            <div>
                                <span className="qualification__rounder"></span>
                                <span className="qualification__line"></span>
                            </div>

                            <div>
                                <h3 className="qualification__title">
                                    Assistant Pédagogique
                                </h3>

                                <span className="qualification__subtitle">
                                    Epitech
                                </span>

                                <div className="qualification__calender">
                                    <i className="uil uil-calendar-alt"></i> 2024
                                </div>
                            </div>

                        </div>

                        <div className="qualification__data">

                            <div>
                                <h3 className="qualification__title">
                                    Assistant Pédagogique
                                </h3>

                                <span className="qualification__subtitle">
                                    Epitech
                                </span>

                                <div className="qualification__calender">
                                    <i className="uil uil-calendar-alt"></i> 2023
                                </div>
                            </div>

                            <div>
                                <span className="qualification__rounder"></span>
                                <span className="qualification__line"></span>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}

export default Qualification;