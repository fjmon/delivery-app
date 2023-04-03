import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { getData, setData } from '../hooks/useLocalStorage';
import Context from '../context/Context';

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(0);
  const { setCart } = useContext(Context);
  const ROUTE_ELEMENTS = {
    1: 'customer_products__img-card-bg-image-',
    2: 'customer_products__element-card-title-',
    3: 'customer_products__element-card-price-',
    4: 'customer_products__button-card-rm-item-',
    5: 'customer_products__input-card-quantity-',
    6: 'customer_products__button-card-add-item-',
  };

  const handleQuantity = ({ target: { value } }) => {
    setQuantity(() => value);
  };

  useEffect(() => {
    const cart = getData('cart');
    const index = cart.products.findIndex((item) => item[0] === product.id);

    if (index >= 0) {
      setQuantity(cart.products[index][1]);
    }
  }, []);

  useEffect(() => {
    const cart = getData('cart');

    const index = cart.products.findIndex((item) => item[0] === product.id);
    if (Number(quantity) > 0) {
      if (index >= 0) {
        cart.products[index][1] = quantity;
      } else {
        cart.products.push([product.id, quantity, product.price, product.name]);
      }
    }

    if (index >= 0 && Number(quantity) === 0) {
      cart.products.splice(index, 1);
    }
    setCart(cart);
    setData('cart', cart);
  }, [quantity]);

  return (
    <div>
      <img
        data-testid={ `${ROUTE_ELEMENTS[1]}${product.id}` }
        style={ { width: '20px' } }
        src={ product.urlImage }
        alt={ product.name }
      />
      <h1 data-testid={ `${ROUTE_ELEMENTS[2]}${product.id}` }>
        {product.name}
      </h1>
      <p data-testid={ `${ROUTE_ELEMENTS[3]}${product.id}` }>
        {`${String(Number(product.price).toFixed(2)).replace('.', ',')}`}
      </p>
      <button
        name={ product.name }
        type="button"
        data-testid={ `${ROUTE_ELEMENTS[4]}${product.id}` }
        id={ product.id }
        onClick={ () => {
          if (quantity > 0) {
            setQuantity(quantity - 1);
          }
        } }
      >
        -
      </button>
      <input
        data-testid={ `${ROUTE_ELEMENTS[5]}${product.id}` }
        type="number"
        min={ 0 }
        value={ quantity }
        onChange={ handleQuantity }
        placeholder="0"
      />
      <button
        type="button"
        data-testid={ `${ROUTE_ELEMENTS[6]}${product.id}` }
        name={ product.name }
        id={ product.id }
        onClick={ () => {
          setQuantity((prev) => prev + 1);
        } }
      >
        +
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    urlImage: PropTypes.string,
  }).isRequired,
};
