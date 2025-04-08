import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import './Products.css';

const productsData = [
  {
    id: 1,
    title: 'Биоциды и консерванты',
    description: 'Включают ряд готовых решений в удобной для внедрения в композицию форме. Применяются для предотвращения биопоражения водных систем и покрытий.',
    image: '../../assets/images/product1.jpg'
  },
  {
    id: 2,
    title: 'Пеногасители, поверхностно-активные добавки',
    description: 'Пеногасители эффективно устраняют пену при производстве лакокрасочных материалов. Наши поверхностно-активные добавки повышают смачиваемость подложки, облегчают диспергирование пигментов.',
    image: '../../assets/images/product2.jpg'
  },
  {
    id: 3,
    title: 'Сырьевина для средств гигиены и дезинфекции',
    description: 'Дезинфекция необходима человечеству для обеспечения безопасной среды обитания в повседневной жизни. Мы предлагаем компоненты для создания дезинфицирующих средств различного назначения.',
    image: '../../assets/images/product3.jpg'
  },
  {
    id: 4,
    title: 'Загустители, реологические добавки',
    description: 'Реологические добавки используются для того, чтобы улучшить консистенцию лакокрасочных составов. Наши продукты эффективно контролируют реологические свойства лакокрасочных систем.',
    image: '../../assets/images/product4.jpg'
  },
  {
    id: 5,
    title: 'Колеровочное оборудование',
    description: 'Мы предлагаем оборудование ведущих производителей в Украине. SANTINT предлагает автоматические и ручные диспенсеры, миксеры, программное обеспечение, высокоточные колеровочные системы.',
    image: '../../assets/images/product5.jpg'
  }
];

const Products = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="section products" id="products">
      <div className="container">
        <motion.h2
          className="section__title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          Продукция
        </motion.h2>

        <motion.p
          className="section__subtitle"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Мы предлагаем широкий ассортимент химической продукции для различных отраслей промышленности
        </motion.p>

        <div className="products__tabs">
          {productsData.map((product) => (
            <button
              key={product.id}
              className={`products__tab ${activeTab === product.id ? 'products__tab--active' : ''}`}
              onClick={() => handleTabChange(product.id)}
            >
              {product.title}
            </button>
          ))}
        </div>

        <div className="products__content">
          {productsData.map((product) => (
            <motion.div
              key={product.id}
              className={`product-card ${activeTab === product.id ? 'product-card--active' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: activeTab === product.id ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="product-card__image-wrapper">
                <div
                  className="product-card__image"
                  style={{ backgroundImage: `url(${product.image})` }}
                ></div>
              </div>
              <div className="product-card__content">
                <h3 className="product-card__title">{product.title}</h3>
                <p className="product-card__description">{product.description}</p>
                <a href="#contacts" className="button button--outline product-card__button">Получить консультацию</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
