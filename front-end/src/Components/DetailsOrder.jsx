import React, { useState } from 'react';
import { setData } from '../hooks/useLocalStorage';

export default function DetailEntrega() {
  const [seller, setSeller] = useState('');
  const [adress, setAdress] = useState('');
  const [number, setNumber] = useState('');

  const handleAdress = ({ target: { value } }) => {
    setAdress(value);
  };

  const handleNumber = ({ target: { value } }) => {
    setNumber(value);
  };

  const handleSeller = ({ target: { value } }) => {
    setSeller(value);
  };

  const getOrder = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const { products } = cart;
    const order = setData('order', { products, seller, adress, number });
    console.log(order);
  };

  return (
    <>
      <div>
        <p>Pessoa vendedora</p>
        <label htmlFor="seller">
          <input
            type="text"
            data-testid="customer_checkout__select-seller"
            onChange={ handleSeller }
          />
        </label>
        <p>Endereço</p>
        <label htmlFor="address">
          <input
            type="text"
            data-testid="customer_checkout__input-address"
            onChange={ handleAdress }
          />
        </label>
        <p>Numero</p>
        <label htmlFor="number">
          <input
            type="number"
            data-testid="customer_checkout__input-address-number"
            onChange={ handleNumber }
          />
        </label>

      </div>
      <button
        type="button"
        data-testid="customer_checkout__button-submit-order"
        name="Finalizar Pedido"
        onClick={ getOrder }
      >
        {' '}
        Finalizar Pedido
      </button>
    </>
  );
}
