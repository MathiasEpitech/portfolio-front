import React, { useState, useRef } from "react";

const PutProjet = ({ projet, categories }) => {
    const form = useRef();

    // États locaux pour les valeurs du formulaire
    const [title, setTitle] = useState(projet.title);
    const [description, setDescription] = useState(projet.description);
    const [link, setLink] = useState(projet.link);
    const [technologies, setTechnologie] = useState(projet.technologies || "");
    const [selectedCategories, setSelectedCategories] = useState(projet.category || []);
    const [images, setImages] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [toggleState, setToggleState] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Gérer l'affichage du formulaire
    const toggleTab = (index) => {
        setToggleState(index);
    };

    // Gestion des catégories
    const handleCategoryChange = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    // Gestion des images sélectionnées
    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    // Fonction de soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            setErrorMessage("Vous devez être connecté pour modifier un projet.");
            return;
        }

        setIsSubmitted(true); // Affiche le message de soumission en cours

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('technologies', technologies);
        selectedCategories.forEach(category => formData.append('category', category));
        images.forEach(image => formData.append('images', image));
        formData.append('link', link);

        try {
            const response = await fetch(`https://app-morning-leaf-2821.fly.dev/api/projets/${projet._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                setSuccessMessage("Projet modifié avec succès !");
                setIsSubmitted(false); // Réinitialise l'état après succès
                window.location.reload(); // Recharger la page après la modification
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Erreur lors de la modification du projet.");
                setIsSubmitted(false); // Réinitialise l'état en cas d'erreur
            }
        } catch (error) {
            setErrorMessage("Erreur lors de la modification du projet.");
            setIsSubmitted(false); // Réinitialise l'état en cas d'erreur
        }
    };

    return (
        <div className="">
            <span
                onClick={() => toggleTab(1)}>
                <i className="uil uil-edit"></i>
            </span>

            <div className={toggleState === 1 ? "projets__modal active-modal" : "projets__modal"}>
                <div className="projets__modal-content">
                    <i className="uil uil-times projets__modal-close" onClick={() => toggleTab(0)}></i>

                    <h3 className="projets__modal-title">Modification d'un projet</h3>

                    {errorMessage && <p style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>{errorMessage}</p>}
                    {successMessage && <p style={{ textAlign: 'center', padding: '2rem', color: 'green' }}>{successMessage}</p>}

                    <form ref={form} className="projet__form" onSubmit={handleSubmit}>

                        <div className="projet__form-div">
                            <label htmlFor="title" className="projet__form-tag-put">Titre</label>
                            <input
                                type="text"
                                name="title"
                                className="projet__form-input"
                                placeholder={projet.title}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="projet__form-div projet__form-area">
                            <label htmlFor="description" className="projet__form-tag-put">Description</label>
                            <textarea
                                name="description"
                                cols="30"
                                rows="10"
                                className="projet__form-input"
                                placeholder={projet.description}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div className="projet__form-div">
                            <label htmlFor="images" className="projet__form-tag-put">Images</label>
                            <input
                                type="file"
                                name="images"
                                className="projet__form-input"
                                multiple
                                onChange={handleImageChange}
                            />
                        </div>

                        <div className="projet__form-div">
                            <div className="projet__form-div-select">
                                <label className="projet__form-tag-put">Catégories</label>
                                {categories.map(category => (
                                    <div key={category._id} className="addProjet__select-input">
                                        <input
                                            type="checkbox"
                                            className="addProjet__checkbox"
                                            id={category._id}
                                            checked={selectedCategories.includes(category._id)}
                                            onChange={() => handleCategoryChange(category._id)}
                                        />
                                        <label className="projet__label-checkbox" htmlFor={category._id}>{category.name}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="projet__form-div-tech">
                            <label htmlFor="technologies" className="projet__form-tag-put">Technologies </label>
                            <input
                                type="text"
                                name="technologies"
                                className="projet__form-input"
                                placeholder={projet.technologies || "ex: React, Node.js"}
                                value={technologies}
                                onChange={(e) => setTechnologie(e.target.value)}
                                required
                            />
                        </div>

                        <div className="projet__form-div-link">
                            <div className="projet__form-div">
                                <label htmlFor="link" className="projet__form-tag-put">Lien</label>
                                <input
                                    type="text"
                                    name="link"
                                    className="projet__form-input"
                                    placeholder={projet.link}
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="projet__btn-sub">
                            <button className="button button--flex" type="submit" disabled={isSubmitted}>
                                {isSubmitted ? "Modification en cours..." : "Modifier le projet"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PutProjet;
