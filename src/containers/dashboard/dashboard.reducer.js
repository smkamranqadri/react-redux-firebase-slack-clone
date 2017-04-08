// Import Actions
import { ACTIVATE_CHANNEL } from './dashboard.actions';

// Initial State
export const dashboardInitialState = {
  activeChannel: ''
};

export const DashboardReducer = (state = dashboardInitialState, action) => {
  switch (action.type) {
    case ACTIVATE_CHANNEL:
      return Object.assign({}, state, { activeChannel: action.payload })
    default: return state;
  }
};
