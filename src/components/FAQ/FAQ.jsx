import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FAQ.css';

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className={`faq-item ${isOpen ? 'faq-item--active' : ''}`}>
      <button
        className="faq-item__question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        {question}
        <span className="faq-item__icon"></span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="faq-item__answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="faq-item__content">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  // Данные для FAQ
  const faqItems = [
    {
      id: 1,
      question: 'Какие условия оплаты вы предлагаете?',
      answer: 'Мы предлагаем гибкие условия оплаты, включая предоплату, оплату по факту доставки или отсрочку платежа для постоянных клиентов. Конкретные условия зависят от объема заказа и истории нашего сотрудничества. Для новых клиентов обычно мы работаем по предоплате в размере 30-50%.'
    },
    {
      id: 2,
      question: 'Как быстро осуществляется доставка продукции?',
      answer: 'Сроки доставки зависят от наличия товара на складе и вашего местоположения. В среднем доставка по Киеву осуществляется в течение 1-2 рабочих дней, по Украине – 2-5 рабочих дней. Для срочных заказов возможна экспресс-доставка. Точные сроки доставки мы сообщаем при подтверждении заказа.'
    },
    {
      id: 3,
      question: 'Предоставляете ли вы техническую документацию на продукцию?',
      answer: 'Да, мы предоставляем полный пакет технической документации на всю поставляемую продукцию, включая паспорта безопасности, сертификаты качества, инструкции по применению и хранению. При необходимости наши технические специалисты могут предоставить дополнительные консультации по использованию продукции.'
    },
    {
      id: 4,
      question: 'Есть ли у вас минимальный объем заказа?',
      answer: 'Да, у нас есть минимальный объем заказа, который зависит от типа продукции. Для большинства позиций минимальный заказ начинается от одной упаковки (канистры, мешка, барреля). Для некоторых специализированных продуктов может быть установлен более высокий минимальный объем. Уточнить минимальный объем заказа для конкретной продукции можно у наших менеджеров.'
    },
    {
      id: 5,
      question: 'Можно ли получить образцы продукции перед оформлением крупного заказа?',
      answer: 'Да, мы предоставляем образцы продукции для тестирования перед оформлением крупных заказов. Условия получения образцов зависят от типа продукции и объема потенциального заказа. Для получения образцов необходимо заполнить заявку на нашем сайте или связаться с менеджером компании.'
    },
    {
      id: 6,
      question: 'Как организована техническая поддержка клиентов?',
      answer: 'Наша техническая поддержка доступна в рабочие дни с 9:00 до 18:00. Мы предоставляем консультации по телефону, электронной почте или с выездом специалиста на ваше производство. Для постоянных клиентов мы проводим обучающие семинары и предоставляем расширенную техническую поддержку, включая помощь в подборе оптимальных решений для вашего производства.'
    },
    {
      id: 7,
      question: 'Работаете ли вы с индивидуальными заказами или только с типовой продукцией?',
      answer: 'Мы работаем как с типовой продукцией, так и с индивидуальными заказами. Наша компания может разработать и поставить продукцию по вашим техническим требованиям. Для подготовки индивидуального предложения нам потребуются подробные технические спецификации и ожидаемый объем заказа.'
    }
  ];

  // Состояние для открытых вопросов
  const [openItems, setOpenItems] = useState({});

  // Функция для переключения состояния вопроса
  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Анимация для заголовка и поиска
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="section faq" id="faq">
      <div className="container">
        <motion.h2
          className="section__title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          Часто задаваемые вопросы
        </motion.h2>

        <motion.div
          className="faq__search-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          <p className="faq__description">
            Найдите ответы на самые распространенные вопросы о нашей продукции и услугах
          </p>
        </motion.div>

        <motion.div
          className="faq__list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
              }
            }
          }}
        >
          {faqItems.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <FAQItem
                question={item.question}
                answer={item.answer}
                isOpen={openItems[item.id] || false}
                onToggle={() => toggleItem(item.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="faq__contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          <p>Не нашли ответ на свой вопрос? Свяжитесь с нами напрямую</p>
          <a href="#contacts" className="button button--primary">Задать вопрос</a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
