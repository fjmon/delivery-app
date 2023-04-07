import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { getData, setData } from '../hooks/useLocalStorage';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const MIN_LENGTH_PASSWORD = 6;
  console.log('login: zebirita@email.com senha: $#zebirita#$');
  console.log('login: fulana@deliveryapp.com senha: fulana@123');

  const ROUTE_ELEMENTS = {
    1: 'common_login__input-email',
    2: 'common_login__input-password',
    3: 'common_login__button-login',
    4: 'common_login__button-register',
    5: 'common_login__element-invalid-email',
  };

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
  };
  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
  };
  useEffect(() => {
    const vEmail = /^\S+@\S+\.\S+$/;
    const isEmailvalid = email.match(vEmail) != null;
    const isPasswordvalid = password.length >= MIN_LENGTH_PASSWORD;
    setDisabled(!(isEmailvalid && isPasswordvalid));
  }, [password, email]);

  useEffect(() => {
    const user = getData('user');
    if (user) {
      history.push('/customer/products');
    }
  }, []);

  const loginUser = async () => {
    try {
      const { data } = await axios.post('http://localhost:3001/login', { email, password });
      const { role } = data.user;
      if (role === 'customer') {
        history.push('/customer/products');
      }
      if (role === 'seller') {
        history.push('/seller/orders');
      }
      setData('user', data.user);
      setData('cart', {
        products: [],
      });
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  return (
    <div>
      <form>
        <h1>Login</h1>
        <label htmlFor="email">

          <input
            type="email"
            data-testid={ ROUTE_ELEMENTS[1] }
            placeholder="email"
            value={ email }
            onChange={ handleEmail }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            data-testid={ ROUTE_ELEMENTS[2] }
            placeholder="password"
            value={ password }
            onChange={ handlePassword }
          />
        </label>
        <button
          type="button"
          data-testid={ ROUTE_ELEMENTS[3] }
          disabled={ isDisabled }
          onClick={ loginUser }
        >
          login
        </button>
        <button
          type="button"
          data-testid={ ROUTE_ELEMENTS[4] }
          onClick={ () => history.push('/register') }
        >
          Ainda não tenho conta
        </button>
        {error && (
          <p
            data-testid="common_login__element-invalid-email"
          >
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
export default Login;
