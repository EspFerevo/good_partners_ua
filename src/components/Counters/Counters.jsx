import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Counters.css';

const Counter = ({ end, suffix, title, duration = 2000, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / duration, 1);

      // Функция плавности (easeOutExpo)
      const easeOutExpo = 1 - Math.pow(2, -10 * progressRatio);

      setCount(Math.floor(easeOutExpo * end));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    // Задержка начала анимации
    const timer = setTimeout(() => {
      animationFrame = requestAnimationFrame(updateCount);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isVisible, delay]);

  return (
    <div className="counter" ref={countRef}>
      <h3 className="counter__value">
        {count}
        <span className="counter__suffix">{suffix}</span>
      </h3>
      <p className="counter__title">{title}</p>
    </div>
  );
};

const Counters = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Данные для счетчиков
  const countersData = [
    { end: 15, suffix: '+', title: 'Лет на рынке', delay: 0 },
    { end: 250, suffix: '+', title: 'Довольных клиентов', delay: 300 },
    { end: 1000, suffix: '+', title: 'Успешных проектов', delay: 600 },
    { end: 25, suffix: '', title: 'Партнеров', delay: 900 }
  ];

  return (
    <section className="section counters" id="counters">
      <div className="container">
        <motion.h2
          className="section__title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          Наши достижения
        </motion.h2>

        <motion.div
          className="counters__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          {countersData.map((counter, index) => (
            <Counter
              key={index}
              end={counter.end}
              suffix={counter.suffix}
              title={counter.title}
              delay={counter.delay}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Counters;
