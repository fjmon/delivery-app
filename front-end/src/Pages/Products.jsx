import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Context from '../context/Context';
import NavBarProducts from '../Components/NavBarProducts';
import ProductCard from '../Components/ProductCard';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const { totalcarrinho } = useContext(Context);
  const getProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/products', { });
      console.log(data);
      setProducts(data.products);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  console.log(`TOTAL CARRINHO AQUI: ${totalcarrinho}`);
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <NavBarProducts />
      <div className="products">

        { products.map((product) => (
          <ProductCard product={ product } key={ product.id } />
        )) }
      </div>
      <button type="button">
        { `ver carrinho: ${(totalcarrinho).toFixed(2)}` }
      </button>
    </>

  );
}
export default Products;
