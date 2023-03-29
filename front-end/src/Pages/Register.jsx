import React, { useState, useEffect } from 'react';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [iDisabled, setDisabled] = useState(true);

  const ROUTE_ELEMENTS = {
    1: 'common_register__input-name',
    2: 'common_register__input-email',
    3: 'common_register__input-password',
    4: 'common_register__button-register',
    5: 'common_register__element-invalid-email',
  };

  const MIN_LENGHT_PASSWORD = 6;

  const handleName = ({ target: { value } }) => setName(value);
  const handleEmail = ({ target: { value } }) => setEmail(value);
  const handlePassword = ({ target: { value } }) => setPassword(value);
  let show = false;

  const validaCadastro = () => {
    if (email === '' || password === '') {
      show = true;
    }
  };

  useEffect(() => {
    const vEmail = /^\S+@\S+\.\S+$/;
    const vPassword = email.match(vEmail) && password.length >= MIN_LENGHT_PASSWORD;
    setDisabled(!(vPassword && vEmail));
  }, [name, email, password]);

  return (
    <div>
      <h1>Cadastro</h1>
      <form>

        <label htmlFor="name">
          Nome
          <input
            data-testid={ ROUTE_ELEMENTS[1] }
            type="nome"
            id="nome"
            placeholder="Nome"
            onChange={ handleName }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            data-testid={ ROUTE_ELEMENTS[2] }
            type="email"
            id="email"
            placeholder="Email"
            onChange={ handleEmail }
          />
        </label>
        <label htmlFor="senha">
          Senha
          <input
            data-testid={ ROUTE_ELEMENTS[3] }
            type="password"
            id="senha"
            placeholder="Senha"
            onChange={ handlePassword }
          />
        </label>
        <button
          data-testid={ ROUTE_ELEMENTS[4] }
          type="submit"
          onChange={ validaCadastro }
          disabled={ iDisabled }
        >
          Cadastrar

        </button>
      </form>
      {show && <p data-testid={ ROUTE_ELEMENTS[5] }>Email ou password inválido</p>}
    </div>
  );
}
