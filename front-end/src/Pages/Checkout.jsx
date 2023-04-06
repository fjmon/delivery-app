import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import DetailsCheckout from '../Components/DetailsCheckout';
import DetailsOrder from '../Components/DetailsOrder';
import Context from '../context/Context';
import TotalPrice from '../Components/TotalPrice';
import NavBarProducts from '../Components/NavBarProducts';

export default function Checkout() {
  const history = useHistory();

  const { cart } = useContext(Context);

  if (!cart.products) history.push('./login');

  return (
    <>
      <NavBarProducts />
      <h2>
        Finalizar Pedido
      </h2>
      <div>
        { cart.products && cart.products.map((product, index) => (
          <DetailsCheckout product={ product } index={ index } key={ product[0] } />
        )) }
      </div>
      <h2>
        {' '}
        Detalhes e Endereço para Entrega

      </h2>
      <div>
        <p>
          Total pedido:
        </p>
        { cart.products && (
          <TotalPrice dataTest="customer_checkout__element-order-total-price" />
        )}
      </div>
      <div>
        <DetailsOrder />
      </div>
    </>
  );
}
