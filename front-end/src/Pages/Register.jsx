import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Cadastro() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);

  const ROUTE_ELEMENTS = {
    1: 'common_register__input-name',
    2: 'common_register__input-email',
    3: 'common_register__input-password',
    4: 'common_register__button-register',
    5: 'common_register__element-invalid_register',
  };

  const MIN_LENGTH_PASSWORD = 6;
  const MIN_LENGTH_NAME = 12;

  const handleName = ({ target: { value } }) => setName(value);
  const handleEmail = ({ target: { value } }) => setEmail(value);
  const handlePassword = ({ target: { value } }) => setPassword(value);

  useEffect(() => {
    const vEmail = /^\S+@\S+\.\S+$/;
    const isEmailvalid = email.match(vEmail) != null;
    const isPasswordvalid = password.length >= MIN_LENGTH_PASSWORD;
    const isName = name.length >= MIN_LENGTH_NAME;
    setDisabled(!(isEmailvalid && isPasswordvalid && isName));
  }, [password, email, name]);

  const registerUser = async () => {
    try {
      await axios.post('http://localhost:3001/register', { email, password, name });
      history.push('/customer/products');
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
    }
  };
  return (
    <div>
      <h1>Cadastro</h1>
      <form>
        <label htmlFor="name">
          Nome
          <input
            data-testid={ ROUTE_ELEMENTS[1] }
            type="name"
            placeholder="name"
            onChange={ handleName }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            data-testid={ ROUTE_ELEMENTS[2] }
            type="email"
            placeholder="email"
            onChange={ handleEmail }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            data-testid={ ROUTE_ELEMENTS[3] }
            type="password"
            placeholder="password"
            onChange={ handlePassword }
          />
        </label>
        <button
          data-testid={ ROUTE_ELEMENTS[4] }
          type="button"
          disabled={ disabled }
          onClick={ registerUser }
        >
          Cadastrar

        </button>
      </form>
      {error && (
        <p
          data-testid={ ROUTE_ELEMENTS[5] }
        >
          {error}
        </p>
      )}
    </div>
  );
}
