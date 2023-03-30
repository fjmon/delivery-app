import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getData } from '../hooks/useLocalStorage';

export default function NavBarProducts() {
  const [name, setName] = useState('');
  const handleExit = () => {
    localStorage.removeItem('user');
    useHistory.push('/login');
  };
  useEffect(() => {
    const local = getData('user');
    setName(local.user.name);
    console.log(local.user.name);
  }, [setName]);

  const ROUTE_ELEMENTS = {
    1: 'customer_products__element-navbar-link-products',
    2: 'customer_products__element-navbar-link-input-orders',
    3: 'customer_products__element-navbar-link-button-full-name',
    4: 'customer_products__element-navbar-link-button-logout',
  };
  return (
    <nav>
      <div>
        <h3 data-testid={ ROUTE_ELEMENTS[1] }>Produtos</h3>
        <h3 data-testid={ ROUTE_ELEMENTS[2] }>Meus Pedidos</h3>
        <h3 data-testid={ ROUTE_ELEMENTS[3] }>{name || 'usuário'}</h3>

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
