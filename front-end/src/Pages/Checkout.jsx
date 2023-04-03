import React, { useEffect, useState } from 'react';
import DetailsCheckout from '../Components/DetailsCheckout';
import DetailsOrder from '../Components/DetailsOrder';

export default function Checkout() {
  const [produtos, setprodutos] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(cart.products);
    setprodutos(cart.products);
  }, []);
  console.log(produtos);

  return (
    <>
      <h2>
        Finalizar Pedido
      </h2>
      <div>
        { produtos.map((product) => (
          <DetailsCheckout product={ product } key={ product[0] } />
        )) }
      </div>
      <h2>
        {' '}
        Detalhes e Endereço para Entrega

      </h2>
      <div>
        <p> Total pedido:</p>
      </div>
      <div>
        <DetailsOrder />
      </div>
    </>
  );
}
