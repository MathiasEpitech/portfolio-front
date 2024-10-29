import React, { useState, useRef } from "react";

const AddProjet = ({ categories }) => {
    const form = useRef();

    const [toggleState, setToggleState] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [link, setLink] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const handleCategoryChange = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    const handleImageChange = (e) => {
        const newFiles = Array.from(e.target.files);
        const updatedImages = [...images];

        newFiles.forEach((file) => {
            if (!updatedImages.some((img) => img.name === file.name)) {
                console.log(`Ajout de l'image: ${file.name}`);
                updatedImages.push(file);
            } else {
                console.log(`Image déjà présente: ${file.name}`);
            }
        });

        console.log("Images après ajout:", updatedImages);
        setImages(updatedImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Soumission du formulaire");

        if (isSubmitting) return;
        setIsSubmitting(true);

        const token = localStorage.getItem('token');

        if (!token) {
            setErrorMessage("Vous devez être connecté pour ajouter un projet.");
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        selectedCategories.forEach(category => formData.append('category', category));
        formData.append('technologies', technologies);

        images.forEach(image => {
            console.log(`Ajout de l'image au FormData: ${image.name}`);
            formData.append('images', image);
        });
        formData.append('link', link);

        try {
            const response = await fetch('https://app-morning-leaf-2821.fly.dev/api/projets', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                setSuccessMessage("Projet ajouté avec succès !");

                setTitle("");
                setDescription("");
                setImages([]);
                setSelectedCategories([]);
                setLink("");
                window.location.reload();
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Erreur lors de l'ajout du projet.");
            }
        } catch (error) {
            setErrorMessage("Erreur lors de l'ajout du projet.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="projet__area-add">
            <div className="projet__btn-add">
                <span
                    onClick={() => toggleTab(1)}
                    className="active-projet projet__item">
                    <i className="uil uil-plus add__icon"></i>
                </span>

                <div className={toggleState === 1 ? "projets__modal active-modal" : "projets__modal"}>
                    <div className="projets__modal-content">
                        <i className="uil uil-times projets__modal-close" onClick={() => toggleTab(0)}></i>

                        <h3 className="projets__modal-title">Ajout d'un projet</h3>

                        {errorMessage && <p style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>{errorMessage}</p>}
                        {successMessage && <p style={{ textAlign: 'center', padding: '2rem', color: 'green' }}>{successMessage}</p>}

                        <form ref={form} className="projet__form" onSubmit={handleSubmit}>

                            <div className="projet__form-div">
                                <label htmlFor="title" className="projet__form-tag">Titre</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="projet__form-input"
                                    placeholder="Insérer le nom du projet"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="projet__form-div projet__form-area">
                                <label htmlFor="description" className="projet__form-tag">Description</label>
                                <textarea
                                    name="description"
                                    cols="30"
                                    rows="10"
                                    className="projet__form-input"
                                    placeholder="Insérer la description du projet"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="projet__form-div">
                                <label htmlFor="images" className="projet__form-tag">Images</label>
                                <input
                                    type="file"
                                    name="images"
                                    className="projet__form-input"
                                    multiple
                                    onChange={handleImageChange}
                                    required
                                />
                            </div>

                            <div className="projet__form-div">
                                <div className="projet__form-div-select">
                                    <label className="projet__form-tag">Catégories</label>
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
                                <label htmlFor="technologies" className="projet__form-tag">Technologies</label>
                                <input
                                    type="text"
                                    name="technologies"
                                    className="projet__form-input"
                                    placeholder="Technologies utilisées (séparées par des virgules)"
                                    value={technologies}
                                    onChange={(e) => setTechnologies(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="projet__form-div-link">
                                <div className="projet__form-div">
                                    <label htmlFor="link" className="projet__form-tag">Lien</label>
                                    <input
                                        type="text"
                                        name="link"
                                        className="projet__form-input"
                                        placeholder="Insérer le lien du projet"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="projet__btn-sub">
                                <button className="button button--flex" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Ajout en cours...' : 'Ajouter le projet'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProjet;
