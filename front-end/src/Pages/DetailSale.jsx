// import { useState, useEffect } from 'react';
// import axios from 'axios';
import React from 'react';
import NavBarProducts from '../Components/NavBarProducts';

export default function DetailSale() {
  // const [vendas, setVendas] = useState({});
  // useEffect(() => {
  //   // const { id } = props.match.params;
  //   console.log(id);
  //   const sales = (async () => {
  //     const { data } = await axios.get('http://localhost:3001/sales', { id });
  //     setVendas(data.sale);
  //   });
  //   sales();
  // }, []);
  return (
    <div>
      <NavBarProducts />
      <p>pedidos</p>
      {/* <p>
        {vendas}
      </p> */}
    </div>
  );
}
