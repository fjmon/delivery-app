import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CardButtons from './CardButtons';

export default function ProductCard({ product }) {
  const {
    id,
    name,
    price,
    urlImage,

  } = product;

  const ROUTE_ELEMENTS = {
    1: 'customer_products__img-card-bg-image-',
    2: 'customer_products__element-card-title',
    3: 'customer_products__element-card-price-',
    4: 'customer_products__button-card-rm-item-',
    5: 'customer_products__input-card-quantity-',
    6: 'customer_products__button-card-add-item-',
  };

  const [quantity, setQuantity] = useState(0);
  const handleQuantity = ({ target: { value } }) => setQuantity(value);

  return (
    <div>
      <img
        data-testid={ `${ROUTE_ELEMENTS[1]}${id}` }
        src={ urlImage }
        alt={ name }
      />
      <h1 data-testid={ `${ROUTE_ELEMENTS[2]}${id}` }>
        {name}
      </h1>
      <p data-testid={ `${ROUTE_ELEMENTS[3]}${id}` }>
        {price}
      </p>
      <input
        data-testid={ `${ROUTE_ELEMENTS[4]}${id}` }
        type="number"
        value={ quantity }
        onChange={ handleQuantity }
      />
      <CardButtons />
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
