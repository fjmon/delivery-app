import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import NavBarProducts from '../Components/NavBarProducts';
import ProductCard from '../Components/ProductCard';
import TotalPrice from '../Components/TotalPrice';
import { getData } from '../hooks/useLocalStorage';

function Products() {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const { cart } = useContext(Context);

  const getProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/products', { });
      setProducts(data.products);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  useEffect(() => {
    getProducts();
    const { role } = getData('user');
    if (role === 'seller') {
      history.push('/seller/orders');
    }
  }, []);

  return (
    <>
      <NavBarProducts />
      <div className="flex flex-wrap justify-center my-5">
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
          className="
            opacity-80
            fixed bottom-1 right-1 w-44 py-1 rounded-lg
            border border-gray-900 dark:bg-gray-700 dark:text-white
            disabled:opacity-25
            cursor-pointer
            hover:opacity-100
          "
        >
          {'Ver Carrinho: '}
          <TotalPrice dataTest="customer_products__checkout-bottom-value" />
        </button>
      )}
    </>
  );
}
export default Products;
