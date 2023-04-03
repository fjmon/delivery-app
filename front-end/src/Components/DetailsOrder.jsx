// import axios from 'axios';
import React, { useState } from 'react';
import { setData } from '../hooks/useLocalStorage';

export default function DetailEntrega() {
  const [seller, setSeller] = useState('');
  const [adress, setAdress] = useState('');
  const [number, setNumber] = useState('');
  const [vendedores] = useState([{ name: 'caren' }, { name: 'maria' }]);

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

  // const pessoasVendedoras = async () => {
  //   const result = await axios.get('localhost:3001/seller', {});
  //   setVendedores(result);
  // };
  // useEffect(() => {
  //   pessoasVendedoras();
  // });

  return (
    <>
      <div>
        <label htmlFor="seller">
          <p>Pessoa vendedora</p>
          <select
            type="text"
            data-testid="customer_checkout__select-seller"
            onChange={ handleSeller }
          >
            {vendedores?.map((e) => <option key={ e.name }>{e.name}</option>)}
          </select>

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
