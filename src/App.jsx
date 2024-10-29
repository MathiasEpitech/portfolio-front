import React from 'react';
import './App.css';
import Header from './components/header/Header.jsx';
import Accueil from './components/accueil/Accueil.jsx';
import Apropos from './components/apropos/Apropos.jsx';
import Skills from './components/skills/Skills.jsx';
import Qualification from './components/qualification/Qualification.jsx';
import Projet from './components/projets/Projet.jsx';
import Contact from './components/contact/Contact.jsx';
import Footer from './components/footer/Footer.jsx';
import ScrollUp from './components/scrollup/ScrollUp.jsx';
import DarkMode from './components/darkmode/DarkMode.jsx';

const App = () => {
  return (
    <>

      <Header />

      <main className='main'>

        <Accueil />

        <Apropos />

        <Skills />

        <Qualification />

        <Projet />

        <Contact />

      </main>

      <Footer />

      <DarkMode />

      <ScrollUp />

    </>
  )
}

export default App