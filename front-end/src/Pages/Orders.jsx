import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getData } from '../hooks/useLocalStorage';
import NavBarProducts from '../Components/NavBarProducts';

function Orders() {
  const [pedidos, setPedidos] = useState([]);
  useEffect(() => {
    const todosPedidos = (async () => {
      const { id } = getData('user');
      const { data: { sales } } = await axios.get(`http://localhost:3001/sales/${id}`);
      setPedidos(sales);
    });
    todosPedidos();
  }, []);

  return (
    <>
      <NavBarProducts />
      <h1 className="w-11/12 md:w-6/12 text-4xl mx-auto mt-0 md:mt-10">Pedidos:</h1>
      <div className="w-10/12 md:w-6/12 mx-auto flex justify-start flex-wrap mt-3">
        {
          (pedidos.map((e) => (
            <Link
              to={ `/customer/orders/${e.id}` }
              key={ e.id }
              className="m-3 shadow border rounded border-black p-3 w-full md:w-72"
            >
              <p
                data-testid={ `customer_orders__element-order-id-${e.id}` }
                className="text-lg"
              >
                {' Pedido: 000'}
                {e.id}
              </p>
              <p
                data-testid={ `customer_orders__element-delivery-status-${e.id}` }
                className={ `
              ${e.status === 'Pendente' ? 'text-red-500' : ''}
              ${e.status === 'Em Trânsito' ? 'text-yellow-500' : ''}
              ${e.status === 'Preparando' ? 'text-yellow-600' : ''}
              ${e.status === 'Entregue' ? 'text-green-400' : ''}` }
              >
                {'Status: '}
                {e.status}
              </p>
              <p
                data-testid={ `customer_orders__element-order-date-${e.id}` }
              >
                {'Data: '}
                {new Date(e.saleDate).toLocaleDateString('pt-BR')}
              </p>
              <p
                data-testid={ `customer_orders__element-card-price-${e.id}` }
                className="text-xl"
              >
                Total: R$
                {e.totalPrice.replace('.', ',')}
              </p>
            </Link>
          )))
        }
      </div>
    </>
  );
}
export default Orders;
