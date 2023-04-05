import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

export default function TotalPrice({ dataTest }) {
  const { cart } = useContext(Context);
  return (
    <p
      type="button"
      disabled={ cart.products.length === 0 }
    >
      <span>R$</span>
      <span data-testid={ dataTest }>

        {
          `${
            cart.products
              .reduce((acc, item) => acc + (item[1] * item[2]), 0)
              .toFixed(2).replace('.', ',')}`
        }
      </span>
    </p>
  );
}

TotalPrice.propTypes = {
  dataTest: PropTypes.string.isRequired,
};
