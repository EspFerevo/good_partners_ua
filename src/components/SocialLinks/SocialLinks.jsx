import { motion } from 'framer-motion';
import telegramIcon from '../../assets/images/icon-telegram.svg';
import viberIcon from '../../assets/images/icon-viber.svg';
import './SocialLinks.css';

const SocialLinks = () => {
  // Номер телефона для мессенджеров
  const phoneNumber = '+380674456608';

  // Варианты для анимации
  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="social-links"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.a
        href={`viber://chat?number=${phoneNumber}`}
        className="social-links__item"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Связаться с нами в Viber"
      >
        <img src={viberIcon} alt="Viber" className="social-links__icon" />
        <span className="social-links__tooltip">Viber</span>
      </motion.a>

      <motion.a
        href={`https://t.me/${phoneNumber.substring(1)}`}
        className="social-links__item"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Связаться с нами в Telegram"
      >
        <img src={telegramIcon} alt="Telegram" className="social-links__icon" />
        <span className="social-links__tooltip">Telegram</span>
      </motion.a>
    </motion.div>
  );
};

export default SocialLinks;
