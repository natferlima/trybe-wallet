// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES_API, SEND_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES_API:
    return {
      ...state,
      currencies: action.payload.currencies,
    };
  case SEND_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      // expenses é um array que sempre será atualizado, então com o spread eu preservo
      // o que tinha antes e adiciono um novo valor com action.payload
    };
  default:
    return state;
  }
};

export default wallet;
