import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import { setData } from '../hooks/useLocalStorage';

const ROUTE_ELEMENTS = {
  1: 'customer_checkout__element-order-table-item-number-',
  2: 'customer_checkout__element-order-table-name-',
  3: 'customer_checkout__element-order-table-quantity-',
  4: 'customer_checkout__element-order-table-unit-price-',
  5: 'customer_checkout__element-order-table-sub-total-',
  6: 'customer_checkout__element-order-table-remove-',
};

export default function DetailsCheckout({ product, index }) {
  const { cart, setCart } = useContext(Context);

  const removeProduct = () => {
    const newCart = cart.products;
    newCart.splice(index, 1);
    setData('cart', { products: newCart });
    setCart({ products: newCart });
  };

  return (
    <>
      <div data-testid={ `${ROUTE_ELEMENTS[1]}${index}` }>
        <p>
          {index + 1}
        </p>

      </div>
      <p> Descrição </p>
      <div data-testid={ `${ROUTE_ELEMENTS[2]}${index}` }>
        {product[3]}
      </div>
      <p> Quantidade </p>
      <div data-testid={ `${ROUTE_ELEMENTS[3]}${index}` }>
        {product[1]}
      </div>
      <p> Valor Unitario </p>
      <div data-testid={ `${ROUTE_ELEMENTS[4]}${index}` }>
        {`${String(Number(product[2]).toFixed(2)).replace('.', ',')}`}
      </div>
      <p> Subtotal </p>
      <div data-testid={ `${ROUTE_ELEMENTS[5]}${index}` }>
        {(product[2] * product[1]).toFixed(2).replace('.', ',')}
      </div>

      <button
        type="button"
        data-testid={ `${ROUTE_ELEMENTS[6]}${index}` }
        name={ product[3] }
        onClick={ removeProduct }
      >
        Remover Item
      </button>
    </>
  );
}

DetailsCheckout.propTypes = {
  index: PropTypes.number.isRequired,
  product: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.number,
    PropTypes.string,
  ])).isRequired,
};
