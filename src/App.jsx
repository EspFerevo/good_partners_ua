import { useEffect } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Products from './components/Products/Products';
import Services from './components/Services/Services';
import Contacts from './components/Contacts/Contacts';
import Footer from './components/Footer/Footer';
import './styles/global.css';

function App() {
  useEffect(() => {
    // Плавный скролл при клике на якорные ссылки
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Отступ для хедера
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Products />
        <Services />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}

export default App;
