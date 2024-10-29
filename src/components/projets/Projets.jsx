import React, { useEffect, useState } from "react";
import ProjetItems from "./ProjetItems.jsx";
import AddCategory from "./AddCategory";
import AddProjet from "./AddProjet.jsx";

const Projets = () => {
    const [item, setItem] = useState(null);
    const [projets, setProjets] = useState([]);
    const [allProjets, setAllProjets] = useState([]);
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsConnected(!!token);
    }, []);

    const fetchProjets = async () => {
        try {
            const response = await fetch('https://app-morning-leaf-2821.fly.dev/api/projets');
            const data = await response.json();
            setProjets(data);
            setAllProjets(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des projets :', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://app-morning-leaf-2821.fly.dev/api/categories');
            const data = await response.json();
            setCategories(data);

            const allCategory = data.find(cat => cat.name.toLowerCase() === 'all');
            if (allCategory) {
                setItem(allCategory);
                setActive(allCategory._id);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories :', error);
        }
    };

    useEffect(() => {
        fetchProjets();
        fetchCategories();
    }, []);

    useEffect(() => {
        if (item && item.name.toLowerCase() !== 'all') {
            const filteredProjets = allProjets.filter(projet =>
                projet.category.includes(item._id)
            );
            setProjets(filteredProjets);
        } else {
            setProjets(allProjets);
        }
    }, [item, allProjets]);

    const handleClick = (e, index, category) => {
        setItem(category);
        setActive(category._id);
    };

    return (
        <div>
            <div className="projet__filter">
                {categories.map((category, index) => (
                    <span
                        onClick={(e) => handleClick(e, index, category)}
                        className={`${active === category._id ? 'active-projet' : ''} projet__item`}
                        key={category._id}
                    >
                        {category.name}
                    </span>
                ))}

                {isConnected && <AddCategory />}
            </div>

            <div className="projet__container container grid">
                {projets.length > 0 ? (
                    projets.map((projet) => (
                        <ProjetItems key={projet._id} item={projet} categories={categories}/>
                    ))
                ) : (
                    <p>Aucun projet disponible pour cette catégorie.</p>
                )}
            </div>

            {isConnected && <AddProjet categories={categories} />}
        </div>
    );
};

export default Projets;
