import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './ThemeToggle.css';

const ThemeToggle = () => {
  // Получаем предпочтения пользователя из localStorage или системных настроек
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      return savedTheme;
    }

    // Проверяем системные настройки
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  const [theme, setTheme] = useState('light'); // По умолчанию светлая тема

  // Инициализация темы при монтировании компонента
  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  // Применение темы
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Переключение темы
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Анимация для значков
  const variants = {
    hidden: {
      opacity: 0,
      rotate: -90,
      scale: 0.5
    },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      }
    },
    exit: {
      opacity: 0,
      rotate: 90,
      scale: 0.5,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      }
    }
  };

  return (
    <button
      className={`theme-toggle ${theme === 'dark' ? 'theme-toggle--dark' : ''}`}
      onClick={toggleTheme}
      aria-label={`Переключить на ${theme === 'light' ? 'темный' : 'светлый'} режим`}
    >
      {theme === 'light' ? (
        <motion.div
          className="theme-toggle__icon"
          key="sun"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        </motion.div>
      ) : (
        <motion.div
          className="theme-toggle__icon"
          key="moon"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </motion.div>
      )}
    </button>
  );
};

export default ThemeToggle;
