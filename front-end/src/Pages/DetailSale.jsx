import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import NavBarProducts from '../Components/NavBarProducts';
import { getData } from '../hooks/useLocalStorage';

export default function DetailSale({ match: { params } }) {
  const [venda, setVenda] = useState('');
  const [seller, setSeller] = useState('');
  const [products, setProducts] = useState([]);

  const pessoasVendedoras = async () => {
    const { data } = await axios.get('http://localhost:3001/sellers');
    const newSeller = data.find((e) => +e.id === +venda.sellerId);
    setSeller(newSeller);
  };

  const sales = async () => {
    const userId = getData('user').id;
    const { id: vendaId } = params;
    const { data } = await axios.get(`http://localhost:3001/sales/${userId}`);
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

  useEffect(() => {
    pessoasVendedoras();
  }, [venda]);

  return (
    <div>
      <NavBarProducts />
      <div>
        <p className="text-xl">
          Pedido 000
          <span
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            {venda.id}
          </span>
        </p>
        <p className="text-xl">
          <span>P.Vend: </span>
          <span
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            {seller?.name}
          </span>
          {' '}
          <span
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            {new Date(venda.saleDate).toLocaleDateString('pt-BR')}
          </span>
        </p>
        <p
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
        </p>
        <button
          className="border border-black rounded p-1 px-2 disabled:opacity-30"
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          disabled={ venda.status !== 'Em Trânsito' }
          onClick={ async () => {
            await axios.put(`http://localhost:3001/sales/${venda.id}`, { status: 'Entregue' });
            setVenda((prevValue) => ({ ...prevValue, status: 'Entregue' }));
          } }
        >
          MARCAR COMO ENTREGUE
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <td>Item</td>
            <td>Descrição</td>
            <td>Quantidade</td>
            <td>Valor Unitário</td>
            <td>Sub-Total</td>
          </tr>
        </thead>
        <tbody>
          {
            products[0] && (
              products.map((e, index) => (
                <tr key={ e.id }>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-item-number-${index}`
                    }
                  >
                    {index + 1}
                  </td>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-name-${index}`
                    }
                  >
                    {e.name}
                  </td>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-quantity-${index}`
                    }
                  >
                    {e.quantity}
                  </td>
                  <td>
                    <span>R$</span>
                    <span
                      data-testid={
                        `customer_order_details__element-order-table-unit-price-${index}`
                      }
                    >
                      {e.price.replace('.', ',')}
                    </span>
                  </td>
                  <td>
                    <span>R$</span>
                    <span
                      data-testid={
                        `customer_order_details__element-order-table-sub-total-${index}`
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
      <h3 className="text-2xl">
        <span>Total: R$</span>
        <span
          data-testid="customer_order_details__element-order-total-price"
        >
          {String(venda.totalPrice).replace('.', ',')}
        </span>
      </h3>
    </div>
  );
}

DetailSale.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
