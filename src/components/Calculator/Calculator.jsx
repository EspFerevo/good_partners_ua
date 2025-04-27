import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Calculator.css";

const Calculator = () => {
  // Данные продуктов и цен
  const productCategories = [
    {
      id: 1,
      name: "Органические растворители",
      products: [
        { id: 101, name: "Ацетон", price: 89, unit: "л" },
        { id: 102, name: "Толуол", price: 110, unit: "л" },
        { id: 103, name: "Этилацетат", price: 95, unit: "л" },
        { id: 104, name: "Изопропиловый спирт", price: 78, unit: "л" },
      ],
    },
    {
      id: 2,
      name: "Неорганические кислоты",
      products: [
        { id: 201, name: "Серная кислота", price: 125, unit: "л" },
        { id: 202, name: "Соляная кислота", price: 85, unit: "л" },
        { id: 203, name: "Азотная кислота", price: 140, unit: "л" },
      ],
    },
    {
      id: 3,
      name: "Полимерные материалы",
      products: [
        { id: 301, name: "Полиэтилен", price: 210, unit: "кг" },
        { id: 302, name: "Полипропилен", price: 245, unit: "кг" },
        { id: 303, name: "Поливинилхлорид", price: 180, unit: "кг" },
      ],
    },
  ];

  const deliveryOptions = [
    { id: 1, name: "Самовывоз", price: 0 },
    { id: 2, name: "Доставка по Киеву", price: 500 },
    { id: 3, name: "Доставка по Украине", price: 1200 },
  ];

  // Состояния
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedDelivery, setSelectedDelivery] = useState(deliveryOptions[0]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Расчет итоговой стоимости
  useEffect(() => {
    if (selectedProduct) {
      const productTotal = selectedProduct.price * quantity;
      const deliveryPrice = selectedDelivery.price;
      setTotalPrice(productTotal + deliveryPrice);
    } else {
      setTotalPrice(0);
    }
  }, [selectedProduct, quantity, selectedDelivery]);

  // Обработчики событий
  const handleCategoryChange = (categoryId) => {
    const category = productCategories.find(
      (cat) => cat.id === Number(categoryId)
    );
    setSelectedCategory(category);
    setSelectedProduct(null);
    setShowResult(false);
  };

  const handleProductChange = (productId) => {
    const product = selectedCategory.products.find(
      (prod) => prod.id === Number(productId)
    );
    setSelectedProduct(product);
    setShowResult(false);
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, value); // Минимум 1
    setQuantity(newQuantity);
    setShowResult(false);
  };

  const handleDeliveryChange = (deliveryId) => {
    const delivery = deliveryOptions.find(
      (opt) => opt.id === Number(deliveryId)
    );
    setSelectedDelivery(delivery);
    setShowResult(false);
  };

  const handleCalculate = () => {
    setShowResult(true);
  };

  // Анимации
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const resultAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <section className="section calculator" id="calculator">
      <div className="container">
        <motion.h2
          className="section__title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          Калькулятор стоимости
        </motion.h2>

        <motion.p
          className="calculator__description"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          Рассчитайте примерную стоимость товаров и доставки
        </motion.p>

        <motion.div
          className="calculator__form-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          <div className="calculator__form">
            <div className="calculator__row">
              <div className="calculator__form-group">
                <label className="calculator__label">
                  Категория продукции:
                </label>
                <select
                  className="calculator__select"
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  value={selectedCategory?.id || ""}
                >
                  <option value="" disabled>
                    Выберите категорию
                  </option>
                  {productCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedCategory && (
              <div className="calculator__row">
                <div className="calculator__form-group">
                  <label className="calculator__label">Продукт:</label>
                  <select
                    className="calculator__select"
                    onChange={(e) => handleProductChange(e.target.value)}
                    value={selectedProduct?.id || ""}
                  >
                    <option value="" disabled>
                      Выберите продукт
                    </option>
                    {selectedCategory.products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} ({product.price} грн/{product.unit})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {selectedProduct && (
              <div className="calculator__row">
                <div className="calculator__form-group">
                  <label className="calculator__label">
                    Количество ({selectedProduct.unit}):
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="calculator__input"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(parseInt(e.target.value))
                    }
                  />
                </div>
              </div>
            )}

            {selectedProduct && (
              <div className="calculator__row">
                <div className="calculator__form-group">
                  <label className="calculator__label">Способ доставки:</label>
                  <select
                    className="calculator__select"
                    onChange={(e) => handleDeliveryChange(e.target.value)}
                    value={selectedDelivery.id}
                  >
                    {deliveryOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}{" "}
                        {option.price > 0
                          ? `(${option.price} грн)`
                          : "(бесплатно)"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {selectedProduct && (
              <div className="calculator__row calculator__row--center">
                <button
                  className="button button--primary calculator__button"
                  onClick={handleCalculate}
                  disabled={!selectedProduct}
                >
                  Рассчитать стоимость
                </button>
              </div>
            )}
          </div>
          {showResult && (
            <motion.div
              className="calculator__result"
              initial="hidden"
              animate="visible"
              variants={resultAnimation}
            >
              <h3 className="calculator__result-title">Результат расчета</h3>
              <div className="calculator__result-items">
                <div className="calculator__result-item">
                  <span className="calculator__result-label">Продукт:</span>
                  <span className="calculator__result-value">
                    {selectedProduct.name}
                  </span>
                </div>
                <div className="calculator__result-item">
                  <span className="calculator__result-label">
                    Цена за единицу:
                  </span>
                  <span className="calculator__result-value">
                    {selectedProduct.price} грн/{selectedProduct.unit}
                  </span>
                </div>
                <div className="calculator__result-item">
                  <span className="calculator__result-label">Количество:</span>
                  <span className="calculator__result-value">
                    {quantity} {selectedProduct.unit}
                  </span>
                </div>
                <div className="calculator__result-item">
                  <span className="calculator__result-label">
                    Стоимость товара:
                  </span>
                  <span className="calculator__result-value">
                    {selectedProduct.price * quantity} грн
                  </span>
                </div>
                <div className="calculator__result-item">
                  <span className="calculator__result-label">
                    Способ доставки:
                  </span>
                  <span className="calculator__result-value">
                    {selectedDelivery.name}
                  </span>
                </div>
                <div className="calculator__result-item">
                  <span className="calculator__result-label">
                    Стоимость доставки:
                  </span>
                  <span className="calculator__result-value">
                    {selectedDelivery.price} грн
                  </span>
                </div>
                <div className="calculator__result-item calculator__result-item--total">
                  <span className="calculator__result-label">
                    Итоговая стоимость:
                  </span>
                  <span className="calculator__result-value calculator__result-value--total">
                    {totalPrice} грн
                  </span>
                </div>
              </div>
              <div className="calculator__note">
                <p>
                  Обратите внимание: данный расчет является приблизительным. Для
                  получения точной информации, пожалуйста, свяжитесь с нашими
                  менеджерами.
                </p>
                <a href="#contacts" className="calculator__cta">
                  Оформить заказ
                </a>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Calculator;
