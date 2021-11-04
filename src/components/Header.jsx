import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      sum: 0,
    };
    this.sumExpenses = this.sumExpenses.bind(this);
  }

  componentDidUpdate(prevState) {
    const { expenses } = this.props;
    if (prevState.expenses !== expenses) {
      this.sumExpenses();
    }
  }

  sumExpenses() {
    const { expenses } = this.props;
    let sum = 0;
    expenses.forEach((expense) => {
      sum += expense.value * expense.exchangeRates[expense.currency].ask;
    });
    this.setState({ sum });
  }

  render() {
    const { email } = this.props;
    const { sum } = this.state;
    return (
      <div>
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">{ sum }</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.objectOf.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
