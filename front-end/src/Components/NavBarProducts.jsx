import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { getData } from '../hooks/useLocalStorage';

export default function NavBarProducts() {
  const history = useHistory();
  const [name, setName] = useState('');

  const handleExit = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };
  useEffect(() => {
    const local = getData('user');
    setName(local.name);
  }, [setName]);

  const ROUTE_ELEMENTS = {
    1: 'customer_products__element-navbar-link-products',
    2: 'customer_products__element-navbar-link-orders',
    3: 'customer_products__element-navbar-user-full-name',
    4: 'customer_products__element-navbar-link-logout',
  };
  return (
    <nav>
      <div>
        <h3 data-testid={ ROUTE_ELEMENTS[1] }>
          <Link to="/customer/products">Produtos</Link>
        </h3>
        <h3 data-testid={ ROUTE_ELEMENTS[2] }>
          <Link to="/customer/orders">Meus Pedidos</Link>
        </h3>
        <h3 data-testid={ ROUTE_ELEMENTS[3] }>{ name }</h3>
        <button
          type="button"
          data-testid={ ROUTE_ELEMENTS[4] }
          onClick={ handleExit }
        >
          Sair

        </button>

      </div>

    </nav>
  );
}
