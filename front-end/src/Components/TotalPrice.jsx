import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

export default function TotalPrice({ dataTest }) {
  const { cart } = useContext(Context);
  return (
    <>
      <spam>R$</spam>
      <p
        type="button"
        data-testid={ dataTest }
        disabled={ cart.products.length === 0 }
      >
        { `${
          cart.products
            .reduce((acc, item) => acc + (item[1] * item[2]), 0)
            .toFixed(2).replace('.', ',')}` }
      </p>

    </>
  );
}

TotalPrice.propTypes = {
  dataTest: PropTypes.string.isRequired,
};
