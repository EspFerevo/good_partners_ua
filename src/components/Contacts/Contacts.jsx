import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import './Contacts.css';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        error: true,
        message: 'Пожалуйста, заполните все обязательные поля'
      });
      return;
    }

    // Simulation of sending form data to backend
    setFormStatus({
      submitted: true,
      error: false,
      message: 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.'
    });

    // Reset form
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="section contacts" id="contacts">
      <div className="container">
        <motion.h2
          className="section__title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          Контакты
        </motion.h2>

        <div className="contacts__content">
          <motion.div
            className="contacts__info"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div
              className="contact-item"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="contact-item__icon contact-item__icon--address"></div>
              <div className="contact-item__text">
                <h3 className="contact-item__title">Адрес</h3>
                <p className="contact-item__details">04071, г. Киев, ул. Ярославская, буд. 31, офис 25</p>
              </div>
            </motion.div>

            <motion.div
              className="contact-item"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="contact-item__icon contact-item__icon--phone"></div>
              <div className="contact-item__text">
                <h3 className="contact-item__title">Телефон</h3>
                <p className="contact-item__details">
                  <a href="tel:+380674456608">+38 (067) 445-66-08</a><br />
                  <a href="tel:+380675382385">+38 (067) 538-23-85</a><br />
                  <a href="tel:+380442210061">+38 (044) 221-00-61</a><br />
                  <a href="tel:+380442210091">+38 (044) 221-00-91</a>
                </p>
              </div>
            </motion.div>

            <motion.div
              className="contact-item"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="contact-item__icon contact-item__icon--email"></div>
              <div className="contact-item__text">
                <h3 className="contact-item__title">Email</h3>
                <p className="contact-item__details">
                  <a href="mailto:elena@chemicals.com.ua">elena@chemicals.com.ua</a>
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="contacts__form-wrapper"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="contacts__form-title">Свяжитесь с нами</h3>
            <form className="contacts__form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Имя*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="company" className="form-label">Компания</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="form-input"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">Телефон</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Сообщение*</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="button button--primary form-submit">Отправить</button>

              {formStatus.submitted && (
                <p className={`form-message ${formStatus.error ? 'form-message--error' : 'form-message--success'}`}>
                  {formStatus.message}
                </p>
              )}
            </form>
          </motion.div>
        </div>

        {/* Карта */}
        <motion.div
          className="contacts__map-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <h3 className="contacts__map-title">Найти нас на карте</h3>
          <div className="contacts__map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.487346233659!2d30.507945015776596!3d50.45785959543772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce5f23704949%3A0xed02ae379162666c!2z0JrQvtGA0L_Rg9GBIEU!5e0!3m2!1sru!2sua!4v1611312908600!5m2!1sru!2sua"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contacts;
