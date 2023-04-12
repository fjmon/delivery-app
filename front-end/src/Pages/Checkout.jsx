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
      <div className="mx-auto w-96 md:w-10/12 shadow border rounded p-5 lg:mt-28 mb-10">
        <div className="mx-0 md:mx-10">
          <h2 className="text-xl">
            Finalizar Pedido
          </h2>
          <hr className="border border-black" />
          <div className="flex flex-wrap justify-center xl:justify-start">
            { cart.products && cart.products.map((product, index) => (
              <DetailsCheckout product={ product } index={ index } key={ product[0] } />
            )) }
          </div>
          <h2 className="text-lg">
            Detalhes e Endereço para Entrega:
          </h2>
          <hr className="border border-black" />
          <p className="text-lg">
            {'Total: '}
            <span>
              { cart.products && (
                <TotalPrice dataTest="customer_checkout__element-order-total-price" />
              )}
            </span>
          </p>
          <div className="shadow border p-3">
            <DetailsOrder />
          </div>
        </div>
      </div>
    </>
  );
}
