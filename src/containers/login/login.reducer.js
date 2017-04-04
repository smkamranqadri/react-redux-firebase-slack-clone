// Import Actions
import {} from './login.actions';

// Initial State
export const loginInitialState = {
  isLoggedIn: false,
};

export const LoginReducer = (state = loginInitialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
