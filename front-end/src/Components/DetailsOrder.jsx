import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import { getData } from '../hooks/useLocalStorage';

export default function DetailEntrega() {
  const [seller, setSeller] = useState('');
  const [adress, setAdress] = useState('');
  const [number, setNumber] = useState('');
  const { cart } = useContext(Context);
  const [sellers, setSellers] = useState([]);

  // falta fazer o select funcionar

  const handleAdress = ({ target: { value } }) => {
    setAdress(value);
  };

  const handleNumber = ({ target: { value } }) => {
    setNumber(value);
  };

  const handleSeller = ({ target: { value } }) => {
    setSeller(() => value);
  };

  const history = useHistory();

  const getOrder = async () => {
    const { products } = cart;
    const user = getData('user');
    const bodyRequest = {
      totalPrice: cart.products.reduce((acc, item) => acc + (item[1] * item[2]), 0),
      deliveryAddress: adress,
      deliveryNumber: number,
      status: 'Pendente',
      userId: user.id,
      sellerId: seller,
      products,
    };
    const { token } = getData('user');
    const { data: { sale: { id } } } = await axios.post(
      'http://localhost:3001/sales',
      bodyRequest,
      { headers: { Authorization: token } },
    );
    history.push(`/customer/orders/${id}`);
  };

  useEffect(() => {
    const pessoasVendedoras = async () => {
      const result = await axios.get('http://localhost:3001/sellers');
      setSellers(result.data);
    };
    pessoasVendedoras();
  }, []);

  return (
    <>
      <div>
        <label htmlFor="seller">
          <p>Pessoa vendedora</p>
          <select
            type="text"
            data-testid="customer_checkout__select-seller"
            onChange={ handleSeller }
            value={ seller }
          >
            <option value="select">select</option>
            {sellers?.map((e) => (
              <option value={ e.id } key={ e.id }>{e.name}</option>
            ))}
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
