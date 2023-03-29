import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setDisabled] = useState(true);

  const MIN_LENGTH_PASSWORD = 6;

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
        >
          login
        </button>
        <button
          type="button"
          data-testid={ ROUTE_ELEMENTS[4] }
        >
          <Link to="/cadastro">Ainda não tenho conta</Link>
        </button>
      </form>
    </div>
  );
}
export default Login;
