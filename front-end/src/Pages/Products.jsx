import React, { useState, useEffect } from 'react';
import NavBarProducts from '../Components/NavBarProducts';
import ProductCard from '../Components/ProductCard';

function Products() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/products', { });
      console.log(data.products);
      setProducts(data.products);
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <NavBarProducts />
      <h1>produtos</h1>
      { products.map((product) => (
        <ProductCard product={ product } key={ product.id } />
      )) }
    </>

  );
}
export default Products;
