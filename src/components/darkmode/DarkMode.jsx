import React, { useEffect, useState } from "react";
import "./darkmode.css";

const getStrorageTheme = () => {
    let theme = 'light-theme';
    if (localStorage.getItem('theme')) {
        theme = localStorage.getItem('theme');
        return theme;
    }
}

const DarkMode = () => {

    const [darkMode, setDarkMode] = useState(getStrorageTheme());

    const toggleTheme = () => {
        if (darkMode === 'dark-theme') {
            setDarkMode('light-theme');
        } else {
            setDarkMode('dark-theme');
        }
    };

    useEffect(() => {
        document.documentElement.className = darkMode;
        localStorage.setItem('theme', darkMode);
    }, [darkMode]);

    return (
        <div className="darkmode" onClick={toggleTheme}>
            {darkMode === 'dark-theme' ? <i className="uil uil-sun darkmode__icon"></i> : <i className="uil uil-moon darkmode__icon"></i> }
        </div>
    );
};

export default DarkMode;