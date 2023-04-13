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
      <div className="lg:flex lg:justify-between">
        <label className="w-full m-2" htmlFor="seller">
          <span>Vendedor: </span>
          <select
            className="w-full mb-3 p-1 border border-black rounded"
            type="text"
            data-testid="customer_checkout__select-seller"
            onChange={ handleSeller }
            value={ seller }
          >
            <option value="select">Selecione</option>
            {sellers?.map((e) => (
              <option value={ e.id } key={ e.id }>{e.name}</option>
            ))}
          </select>
        </label>
        <br />
        <label className="w-full m-2" htmlFor="address">
          Endereço:
          <input
            className="w-full border border-black rounded mb-3 p-1"
            placeholder="Rua. Martins Miragaia Dráusio de Camargo, n°1932"
            type="text"
            id="address"
            data-testid="customer_checkout__input-address"
            onChange={ handleAdress }
          />
        </label>
        <br />
        <label
          className="w-full m-2"
          htmlFor="number"
          placeholder="1932"
        >
          Número
          <input
            id="number"
            className="w-full border border-black rounded mb-3 p-1"
            type="number"
            data-testid="customer_checkout__input-address-number"
            onChange={ handleNumber }
          />
        </label>
        <br />
      </div>
      <button
        className="
        w-full border border-black rounded p-1 opacity-70 hover:opacity-100 mb-3"
        type="button"
        data-testid="customer_checkout__button-submit-order"
        name="Finalizar Pedido"
        onClick={ getOrder }
      >
        Finalizar Pedido
      </button>
    </>
  );
}
