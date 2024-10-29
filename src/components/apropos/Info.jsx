import React from "react";

const Info = () => {
    return (
        <div className="apropos__info grid">
            <div className="apropos__box">
                <i className="bx bx-award apropos__icon"></i>
                <h3 className="apropos__title">Expérience</h3>
                <span className="apropos__subtitle">3 ans de formations</span>
            </div>

            <div className="apropos__box">
                <i className="bx bx-briefcase-alt apropos__icon"></i>
                <h3 className="apropos__title">Complété</h3>
                <span className="apropos__subtitle">+ 15 Projets</span>
            </div>

        </div>
        
    )
}


export default Info;