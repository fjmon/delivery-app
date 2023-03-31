import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [totalcarrinho, setTotalcarrinho] = useState(0);
  // const [carrinho, setCarrinho] = useState([]);

  const context = useMemo(() => ({
    totalcarrinho,
    setTotalcarrinho,
  }), [totalcarrinho, setTotalcarrinho]);

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Provider;
