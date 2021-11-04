export const LOGIN_USER = 'LOGIN_USER';
export const GET_CURRENCIES_API = 'GET_CURRENCIES_API';
export const SEND_EXPENSES = 'SEND_EXPENSES';

export const loginUser = (email) => ({
  type: LOGIN_USER,
  email,
});

// será chamada lá no reducer e passará para o estado global os valores guardados em payload
export const getCurrenciesAPI = (payload) => ({
  type: GET_CURRENCIES_API,
  payload,
});

// será chamada lá no reducer e passará para o estado global os valores guardados em payload
export const sendExpenses = (payload) => ({
  type: SEND_EXPENSES,
  payload,
});

// faz uma requisição assincrona na api guarda o retorno correto em result e envia
// para o estado global atraves da action getCurrenciesAPI
export const getCurrenciesAPIThunk = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await response.json();
  // https://www.horadecodar.com.br/2020/12/11/remover-propriedade-de-objeto-javascript/
  delete result.USDT;
  const payload = {
    currencies: Object.keys(result),
  };
  dispatch(getCurrenciesAPI(payload));
};

// esse thunk junta o estado local recebido do componente Wallet com a resposta da
// requisição assincrona da API e envia p action que envia p reducer e atualiza o estado global
export const sendExpensesThunk = (stateLocalWallet) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await response.json();
  delete result.USDT;
  const payload = { ...stateLocalWallet, exchangeRates: result };
  dispatch(sendExpenses(payload));
};
