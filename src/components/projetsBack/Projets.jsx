import React, { useEffect, useState } from "react";
import ProjetItems from "./ProjetItems.jsx";
import AddCategory from "./AddCategory"; // Assurez-vous que le chemin est correct
import AddProjet from "./AddProjet.jsx";

const Projets = () => {
    const [item, setItem] = useState(null); // Initialiser à null
    const [projets, setProjets] = useState([]);
    const [allProjets, setAllProjets] = useState([]); // Tous les projets non filtrés
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState(null); // Catégorie active
    const [isConnected, setIsConnected] = useState(false); // Pour gérer l'état de connexion

    // Vérifier si l'utilisateur est connecté
    useEffect(() => {
        const token = localStorage.getItem('token'); // Remplacez par le nom que vous utilisez pour stocker le token
        setIsConnected(!!token); // Définit à true si le token existe
    }, []);

    // Récupérer les projets depuis l'API
    const fetchProjets = async () => {
        try {
            const response = await fetch('https://app-morning-leaf-2821.fly.dev/api/projets');
            const data = await response.json();
            setProjets(data);
            setAllProjets(data); // Stocker tous les projets
        } catch (error) {
            console.error('Erreur lors de la récupération des projets :', error);
        }
    };

    // Récupérer les catégories depuis l'API
    const fetchCategories = async () => {
        try {
            const response = await fetch('https://app-morning-leaf-2821.fly.dev/api/categories');
            const data = await response.json();
            setCategories(data);

            // Définir "All" comme catégorie par défaut
            const allCategory = data.find(cat => cat.name.toLowerCase() === 'all');
            if (allCategory) {
                setItem(allCategory);
                setActive(allCategory._id); // Assigner l'ID comme catégorie active
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories :', error);
        }
    };

    useEffect(() => {
        fetchProjets();
        fetchCategories();
    }, []);

    // Filtrer les projets par catégorie
    useEffect(() => {
        if (item && item.name.toLowerCase() !== 'all') {
            const filteredProjets = allProjets.filter(projet =>
                projet.category.includes(item._id) // Vérifie si l'ID de la catégorie est dans le projet
            );
            setProjets(filteredProjets); // Met à jour la liste des projets filtrés
        } else {
            setProjets(allProjets); // Si "All" est sélectionné, montrer tous les projets
        }
    }, [item, allProjets]); // Refiltrer quand la catégorie ou les projets changent

    const handleClick = (e, index, category) => {
        setItem(category);
        setActive(category._id); // Mettre à jour la catégorie active
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
                {/* Afficher AddCategory si l'utilisateur est connecté */}
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

            {/* Afficher AddProjet si l'utilisateur est connecté */}
            {isConnected && <AddProjet categories={categories} />}
        </div>
    );
};

export default Projets;
