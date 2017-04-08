// Import Actions
import { LOGIN_SUCCESS } from './login.actions';

// Initial State
export const loginInitialState = {
  isLoggedIn: false,
  user: {}
};

export const LoginReducer = (state = loginInitialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, { isLoggedIn: true, user: action.payload });
    default:
      return state;
  }
};
