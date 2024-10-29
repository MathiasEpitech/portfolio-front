import React, { useEffect, useState } from "react";
import { projetsData } from "./Data.jsx";
import { projetsNav } from "./Data.jsx";
import ProjetItems from "./ProjetItems.jsx";

const Projets = () => {

    const [item, setItem] = useState({ name: 'all' });
    const [projets, setProjets] = useState([]);
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (item.name === 'all') {
            setProjets(projetsData);
        } else {
            const newProjets = projetsData.filter((projet) => {
                return projet.category.toLowerCase() === item.name;
            });
            setProjets(newProjets);
        }
    }, [item]);

    const handleClick = (e, index) => {
        setItem({ name: e.target.textContent.toLowerCase() });
        setActive(index);
    };

    return (
        <div>
            <div className="projet__filter">
                {projetsNav.map((item, index) => {
                    return (
                        <span
                            onClick={(e) => {
                                handleClick(e, index);
                            }}
                            className={`${active === index ? 'active-projet' : ''}
                            projet__item`}
                            key={index}
                        >
                            {item.name}
                        </span>
                    );
                })}
            </div>

            <div className="projet__container container grid">
                {projets.map((item) => {
                    return <ProjetItems item={item} key={item.id} />
                })}

            </div>
        </div>
    )

}

export default Projets;