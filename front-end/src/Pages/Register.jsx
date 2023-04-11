import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ShapeTop from '../Components/ShapeTop';
import ShapeBottom from '../Components/ShapeBottom';

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
      history.push('/');
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
    }
  };
  return (
    <>
      <ShapeTop />
      <div className="m-10 mt-80 flex flex-col text-center self-center">
        <h1 className="text-5xl font-bold">
          CADASTRO DELI
          <span className="text-amber-400 underline">BEER</span>
          Y 🍺
        </h1>
        <form className="flex flex-col text-center m-4 w-96 self-center">
          <input
            className="border-2 px-2 py-1 rounded my-1"
            data-testid={ ROUTE_ELEMENTS[1] }
            type="text"
            placeholder="Nome"
            onChange={ handleName }
          />
          <input
            className="border-2 px-2 py-1 rounded my-1"
            data-testid={ ROUTE_ELEMENTS[2] }
            type="email"
            placeholder="E-mail"
            onChange={ handleEmail }
          />
          <input
            className="border-2 px-2 py-1 rounded my-1"
            data-testid={ ROUTE_ELEMENTS[3] }
            type="password"
            placeholder="Senha"
            onChange={ handlePassword }
          />
          <button
            className="
            border-2 p-1
            rounded my-1
            opacity-60 hover:opacity-95 border-green-500 disabled:border-red-600"
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
      <ShapeBottom />
    </>
  );
}
