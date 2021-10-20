import { LOGIN_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function userReducer(state = INITIAL_STATE, { type, email }) {
  switch (type) {
  case LOGIN_USER:
    return {
      ...state,
      email,
    };
  default:
    return state;
  }
}

export default userReducer;
