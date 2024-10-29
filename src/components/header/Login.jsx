import React, { useState, useRef } from "react";

const Login = () => {
    const form = useRef();

    const [toggleState, setToggleState] = useState(0);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://app-morning-leaf-2821.fly.dev/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Stocker le token dans le localStorage
                localStorage.setItem('token', data.token);

                window.location.reload();

                // Fermer le modal après la connexion
                setToggleState(0);
            } else {
                // Gérer les erreurs
                setErrorMessage(data.message || "Erreur de connexion");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
        }
    };

    return (
        <li className="nav__item">
            <span
                onClick={() => toggleTab(1)}
                className="nav__link">
                <i className="uil uil-user-circle nav__icon"></i> Connexion
            </span>

            <div className={toggleState === 1 ? "projets__modal active-modal" : "projets__modal"}>
                <div className="projets__modal-content">
                    <i className="uil uil-times projets__modal-close" onClick={() => toggleTab(0)}></i>

                    <h3 className="projets__modal-title">Connexion</h3>

                    {errorMessage && <p style={{ textAlign: 'center',color: 'red', padding: '2rem', }}>{errorMessage}</p>}

                    <form ref={form} className="log__form" onSubmit={handleLogin}>

                        <div className="log__form-div">
                            <label htmlFor="" className="log__form-tag">Username</label>
                            <input
                                type="text"
                                name="username"
                                className="log__form-input"
                                placeholder="Insérer votre nom"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="log__form-div">
                            <label htmlFor="" className="log__form-tag">Mot de passe</label>
                            <input
                                type="password"
                                name="password"
                                className="log__form-input"
                                placeholder="Insérer votre mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="projet__btn-log">
                            <button className="button button--flex" type="submit">
                                Connexion
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </li>
    );
};

export default Login;
