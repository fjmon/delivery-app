import React from 'react';
import PropTypes from 'prop-types';

const ROUTE_ELEMENTS = {
  1: 'customer_checkout__element-order-table-item-number-',
  2: 'customer_checkout__element-order-table-name-',
  3: 'customer_checkout__element-order-table-quantity-',
  4: 'customer_checkout__element-order-table-unit-price-',
  5: 'customer_checkout__element-order-table-sub-total-',
  6: 'customer_checkout__element-order-table-remove-',
};

// falta o botão de remover item
// falta resolver o problema de não conseguir pegar o index do produto no cart.
export default function DetailsCheckout({ product }) {
  console.log(product);
  return (
    <>
      <p> Item </p>
      <div data-testid={ `${ROUTE_ELEMENTS[0]}${product[0]}` }>
        {product[0]}
      </div>
      <p> Descrição </p>
      <div data-testid={ `${ROUTE_ELEMENTS[1]}${product[0]}` }>
        {product[3]}
      </div>
      <p> Quantidade </p>
      <div data-testid={ `${ROUTE_ELEMENTS[2]}${product[0]}` }>
        {product[1]}
      </div>
      <p> Valor Unitario </p>
      <div data-testid={ `${ROUTE_ELEMENTS[3]}${product[0]}` }>
        {product[2]}
      </div>
      <p> Subtotal </p>
      <div data-testid={ `${ROUTE_ELEMENTS[4]}${product[0]}` }>
        {product[2] * product[1]}
      </div>

      <button
        type="button"
        data-testid={ `${ROUTE_ELEMENTS[5]}${product[0]}` }
        name={ product[3] }
        id={ product[0] }
      >
        Remover Item
      </button>
    </>
  );
}

DetailsCheckout.propTypes = {
  product: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ])).isRequired,
};
