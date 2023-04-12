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
    <div className="p-3 m-3 shadow border rounded w-96">
      <p data-testid={ `${ROUTE_ELEMENTS[1]}${index}` }>
        <span className="text-lg">{'Produto '}</span>
        {index + 1}
      </p>
      <p className="text-xl my-1" data-testid={ `${ROUTE_ELEMENTS[2]}${index}` }>
        <span className="text-lg">{'Descrição: '}</span>
        {product[3]}
      </p>
      <p data-testid={ `${ROUTE_ELEMENTS[3]}${index}` }>
        <span className="text-lg">{'Quantidade: '}</span>
        {product[1]}
      </p>
      <p data-testid={ `${ROUTE_ELEMENTS[4]}${index}` }>
        <span className="text-lg">Valor Unitario: R$</span>
        {`${String(Number(product[2]).toFixed(2)).replace('.', ',')}`}
      </p>
      <p data-testid={ `${ROUTE_ELEMENTS[5]}${index}` }>
        <span className="text-lg">Subtotal: R$</span>
        {(product[2] * product[1]).toFixed(2).replace('.', ',')}
      </p>
      <button
        type="button"
        data-testid={ `${ROUTE_ELEMENTS[6]}${index}` }
        name={ product[3] }
        onClick={ removeProduct }
        className="
        border p-1 rounded border-red-600 px-2 my-2 opacity-75 hover:opacity-100"
      >
        Remover Item
      </button>
    </div>
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
