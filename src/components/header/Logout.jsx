import React from 'react';

const Logout = () => {
  
  const handleLogout = async () => {
    try {
   
      const response = await fetch('https://app-morning-leaf-2821.fly.dev/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {

        localStorage.removeItem('token');
        window.location.reload();
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
