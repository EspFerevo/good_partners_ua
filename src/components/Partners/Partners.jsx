import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Partners.css';

// Импорт логотипов партнеров
import partner1 from '../../assets/images/partner1.svg';
import partner2 from '../../assets/images/partner2.svg';
import partner3 from '../../assets/images/partner3.svg';
import partner4 from '../../assets/images/partner4.svg';
import partner5 from '../../assets/images/partner5.svg';

const Partners = () => {
  const firstRowRef = useRef(null);
  const secondRowRef = useRef(null);

  // Бесконечная анимация прокрутки
  useEffect(() => {
    const firstRow = firstRowRef.current;
    const secondRow = secondRowRef.current;

    if (!firstRow || !secondRow) return;

    // Клонируем элементы для бесконечной прокрутки
    const firstRowItems = [...firstRow.children];
    const secondRowItems = [...secondRow.children];

    firstRowItems.forEach(item => {
      const clone = item.cloneNode(true);
      firstRow.appendChild(clone);
    });

    secondRowItems.forEach(item => {
      const clone = item.cloneNode(true);
      secondRow.appendChild(clone);
    });

    // Задаем ширину, чтобы вместить все элементы
    firstRow.style.width = `${firstRowItems.length * 2 * 250}px`;
    secondRow.style.width = `${secondRowItems.length * 2 * 250}px`;

    // Анимация прокрутки
    let firstRowPosition = 0;
    let secondRowPosition = 0;
    const speed = 0.5;

    const animate = () => {
      // Первый ряд движется влево
      firstRowPosition -= speed;
      if (firstRowPosition <= -firstRow.clientWidth / 2) {
        firstRowPosition = 0;
      }
      firstRow.style.transform = `translateX(${firstRowPosition}px)`;

      // Второй ряд движется вправо
      secondRowPosition += speed;
      if (secondRowPosition >= 0) {
        secondRowPosition = -secondRow.clientWidth / 2;
      }
      secondRow.style.transform = `translateX(${secondRowPosition}px)`;

      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // Данные партнеров
  const partners = [
    {
      id: 1,
      name: 'БАСФ',
      logo: partner1,
      description: 'Мировой лидер в производстве химической продукции для различных индустрий.',
      url: 'https://www.basf.com'
    },
    {
      id: 2,
      name: 'Байер',
      logo: partner2,
      description: 'Крупнейший производитель фармацевтической и химической продукции.',
      url: 'https://www.bayer.com'
    },
    {
      id: 3,
      name: 'ДюПонт',
      logo: partner3,
      description: 'Международная компания, специализирующаяся на высокотехнологичных материалах и химической продукции.',
      url: 'https://www.dupont.com'
    },
    {
      id: 4,
      name: 'ЕвроХим',
      logo: partner4,
      description: 'Один из ведущих производителей минеральных удобрений в мире.',
      url: 'https://www.eurochemgroup.com'
    },
    {
      id: 5,
      name: 'Химпром',
      logo: partner5,
      description: 'Крупнейший российский производитель химической продукции.',
      url: 'https://www.himprom.com'
    },
    // Дублируем партнеров для второго ряда
    {
      id: 6,
      name: 'АльфаХим',
      logo: partner1,
      description: 'Инновационная компания, специализирующаяся на органической химии.',
      url: 'https://example.com/alphachem'
    },
    {
      id: 7,
      name: 'ХимТрейд',
      logo: partner2,
      description: 'Поставщик сырья для химической промышленности.',
      url: 'https://example.com/chemtrade'
    },
    {
      id: 8,
      name: 'ОргСинтез',
      logo: partner3,
      description: 'Производитель органических соединений и полимеров.',
      url: 'https://example.com/orgsintez'
    },
    {
      id: 9,
      name: 'МегаХим',
      logo: partner4,
      description: 'Специализируется на промышленной химии и реагентах.',
      url: 'https://example.com/megachem'
    },
    {
      id: 10,
      name: 'ЭкоХим',
      logo: partner5,
      description: 'Производитель экологически чистых химических продуктов.',
      url: 'https://example.com/ecochemical'
    }
  ];

  // Разделение партнеров на два массива для двух рядов
  const firstRowPartners = partners.slice(0, 5);
  const secondRowPartners = partners.slice(5, 10);

  // Анимации для заголовка и описания
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="section partners" id="partners">
      <div className="container">
        <motion.h2
          className="section__title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          Наши партнеры
        </motion.h2>

        <motion.p
          className="partners__description"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          Мы гордимся сотрудничеством с ведущими компаниями в химической отрасли
        </motion.p>

        <div className="partners__carousel">
          <div className="partners__row" ref={firstRowRef}>
            {firstRowPartners.map((partner) => (
              <div key={partner.id} className="partner-card">
                <div className="partner-card__logo">
                  <img src={partner.logo} alt={partner.name} />
                </div>
                <div className="partner-card__content">
                  <h3 className="partner-card__name">{partner.name}</h3>
                  <p className="partner-card__description">{partner.description}</p>
                  <a href={partner.url} target="_blank" rel="noopener noreferrer" className="partner-card__link">
                    Узнать больше
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="partners__row partners__row--reverse" ref={secondRowRef}>
            {secondRowPartners.map((partner) => (
              <div key={partner.id} className="partner-card">
                <div className="partner-card__logo">
                  <img src={partner.logo} alt={partner.name} />
                </div>
                <div className="partner-card__content">
                  <h3 className="partner-card__name">{partner.name}</h3>
                  <p className="partner-card__description">{partner.description}</p>
                  <a href={partner.url} target="_blank" rel="noopener noreferrer" className="partner-card__link">
                    Узнать больше
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="partners__cta"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          <a href="#contacts" className="button button--primary">Стать партнером</a>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
