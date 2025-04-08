import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Testimonials.css';

const StarRating = ({ rating }) => {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`rating__star ${star <= rating ? 'rating__star--active' : ''}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial, isActive }) => {
  return (
    <motion.div
      className={`testimonial ${isActive ? 'testimonial--active' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0.3, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="testimonial__content">
        <StarRating rating={testimonial.rating} />
        <p className="testimonial__text">{testimonial.text}</p>
        <div className="testimonial__footer">
          <div className="testimonial__client">
            {testimonial.avatar ? (
              <div className="testimonial__avatar">
                <img src={testimonial.avatar} alt={testimonial.name} />
              </div>
            ) : (
              <div className="testimonial__avatar testimonial__avatar--placeholder">
                {testimonial.name.charAt(0)}
              </div>
            )}
            <div className="testimonial__client-info">
              <h4 className="testimonial__client-name">{testimonial.name}</h4>
              <p className="testimonial__client-company">{testimonial.company}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  // Отзывы клиентов
  const testimonials = [
    {
      id: 1,
      name: 'Алексей Петров',
      company: 'ООО «ХимТехПром»',
      avatar: '',
      rating: 5,
      text: 'Мы сотрудничаем с Good Partners уже более 5 лет. За это время не было ни одной задержки поставки или проблем с качеством. Отличный сервис и профессиональный подход к работе.'
    },
    {
      id: 2,
      name: 'Елена Сидорова',
      company: 'АО «ФармаСинтез»',
      avatar: '',
      rating: 5,
      text: 'Благодаря Good Partners наше производство работает без простоев. Оперативные поставки, высокое качество продукции и гибкие условия сотрудничества – всё это о нашем надёжном партнёре.'
    },
    {
      id: 3,
      name: 'Иван Смирнов',
      company: 'ЗАО «АгроХимПродукт»',
      avatar: '',
      rating: 4,
      text: 'Отличные цены и стабильное качество. Очень ценим возможность получить техническую консультацию по любому вопросу. Рекомендую Good Partners как надежного поставщика.'
    },
    {
      id: 4,
      name: 'Марина Ковалёва',
      company: 'ООО «БиоТехМед»',
      avatar: '',
      rating: 5,
      text: 'Сотрудничаем с компанией уже 3 года. Нас полностью устраивает качество продукции и оперативность доставки. Менеджеры всегда готовы пойти навстречу и подстроиться под наши требования.'
    },
    {
      id: 5,
      name: 'Дмитрий Козлов',
      company: 'ОАО «СтройХимСнаб»',
      avatar: '',
      rating: 4,
      text: 'Продукция всегда соответствует заявленным характеристикам, что очень важно для нашего производственного процесса. Ценим компанию за ответственный подход к работе.'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const intervalRef = useRef(null);

  // Автоматическое переключение слайдов
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [testimonials.length]);

  // Обработка навигации
  const handlePrev = () => {
    clearInterval(intervalRef.current);
    setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));

    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
  };

  const handleNext = () => {
    clearInterval(intervalRef.current);
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);

    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
  };

  // Обработка свайпов на мобильных
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // свайп влево
      handleNext();
    }

    if (touchStart - touchEnd < -100) {
      // свайп вправо
      handlePrev();
    }
  };

  // Паузировать автопереключение при наведении мыши
  const handleMouseEnter = () => {
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
  };

  return (
    <section className="section testimonials" id="testimonials">
      <div className="container">
        <motion.h2
          className="section__title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          Отзывы клиентов
        </motion.h2>

        <div
          className="testimonials__slider"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="testimonials__track" style={{ transform: `translateX(calc(-${activeIndex * 100}%))` }}>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                isActive={index === activeIndex}
              />
            ))}
          </div>

          <button className="testimonials__nav testimonials__nav--prev" onClick={handlePrev} aria-label="Предыдущий отзыв">
            &larr;
          </button>
          <button className="testimonials__nav testimonials__nav--next" onClick={handleNext} aria-label="Следующий отзыв">
            &rarr;
          </button>
        </div>

        <div className="testimonials__dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`testimonials__dot ${index === activeIndex ? 'testimonials__dot--active' : ''}`}
              onClick={() => {
                clearInterval(intervalRef.current);
                setActiveIndex(index);
                intervalRef.current = setInterval(() => {
                  setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
                }, 5000);
              }}
              aria-label={`Перейти к отзыву ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
