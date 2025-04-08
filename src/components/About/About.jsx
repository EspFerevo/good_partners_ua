// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="section about" id="about">
      <div className="container">
        <motion.h2
          className="section__title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          Про компанию
        </motion.h2>

        <div className="about__content">
          <motion.div
            className="about__image"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
          ></motion.div>

          <motion.div
            className="about__text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.p
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              GoodPartners занимается поставками химической сырьевой продукции с 2008 года. Основными видами деятельности компании являются импорт и дистрибуция химической сырьевой продукции для лакокрасочного производства, строительных материалов, косметики и бытовой химии.
            </motion.p>
            <motion.p
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Мы представляем продукцию производства ряда компаний, таких как: LONZA, ROWIS, CHEMIPOL, RICCI, MAFLON, SANTINT и т.д.
            </motion.p>
            <motion.p
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Наш богатый опыт работы с химическим сырьем дает возможность создавать новые решения для наших клиентов.
            </motion.p>

            <motion.div
              className="about__stats"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="stat">
                <span className="stat__number">15+</span>
                <span className="stat__label">лет опыта</span>
              </div>
              <div className="stat">
                <span className="stat__number">100+</span>
                <span className="stat__label">клиентов</span>
              </div>
              <div className="stat">
                <span className="stat__number">6+</span>
                <span className="stat__label">мировых поставщиков</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
