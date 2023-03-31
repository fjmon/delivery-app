import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(0);

  const ROUTE_ELEMENTS = {
    1: 'customer_products__img-card-bg-image-',
    2: 'customer_products__element-card-title-',
    3: 'customer_products__element-card-price-',
    4: 'customer_products__button-card-rm-item-',
    5: 'customer_products__input-card-quantity-',
    6: 'customer_products__button-card-add-item-',
  };

  const quantityMaisUm = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const quantityMenosUm = () => {
    console.log(`preço: ${product.price} quantidade: ${quantity}`);
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    } else {
      setQuantity(0);
    }
  };

  const handleQuantity = ({ target: { value } }) => {
    setQuantity(value);
  };

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
        {`${(product.price).toFixed(2).toString().replace('.', ',')}`}
      </p>
      <button
        name={ product.name }
        type="button"
        data-testid={ `${ROUTE_ELEMENTS[4]}${product.id}` }
        id={ product.id }
        onClick={ quantityMenosUm }
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
        onClick={ quantityMaisUm }
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
