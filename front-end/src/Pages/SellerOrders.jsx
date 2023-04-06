import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getData } from '../hooks/useLocalStorage';

export default function SellerOrders() {
  const [pedidos, setPedidos] = useState([]);
  useEffect(() => {
    const todosPedidos = (async () => {
      const { id } = getData('user');
      const { data: { sales } } = await axios.get(`http://localhost:3001/sales/${id}`);
      console.log(sales);
      setPedidos(sales);
    });
    todosPedidos();
  }, []);

  return (
    <p>teste</p>
  );
}
