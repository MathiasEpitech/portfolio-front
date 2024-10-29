import React, { useState, useRef } from "react";

const AddCategory = () => {
    const form = useRef();

    const [toggleState, setToggleState] = useState(0);
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            setErrorMessage("Vous devez être connecté pour ajouter une catégorie.");
            return;
        }

        try {
            const response = await fetch('https://app-morning-leaf-2821.fly.dev/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
                body: JSON.stringify({ name }),
            });

            if (response.ok) {
                setSuccessMessage("Catégorie ajoutée avec succès !");
                setName("");
                window.location.reload();
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Erreur lors de l'ajout de la catégorie.");
            }
        } catch (error) {
            setErrorMessage("Erreur lors de l'ajout de la catégorie.");
        }
    };

    return (
        <div>
            <span
                onClick={() => toggleTab(1)}
                className="active-projet projet__item">
                <i className="uil uil-plus add__icon"></i>
            </span>

            <div className={toggleState === 1 ? "projets__modal active-modal" : "projets__modal"}>
                <div className="projets__modal-content">
                    <i className="uil uil-times projets__modal-close" onClick={() => toggleTab(0)}></i>

                    <h3 className="projets__modal-title">Ajout d'une catégorie</h3>

                    {errorMessage && <p style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>{errorMessage}</p>}
                    {successMessage && <p style={{ textAlign: 'center', padding: '2rem', color: 'green' }}>{successMessage}</p>}

                    <form ref={form} className="contact__form" onSubmit={handleSubmit}>
                        <div className="contact__form-div">
                            <label htmlFor="name" className="projet__form-tag">Nom</label>
                            <input
                                type="text"
                                name="name"
                                className="contact__form-input"
                                placeholder="Insérer le nom de la catégorie"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="projet__btn-sub">
                            <button className="button button--flex" type="submit">
                                Ajouter la catégorie
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;
