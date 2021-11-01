import React from 'react';
import Header from '../components/Header';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      moedas: [],
      exchangeRates: [],
    };
    this.getMoedasAPI = this.getMoedasAPI.bind(this);
  }

  componentDidMount() {
    this.getMoedasAPI();
  }

  async getMoedasAPI() {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((results) => results.json())
      .then((result) => {
        // https://www.horadecodar.com.br/2020/12/11/remover-propriedade-de-objeto-javascript/
        delete result.USDT;
        const resultMoedas = Object.keys(result);
        this.setState({ moedas: resultMoedas, exchangeRates: result });
      });
  }

  render() {
    const { moedas, exchangeRates } = this.state;
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
              { moedas.map((moeda, index) => (
                <option key={ index } value={ moeda }>{ moeda }</option>
              ))}
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
          <button type="button">Adicionar Despesa</button>
        </form>
        <p>{exchangeRates[0]}</p>
      </div>
    );
  }
}

export default Wallet;
