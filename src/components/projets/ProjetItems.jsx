import React from "react";

const ProjetItems = ({ item }) => {
    return (
        <div className="projet__card" key={item.id}>
            <img src={item.image} alt="" className="projet__img" />
            <h3 className="projet__title">{item.title}</h3>
            <a href="#" className="projet__button">
                Voir plus <i className="bx bx-right-arrow-alt projet__button-icon"></i>
            </a>
        </div>
    )
}

export default ProjetItems;