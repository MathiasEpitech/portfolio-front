import React, { useState, useEffect } from "react";
import PutProjet from "./PutProjet";

const ProjetItems = ({ item, categories }) => {
    const [toggleState, setToggleState] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isConnected, setIsConnected] = useState(false);

    const [isFading, setIsFading] = useState(false);
    const [showPutProjet, setShowPutProjet] = useState(false);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsConnected(!!token);
    }, []);

    const projectCategories = item.category.map(catId => {
        const category = categories.find(cat => cat._id === catId);
        return category ? category.name : "Catégorie inconnue";
    });

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Vous devez être connecté pour supprimer ce projet.");
            return;
        }

        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?");
        if (!confirmation) return;

        try {
            const response = await fetch(`https://app-morning-leaf-2821.fly.dev/api/projets/${item._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                alert("Projet supprimé avec succès !");
                window.location.reload();
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Erreur lors de la suppression du projet.");
            }
        } catch (error) {
            alert("Erreur lors de la suppression du projet.");
        }
    };

    const nextImage = () => {
        setIsFading(true);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === item.images.length - 1 ? 0 : prevIndex + 1
            );
            setIsFading(false);
        }, 500);
    };

    const prevImage = () => {
        setIsFading(true);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? item.images.length - 1 : prevIndex - 1
            );
            setIsFading(false);
        }, 500);
    };



    return (
        <div className="projet__card" key={item._id}>
            <img src={item.images[0]} alt={item.title} className="projet__img"/>
            <h3 className="projet__title">{item.title}</h3>

            <span className="projets__button" onClick={() => toggleTab(1)}>
                Voir plus
                <i className="uil uil-arrow-right projets__button-icon"></i>
            </span>

            {isConnected && (
                <div className="projet__admin-buttons">

                    <div className="projets__modal-crud">
                        <PutProjet projet={item} categories={categories} />
                    </div>

                    <span className="projets__modal-crud" onClick={handleDelete}>
                        <i className="uil uil-trash-alt"></i>
                    </span>
                </div>
            )}

            <div className={toggleState === 1 ? "projets__modal active-modal" : "projets__modal"}>
                <div className="projets__modal-content">
                    <i className="uil uil-times projets__modal-close" onClick={() => toggleTab(0)}></i>

                    <h3 className="projets__modal-title">{item.title}</h3>
                    <p className="projets__modal-description">{item.description}</p>

                    <div className="projets__modal-services grid">

                        <div className="carousel">
                            <button className="carousel__button carousel__button--prev" onClick={prevImage}>
                                &#8249;
                            </button>

                            <div className="carousel__image">
                                <img
                                    src={item.images[currentImageIndex]}
                                    alt={`Image ${currentImageIndex + 1}`}
                                    className={`carousel__image ${isFading ? 'fade-out' : ''}`}
                                />
                            </div>
                            <button className="carousel__button carousel__button--next" onClick={nextImage}>
                                &#8250;
                            </button>
                        </div>

                        <p className="projets__modal-cat">
                            Catégories : {projectCategories.join(", ")}
                        </p>

                        <p className="projets__modal-tech">
                            Technologie : {item.technologies}
                        </p>

                        <a href={item.link} target="_blank" className="projets__modal-link">
                            Voir <i className="uil uil-github-alt projet__modal-icon"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjetItems;
