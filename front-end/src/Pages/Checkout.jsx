import React, { useContext } from 'react';
import DetailsCheckout from '../Components/DetailsCheckout';
import DetailsOrder from '../Components/DetailsOrder';
import Context from '../context/Context';
import TotalPrice from '../Components/TotalPrice';
import NavBarProducts from '../Components/NavBarProducts';

export default function Checkout() {
  const { cart } = useContext(Context);

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
          {' '}
          Total pedido:
          {' '}
          <TotalPrice dataTest="customer_checkout__element-order-total-price" />

        </p>
      </div>
      <div>
        <DetailsOrder />
      </div>
    </>
  );
}
