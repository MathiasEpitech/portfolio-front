import React from 'react';

const Logout = () => {
  
  const handleLogout = async () => {
    try {
      // Optionnel : vous pouvez envoyer une requête au back-end pour la déconnexion
      const response = await fetch('https://app-morning-leaf-2821.fly.dev/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Suppression du token du localStorage
        localStorage.removeItem('token');
        window.location.reload(); // Rafraîchissement pour mettre à jour l'état de connexion
      } else {
        console.error('Erreur lors de la déconnexion');
      }
    } catch (error) {
      console.error('Erreur de déconnexion', error);
    }
  };

  return (
    <li className="nav__item">
      <span
        onClick={handleLogout}
        className="nav__link">
        <i className="uil uil-sign-out-alt nav__icon"></i> Déconnexion
      </span>
    </li>
  );
};

export default Logout;
