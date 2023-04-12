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
      { pedidos.length > 0 ? (
        <>
          <h1 className="w-11/12 md:w-6/12 text-4xl mx-auto mt-0 md:mt-10">Pedidos:</h1>
          <div className="w-10/12 md:w-6/12 mx-auto flex justify-start flex-wrap mt-3">
            {(pedidos.map((e) => (
              <Link
                to={ `/seller/orders/${e.id}` }
                key={ e.id }
                className="
                m-3 relative shadow border rounded border-black p-3 w-full md:w-72
                hover:bg-slate-100
                "
              >
                <p
                  data-testid={ `customer_orders__element-order-id-${e.id}` }
                  className="text-lg"
                >
                  {' Pedido: 000'}
                  {e.id}
                </p>
                <p
                  data-testid={ `seller_orders__element-delivery-status-${e.id}` }
                  className={ `
                  ${e.status === 'Pendente' ? 'text-red-500' : ''}
                  ${e.status === 'Em Trânsito' ? 'text-yellow-500' : ''}
                  ${e.status === 'Preparando' ? 'text-yellow-600' : ''}
                  ${e.status === 'Entregue' ? 'text-green-400' : ''}
                  absolute top-3 right-3
                  ` }
                >
                  {'Status: '}
                  {e.status}
                </p>
                <p
                  data-testid={ `seller_orders__element-order-date-${e.id}` }
                >
                  {'Data: '}
                  {new Date(e.saleDate).toLocaleDateString('pt-BR')}
                </p>
                <p
                  data-testid={ `seller_orders__element-card-price-${e.id}` }
                >
                  Total: R$
                  {e.totalPrice.replace('.', ',')}
                </p>
                <p data-testid={ `seller_orders__element-card-address-${e.id}` }>
                  {`${e.deliveryAddress}, ${e.deliveryNumber}`}
                </p>
              </Link>
            )))}
          </div>
        </>
      ) : (
        <div className="mx-auto mt-80 text-center align-middle">
          <h1 className="text-3xl">Nenhum pedido encontrado.</h1>
        </div>
      ) }
    </>
  );
} // teste
