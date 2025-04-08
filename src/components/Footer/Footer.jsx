import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const partners = [
    { name: 'LONZA', image: '../../assets/images/partner1.png' },
    { name: 'ROWIS', image: '../../assets/images/partner2.png' },
    { name: 'SANTINT', image: '../../assets/images/partner3.png' },
    { name: 'CHEMIPOL', image: '../../assets/images/partner4.png' },
    { name: 'RICCI', image: '../../assets/images/partner5.png' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__partners">
          <h3 className="footer__partners-title">Наши партнеры</h3>
          <div className="footer__partners-logos">
            {partners.map((partner, index) => (
              <div key={index} className="partner-logo">
                <img src={partner.image} alt={partner.name} />
              </div>
            ))}
          </div>
        </div>

        <div className="footer__main">
          <div className="footer__info">
            <div className="footer__logo">
              <span className="footer__logo-text">GoodPartners</span>
            </div>
            <p className="footer__description">
              Химическое сырьё для лакокрасочного производства, строительных материалов, косметики и бытовой химии.
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__links-column">
              <h4 className="footer__links-title">Навигация</h4>
              <ul className="footer__links-list">
                <li><a href="#about">Про компанию</a></li>
                <li><a href="#products">Продукция</a></li>
                <li><a href="#services">Сервис</a></li>
                <li><a href="#contacts">Контакты</a></li>
              </ul>
            </div>

            <div className="footer__links-column">
              <h4 className="footer__links-title">Контакты</h4>
              <ul className="footer__links-list">
                <li>
                  <a href="tel:+380674456608">+38 (067) 445-66-08</a>
                </li>
                <li>
                  <a href="mailto:elena@chemicals.com.ua">elena@chemicals.com.ua</a>
                </li>
                <li>
                  <span>04071, г. Киев, ул. Ярославская, 31, офис 25</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {currentYear} GoodPartners. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
