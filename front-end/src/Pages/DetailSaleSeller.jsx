/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-len */
/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import NavBarSeller from '../Components/NavBarSeller';
import { getData } from '../hooks/useLocalStorage';

export default function DetailSaleSeller({ match: { params } }) {
  const [venda, setVenda] = useState('');
  const [products, setProducts] = useState([]);

  const sales = async () => {
    const userId = getData('user').id;
    const { id: vendaId } = params;
    const { data } = await axios.get(`http://localhost:3001/sales/seller/${userId}`);
    const sale = data.sales.find((e) => +e.id === +vendaId);
    setVenda(sale);
  };

  const getProducts = async () => {
    const { id: vendaId } = params;
    const { data } = await axios.get(`http://localhost:3001/products/${vendaId}`);
    setProducts(data.products);
  };

  useEffect(() => {
    sales();
    getProducts();
  }, []);

  return (
    <>
      <NavBarSeller />
      <div className="p-0 lg:w-10/12 mx-auto lg:mt-40">
        <p className="text-2xl">
          <span>Pedido 000</span>
          <span
            data-testid="seller_order_details__element-order-details-label-order-id"
          >
            {venda.id}
          </span>
        </p>
        <p
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          {new Date(venda.saleDate).toLocaleDateString('pt-BR')}
        </p>
        <p className="text-xl">
          {'Status: '}
          <span
            data-testid={
              `customer_order_details__element-order-details-label-delivery-status
              ${params.id}`
            }
            className={
              `text-xl
              ${venda.status === 'Pendente' ? 'text-red-500' : ''}
              ${venda.status === 'Em Trânsito' ? 'text-yellow-500' : ''}
              ${venda.status === 'Preparando' ? 'text-yellow-600' : ''}
              ${venda.status === 'Entregue' ? 'text-green-400' : ''}`
            }
          >
            {venda.status}
          </span>
        </p>
        <button
          className="border rounded border-black p-1 mt-8 ml-2 md:ml-0 opacity-80 hover:opacity-100 disabled:opacity-30"
          type="button"
          data-testid="seller_order_details__button-preparing-check"
          disabled={ venda.status !== 'Pendente' }
          onClick={ async () => {
            await axios.put(`http://localhost:3001/sales/${venda.id}`, { status: 'Preparando' });
            setVenda((prevValue) => ({ ...prevValue, status: 'Preparando' }));
          } }
        >
          PREPARAR PEDIDO
        </button>
        <button
          className="border rounded border-black p-1 m-3 opacity-80 hover:opacity-100 disabled:opacity-30"
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
          disabled={ venda.status !== 'Preparando' }
          onClick={ async () => {
            await axios.put(`http://localhost:3001/sales/${venda.id}`, { status: 'Em Trânsito' });
            setVenda((prevValue) => ({ ...prevValue, status: 'Em Trânsito' }));
          } }
        >
          SAIU PARA ENTREGA
        </button>
        <table className="my-7 w-full lg:text-lg text-left text-gray-500 dark:text-gray-400 ml-0">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <td className="px-6 py-3 border border-slate-600">Item</td>
              <td className="px-6 py-3 border border-slate-600">Descrição</td>
              <td className="px-6 py-3 border border-slate-600">Quantidade</td>
              <td className="px-6 py-3 border border-slate-600">Valor Unitário</td>
              <td className="px-6 py-3 border border-slate-600">Sub-Total</td>
            </tr>
          </thead>
          <tbody className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-400 dark:text-gray-700">
            {
              products[0] && (
                products.map((e, index) => (
                  <tr key={ e.id }>
                    <td
                      className="px-6 py-4  border border-slate-600"
                      data-testid={
                        `seller_order_details__element-order-table-item-number-${index}`
                      }
                    >
                      {index + 1}
                    </td>
                    <td
                      className="px-6 py-4  border border-slate-600"
                      data-testid={
                        `seller_order_details__element-order-table-name-${index}`
                      }
                    >
                      {e.name}
                    </td>
                    <td
                      className="px-6 py-4  border border-slate-600"
                      data-testid={
                        `seller_order_details__element-order-table-quantity-${index}`
                      }
                    >
                      {e.quantity}
                    </td>
                    <td className="px-6 py-4  border border-slate-600">
                      <span>R$</span>
                      <span
                        data-testid={
                          `seller_order_details__element-order-table-unit-price-${index}`
                        }
                      >
                        {e.price.replace('.', ',')}
                      </span>
                    </td>
                    <td className="px-6 py-4  border border-slate-600">
                      <span>R$</span>
                      <span
                        data-testid={
                          `seller_order_details__element-order-table-sub-total-${index}`
                        }
                      >
                        {String((+e.price * +e.quantity).toFixed(2)).replace('.', ',')}
                      </span>
                    </td>
                  </tr>
                ))
              )
            }
          </tbody>
        </table>
        <h3>
          <span>Total: R$</span>
          <span
            data-testid="seller_order_details__element-order-total-price"
          >
            {String(venda.totalPrice).replace('.', ',')}
          </span>
        </h3>
      </div>
    </>
  );
}

DetailSaleSeller.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
