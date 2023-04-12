import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

export default function TotalPrice({ dataTest }) {
  const { cart } = useContext(Context);
  return (
    <span
      type="button"
      disabled={ cart.products.length === 0 }
    >
      R$
      <span data-testid={ dataTest }>
        {
          `
          ${
    cart.products
      .reduce((acc, item) => acc + (item[1] * item[2]), 0)
      .toFixed(2).replace('.', ',')
    }
          `
        }
      </span>
    </span>
  );
}

TotalPrice.propTypes = {
  dataTest: PropTypes.string.isRequired,
};
