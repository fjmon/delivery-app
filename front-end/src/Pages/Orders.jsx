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
      const { data: { sales } } = await axios.get(`http://localhost:3001/sale/${id}`);
      setPedidos(sales);
    });
    todosPedidos();
  }, []);

  return (
    <>
      <NavBarProducts />
      {
        (pedidos.map((e) => (
          <Link to={ `/customer/orders/${e.id}` } key={ e.id }>
            <p>Pedido</p>
            <p data-testid={ `customer_orders__element-order-id-${e.id}` }>{e.id}</p>
            <p
              data-testid={ `customer_orders__element-delivery-status-${e.id}` }
            >
              {e.status}

            </p>
            <p
              data-testid={ `customer_orders__element-order-date-${e.id}` }
            >
              {new Date(e.saleDate).toLocaleDateString('pt-BR')}
            </p>
            <p
              data-testid={ `customer_orders__element-card-price-${e.id}` }
            >
              {e.totalPrice.replace('.', ',')}

            </p>

          </Link>
        )))
      }
    </>
  );
}
export default Orders;
