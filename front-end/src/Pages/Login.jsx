import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { getData, setData } from '../hooks/useLocalStorage';
import ShapeTop from '../Components/ShapeTop';
import ShapeBottom from '../Components/ShapeBottom';

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
    <>
      <ShapeTop />
      <form className="m-10 mt-80 flex flex-col text-center self-center">
        <h1 className="text-5xl font-bold">
          DELI
          <span className="text-amber-400 underline">BEER</span>
          Y 🍺
        </h1>
        <div className="flex flex-col text-center m-10 w-96 self-center">
          <input
            className="border-2 px-2 py-1 rounded my-1"
            type="email"
            data-testid={ ROUTE_ELEMENTS[1] }
            placeholder="E-MAIL"
            value={ email }
            onChange={ handleEmail }
          />
          <input
            className="border-2 px-2 py-1 rounded my-1"
            type="password"
            data-testid={ ROUTE_ELEMENTS[2] }
            placeholder="PASSWORD"
            value={ password }
            onChange={ handlePassword }
          />
          <button
            className="
            border-2 p-1
            rounded my-1
            opacity-60 hover:opacity-95 border-green-500 disabled:border-red-600"
            type="button"
            data-testid={ ROUTE_ELEMENTS[3] }
            disabled={ isDisabled }
            onClick={ loginUser }
          >
            Entrar
          </button>
          <button
            className="border-2 p-1 rounded my-1 opacity-60 hover:opacity-95 underline"
            type="button"
            data-testid={ ROUTE_ELEMENTS[4] }
            onClick={ () => history.push('/register') }
          >
            Ainda não tem conta?
          </button>
          {error && (
            <p
              data-testid="common_login__element-invalid-email"
            >
              {error}
            </p>
          )}
        </div>
      </form>
      <ShapeBottom />
    </>
  );
}
export default Login;
