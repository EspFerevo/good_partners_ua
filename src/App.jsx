import { useEffect } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Counters from './components/Counters/Counters';
import Products from './components/Products/Products';
import Calculator from './components/Calculator/Calculator';
import Services from './components/Services/Services';
import Testimonials from './components/Testimonials/Testimonials';
import Partners from './components/Partners/Partners';
import FAQ from './components/FAQ/FAQ';
import Contacts from './components/Contacts/Contacts';
import Footer from './components/Footer/Footer';
import SocialLinks from './components/SocialLinks/SocialLinks';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
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
        <Counters />
        <Products />
        <Calculator />
        <Services />
        <Testimonials />
        <Partners />
        <FAQ />
        <Contacts />
      </main>
      <Footer />
      <SocialLinks />
      <ThemeToggle />
    </>
  );
}

export default App;
