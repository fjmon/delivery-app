/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { getData } from '../hooks/useLocalStorage';

export default function NavBarProducts() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [showNavLinks, setShowNavLinks] = useState(false);

  const handleExit = () => {
    localStorage.clear();
    history.push('/login');
  };

  useEffect(() => {
    const local = getData('user');
    setName(local.name);
  }, []);

  const ROUTE_ELEMENTS = {
    1: 'customer_products__element-navbar-link-products',
    2: 'customer_products__element-navbar-link-orders',
    3: 'customer_products__element-navbar-user-full-name',
    4: 'customer_products__element-navbar-link-logout',
  };

  return (
    <nav
      className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0 w-full mb-4"
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <h1 className="self-center text-2xl md:text-4xl cursor-pointer font-semibold whitespace-nowrap dark:text-white">
          DELI
          <span className="text-amber-400 underline">BEER</span>
          Y 🍺
        </h1>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className={ `
          ${showNavLinks ? 'hidden' : 'block'}
          inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600` }
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={ () => setShowNavLinks((prev) => !prev) }
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
        </button>
        <div
          className={ `
          ${showNavLinks ? 'block' : 'hidden'} md:block w-64 md:w-auto text-right md:text-xl" id="navbar-default` }
        >
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={ () => setShowNavLinks((prev) => !prev) }
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
          </button>
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-900 md:dark:bg-gray-900 dark:border-gray-700">
            <Link className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" data-testid={ ROUTE_ELEMENTS[1] } to="/customer/products">Produtos</Link>
            <Link
              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              data-testid={ ROUTE_ELEMENTS[2] }
              to="/customer/orders"
            >
              Meus Pedidos
            </Link>
            <h1
              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:cursor-pointer"
              data-testid={ ROUTE_ELEMENTS[3] }
            >
              { name }
            </h1>
            <button
              className="text-right block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              type="button"
              data-testid={ ROUTE_ELEMENTS[4] }
              onClick={ handleExit }
            >
              Sair
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
}
