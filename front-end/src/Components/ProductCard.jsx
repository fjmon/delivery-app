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
    <div className="w-96 h-auto shadow p-10 m-7 rounded hover:bg-slate-50">
      <img
        data-testid={ `${ROUTE_ELEMENTS[1]}${product.id}` }
        style={ { width: '5rem' } }
        src={ product.urlImage }
        alt={ product.name }
      />
      <h1 data-testid={ `${ROUTE_ELEMENTS[2]}${product.id}` }>
        {product.name}
      </h1>
      <p data-testid={ `${ROUTE_ELEMENTS[3]}${product.id}` }>
        <span>R$</span>
        {`${String(Number(product.price).toFixed(2)).replace('.', ',')}`}
      </p>
      <button
        className="
        my-2 text-md
        bg-gray-50 border border-gray-300 text-gray-900
        rounded-lg focus:ring-blue-500 focus:border-blue-500
        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
        dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        className="
        my-2 text-md
        bg-gray-50 border border-gray-300 text-gray-900
        rounded-lg focus:ring-blue-500 focus:border-blue-500
        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
        dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <button
        className="
        my-2 text-md
        bg-gray-50 border border-gray-300 text-gray-900
        rounded-lg focus:ring-blue-500 focus:border-blue-500
        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
        dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired,
};
