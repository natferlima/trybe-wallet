import React from 'react';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <form>
          <label htmlFor="valor">
            Valor
            <input type="number" id="valor" name="valor" />
          </label>
          <label htmlFor="descricao">
            Descrição
            <input type="text" id="descricao" name="descricao" />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select id="moeda">
              <option value="moeda1">moeda1</option>
              <option value="moeda2">moeda2</option>
            </select>
          </label>
          <label htmlFor="metodo-pagamento">
            Método de pagamento
            <select id="metodo-pagamento">
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao-credito">Cartão de Crédito</option>
              <option value="cartao-debito">Cartão de Débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select id="tag">
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

export default Wallet;
