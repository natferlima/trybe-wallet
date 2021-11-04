import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  render() {
    const { currencies, handleChange, handleClick } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          Valor
          <input type="number" id="valor" name="value" onChange={ handleChange } />
        </label>
        <label htmlFor="descricao">
          Descrição
          <input
            type="text"
            id="descricao"
            name="description"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="moeda">
          Moeda
          <select id="moeda" name="currency" onChange={ handleChange }>
            { currencies.map((currencie, index) => (
              <option key={ index } value={ currencie }>{ currencie }</option>
            ))}
          </select>
        </label>
        <label htmlFor="metodo-pagamento">
          Método de pagamento
          <select id="metodo-pagamento" name="method" onChange={ handleChange }>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select id="tag" name="tag" onChange={ handleChange }>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ handleClick }>Adicionar Despesa</button>
      </form>
    );
  }
}

Form.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf.isRequired,
};

export default Form;
