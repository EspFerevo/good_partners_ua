// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import './Services.css';

const servicesData = [
  {
    id: 1,
    icon: 'fast-delivery',
    title: 'Оперативно, ответственно, профессионально',
    description: 'Мы гарантируем нашим клиентам быструю доставку по договорным срокам. Каждый заказ получает персонального менеджера для отслеживания на всех этапах. Вы также можете в любой момент получить текущий прогресс заказа в течение 1-2 часов у персонального менеджера.'
  },
  {
    id: 2,
    icon: 'support',
    title: 'Сервисная поддержка',
    description: 'Мы предоставляем клиентам надежную техническую поддержку. Наши специалисты проконсультируют вас по любым вопросам, чтобы решить возможные производственные проблемы. Для этого у нас работает команда квалифицированных технических консультантов.'
  },
  {
    id: 3,
    icon: 'partnership',
    title: 'Международное сотрудничество',
    description: 'Благодаря партнерским отношениям с ведущими мировыми производителями химического сырья, мы можем предоставлять нашим клиентам продукцию высочайшего качества по конкурентоспособным ценам.'
  }
];

const Services = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="section services" id="services">
      <div className="container">
        <motion.h2
          className="section__title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          Сервис
        </motion.h2>

        <motion.div
          className="services__quote"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <blockquote>
            "Благодаря партнерским отношениям с нашими клиентами мы вместе растем и становимся сильнее."
            <footer>— Команда GoodPartners</footer>
          </blockquote>
        </motion.div>

        <div className="services__cards">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <div className={`service-card__icon service-card__icon--${service.icon}`}></div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__description">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
