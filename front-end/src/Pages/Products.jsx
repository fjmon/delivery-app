import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import NavBarProducts from '../Components/NavBarProducts';
import ProductCard from '../Components/ProductCard';
import './Products.css';

function Products() {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const { cart } = useContext(Context);

  const getProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/products', { });
      console.log(data);
      setProducts(data.products);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
  }, [cart]);

  return (
    <>
      <NavBarProducts />
      <div className="products">

        { products.map((product) => (
          <ProductCard product={ product } key={ product.id } />
        )) }
      </div>
      { cart.products && (
        <button
          type="button"
          onClick={ () => history.push('/customer/checkout') }
          data-testid="customer_products__button-cart"
          disabled={ cart.products.length === 0 }
        >
          Ver Carrinho: R$
          <button
            type="button"
            // onClick={ () => history.push('/customer/checkout') }
            data-testid="customer_products__checkout-bottom-value"
            disabled={ cart.products.length === 0 }
          >
            { `${
              cart.products
                .reduce((acc, item) => acc + (item[1] * item[2]), 0)
                .toFixed(2).replace('.', ',')}` }
          </button>
        </button>
      )}

    </>

  );
}
export default Products;
