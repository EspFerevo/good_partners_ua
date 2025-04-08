import { useState, useCallback, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './Contacts.css';
import markerIcon from '../../assets/images/icon-map-marker.svg';

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

  const [mapCenter, setMapCenter] = useState({
    lat: 50.4578595,
    lng: 30.5101344
  });

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [map, setMap] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(true);

  // Map configuration
  const companyLocation = {
    address: "ул. Ярославская, 31, офис 25, Киев, 04071",
    position: { lat: 50.4578595, lng: 30.5101344 },
    title: "Good Partners UA"
  };

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: true,
    mapTypeControl: true,
    fullscreenControl: true,
    styles: [
      {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [{ color: "#7c93a3" }, { lightness: "-10" }]
      },
      {
        featureType: "administrative.country",
        elementType: "geometry",
        stylers: [{ visibility: "on" }]
      },
      {
        featureType: "administrative.country",
        elementType: "geometry.stroke",
        stylers: [{ color: "#a0a4a5" }]
      },
      {
        featureType: "administrative.province",
        elementType: "geometry.stroke",
        stylers: [{ color: "#62838e" }]
      },
      {
        featureType: "landscape",
        elementType: "geometry.fill",
        stylers: [{ color: "#f5f5f5" }]
      },
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [{ color: "#b7d2e5" }]
      }
    ]
  };

  // Custom marker icon
  const customIcon = {
    url: markerIcon,
    scaledSize: { width: 40, height: 40 }
  };

  // Map container style
  const containerStyle = {
    width: '100%',
    height: '100%'
  };

  // Handlers
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

  const handleMarkerClick = useCallback((marker) => {
    setSelectedMarker(marker);
  }, []);

  const handleCloseInfoWindow = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  const onMapLoad = useCallback((map) => {
    setMap(map);
    setMapLoaded(true);
    setIsMapLoading(false);
  }, []);

  // Reset focus to marker on map load
  useEffect(() => {
    if (mapLoaded && map) {
      map.panTo(companyLocation.position);
    }
  }, [mapLoaded, map]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // API key would normally be stored in environment variables
  // For demonstration purposes, we use a placeholder/public key
  const googleMapsApiKey = "AIzaSyAF5zjSU7iBKEr_ftBzrFE_PTpfDzPPc2Y";

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

        {/* Интерактивная карта */}
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
            {isMapLoading && (
              <div className="map-loading">
                <span></span>
              </div>
            )}

            <LoadScript
              googleMapsApiKey={googleMapsApiKey}
              onLoad={() => setIsMapLoading(false)}
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={16}
                options={mapOptions}
                onLoad={onMapLoad}
              >
                <Marker
                  position={companyLocation.position}
                  title={companyLocation.title}
                  onClick={() => handleMarkerClick(companyLocation)}
                  animation={2} // DROP animation
                  icon={customIcon}
                />
                {selectedMarker && (
                  <InfoWindow
                    position={selectedMarker.position}
                    onCloseClick={handleCloseInfoWindow}
                  >
                    <div className="map-info-window">
                      <h4>{selectedMarker.title}</h4>
                      <p>{selectedMarker.address}</p>
                      <div className="map-info-actions">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${selectedMarker.position.lat},${selectedMarker.position.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="map-direction-link"
                        >
                          Проложить маршрут
                        </a>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          </div>

          <div className="contacts__map-actions">
            <button
              className="map-action-button"
              onClick={() => map && map.panTo(companyLocation.position)}
              aria-label="Сфокусировать карту на нашем офисе"
            >
              Показать офис на карте
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contacts;
