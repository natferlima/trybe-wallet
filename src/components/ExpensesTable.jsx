import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense as deleteExpenseAction } from '../actions';

class ExpensesTable extends Component {
  constructor() {
    super();
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

  handleClickDelete(event, id) {
    const { expenses, deleteExpense } = this.props;
    const newArrayExpenses = expenses.filter((expense) => expense.id !== id);
    deleteExpense(newArrayExpenses);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        { expenses.map((expense) => (
          <tr key={ expense.id }>
            <td>{ expense.description }</td>
            <td>{ expense.tag }</td>
            <td>{ expense.method }</td>
            <td>{ expense.value }</td>
            <td>{ expense.exchangeRates[expense.currency].name.split('/')[0] }</td>
            <td>
              { Math.round(expense.exchangeRates[expense.currency].ask * 100) / 100 }
            </td>
            <td>
              { Math.round(expense.value
              * expense.exchangeRates[expense.currency].ask * 100)
               / 100 }
            </td>
            <td>Real</td>
            <td>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ (event) => this.handleClickDelete(event, expense.id) }
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.objectOf.isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (newExpense) => dispatch(deleteExpenseAction(newExpense)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
