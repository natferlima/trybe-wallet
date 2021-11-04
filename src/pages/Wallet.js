import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrenciesAPIThunk, sendExpensesThunk } from '../actions';
import Header from '../components/Header';
import ExpensesTable from '../components/ExpensesTable';
import Form from '../components/Form';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
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

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <Header />
        <Form
          currencies={ currencies }
          handleChange={ this.handleChange }
          handleClick={ this.handleClick }
        />
        <ExpensesTable />
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
