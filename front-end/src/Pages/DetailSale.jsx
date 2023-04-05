import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBarProducts from '../Components/NavBarProducts';
import { getData } from '../hooks/useLocalStorage';

export default function DetailSale(props) {
  const [venda, setVenda] = useState('');
  const [seller, setSeller] = useState('');
  const [products, setProducts] = useState([]);

  const pessoasVendedoras = async () => {
    const { data } = await axios.get('http://localhost:3001/sellers');
    const newSeller = data.find((e) => +e.id === +venda.sellerId);
    setSeller(newSeller);
  };

  const sales = async () => {
    const userId = getData('user').id;
    const { id: vendaId } = props.match.params;
    const { data } = await axios.get(`http://localhost:3001/sales/${userId}`);
    const sale = data.sales.find((e) => +e.id === +vendaId);
    setVenda(sale);
  };
  const getProducts = async () => {
    const { id: vendaId } = props.match.params;
    const { data } = await axios.get(`http://localhost:3001/products/${vendaId}`);
    setProducts(data.products);
  };

  useEffect(() => {
    sales();
    getProducts();
  }, []);

  useEffect(() => {
    pessoasVendedoras();
  }, [venda]);

  return (
    <>
      <NavBarProducts />
      <div>
        <p>pedidos</p>
        <p>{venda.id}</p>
        <p>{seller?.name}</p>
        <p>{venda.saleData}</p>
        <p>{venda.status}</p>
        <button type="button">Marcar como Entregue</button>
      </div>
      <table>
        <thead>
          <tr>
            <td>item</td>
            <td>descrição</td>
            <td>Quantidade</td>
            <td>Valor Unitário</td>
            <td>Sub-Total</td>
          </tr>
        </thead>
        <tbody>
          {
            products[0] && (

              products.map((e, index) => (
                <tr key={ e.id }>
                  <td>{index}</td>
                  <td>{e.name}</td>
                  <td>{e.index}</td>
                  <td>{e.quantity}</td>
                  <td>{e.price}</td>
                  <td>{e.price * e.quantity}</td>
                </tr>

              ))
            )
          }
        </tbody>
      </table>

    </>
  );
}
