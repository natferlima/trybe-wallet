import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrenciesAPIThunk, sendExpensesThunk } from '../actions';
import Header from '../components/Header';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { getCurrenciesAPI } = this.props;
    getCurrenciesAPI();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick() {
    const { sendExpenses } = this.props;
    sendExpenses(this.state);
    const { id } = this.state;
    this.setState({ id: id + 1 });
  }

  // renderForm(){
  //   return();
  // }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <Header />
        <form>
          <label htmlFor="valor">
            Valor
            <input type="number" id="valor" name="value" onChange={ this.handleChange } />
          </label>
          <label htmlFor="descricao">
            Descrição
            <input
              type="text"
              id="descricao"
              name="description"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select id="moeda" name="currency" onChange={ this.handleChange }>
              { currencies.map((currencie, index) => (
                <option key={ index } value={ currencie }>{ currencie }</option>
              ))}
            </select>
          </label>
          <label htmlFor="metodo-pagamento">
            Método de pagamento
            <select id="metodo-pagamento" name="method" onChange={ this.handleChange }>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select id="tag" name="tag" onChange={ this.handleChange }>
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.handleClick }>Adicionar Despesa</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  // a props getCurrenciesAPI chama o thunk que fará uma requisição assincrona na api
  getCurrenciesAPI: () => dispatch(getCurrenciesAPIThunk()),
  sendExpenses: (stateLocal) => dispatch(sendExpensesThunk(stateLocal)),
  // props sendExpenses guarda uma função que dispara uma action que leva o estado local
  // para o thunk, onde será feita uma requisição assincrona na API e o resultado irá
  // ser guardado no estado global junto com o estado local
});

const mapStateToProps = (state) => ({
  // a prop currencies trás para o componente a lista de moedas que foi guardada no estado
  // global através do uso do getCurrenciesAPIThunk()
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  getCurrenciesAPI: PropTypes.func.isRequired,
  sendExpenses: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
