import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { getData } from '../hooks/useLocalStorage';
import NavBarSeller from '../Components/NavBarSeller';

export default function SellerOrders() {
  const [pedidos, setPedidos] = useState([]);
  const [user, setUser] = useState({});

  const history = useHistory();

  useEffect(() => {
    const todosPedidos = (async () => {
      const localUser = getData('user');
      if (!localUser) return;
      const { data: { sales } } = await axios
        .get(`http://localhost:3001/sales/seller/${localUser.id}`);
      console.log(sales);
      setPedidos(sales);
      setUser(localUser);
    });
    todosPedidos();
  }, []);

  if (user.role === 'customer') {
    localStorage.clear();
    history.push('/login');
  }

  return (
    <>
      <NavBarSeller />
      {
        (pedidos.map((e) => (
          <Link to={ `/seller/orders/${e.id}` } key={ e.id }>
            <p>Pedido</p>
            <p data-testid={ `seller_orders__element-order-id-${e.id}` }>{e.id}</p>
            <p
              data-testid={ `seller_orders__element-delivery-status-${e.id}` }
            >
              {e.status}
            </p>
            <p
              data-testid={ `seller_orders__element-order-date-${e.id}` }
            >
              {new Date(e.saleDate).toLocaleDateString('pt-BR')}
            </p>
            <p
              data-testid={ `seller_orders__element-card-price-${e.id}` }
            >
              {e.totalPrice.replace('.', ',')}
            </p>
            <p data-testid={ `seller_orders__element-card-address-${e.id}` }>
              {`${e.deliveryAddress}, ${e.deliveryNumber}`}
            </p>
          </Link>
        )))
      }
    </>
  );
} // teste
