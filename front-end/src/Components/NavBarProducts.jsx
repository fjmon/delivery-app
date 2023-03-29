import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBarProducts() {
  //
  const mockProducts = [
    {
      id: 1,
      name: 'Skol',
      price: 10,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Brhama',
      price: 20,
      quantity: 1,
    },
  ];

  const mockPedidos = [
    {
      id: 1,
      name: 'FULANO CICRANO',
      price: 50,
      order: {
        1: mockProducts[0],
        2: mockProducts[1],
      },
    }];

  const ROUTE_ELEMENTS = {
    1: 'customer_products__element-navbar-link-products',
    2: 'customer_products__element-navbar-link-input-orders',
    3: 'customer_products__element-navbar-link-button-full-name',
    4: 'customer_products__element-navbar-link-button-logout',
  };
  const namePedidos = mockPedidos[0].name;
  const countProdutos = mockProducts.length;
  console.log(countProdutos);
  return (
    <nav>
      <div data-testid={ ROUTE_ELEMENTS[1] }>
        Produtos
      </div>
      <div data-testid={ ROUTE_ELEMENTS[2] }>
        <p>MEUS PEDIDOS</p>
      </div>
      <div data-testid={ ROUTE_ELEMENTS[3] }>
        <p>{ namePedidos }</p>
      </div>
      <div data-testid={ ROUTE_ELEMENTS[4] }>
        <Link to="/login">
          <button type="button"> Sair </button>
        </Link>
      </div>

    </nav>
  );
}
