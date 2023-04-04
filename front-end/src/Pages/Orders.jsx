import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getData } from '../hooks/useLocalStorage';
import NavBarProducts from '../Components/NavBarProducts';

const numero = 10;
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

          <div key={ e.id }>
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
              {e.saleDate.slice(0, numero)
                .replace('-', '/').replace('-', '/')}

            </p>
            <p
              data-testid={ `customer_orders__element-card-price-${e.id}` }
            >
              {e.totalPrice}

            </p>
          </div>
        )))
      }
    </>
  );
}
export default Orders;
