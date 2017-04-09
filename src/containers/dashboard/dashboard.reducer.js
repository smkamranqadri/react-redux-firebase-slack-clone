// Import Actions
import { ACTIVATE_CHANNEL, ACTIVATE_CONVERSATIONS, SEND_MESSAGE_SUCCESS } from './dashboard.actions';

// Initial State
export const dashboardInitialState = {
  activeChannel: { channelName: 'Chat Box', owner: '', user: ''},
  activeConversations: []
};

export const DashboardReducer = (state = dashboardInitialState, action) => {
  switch (action.type) {
    case ACTIVATE_CHANNEL:
      return Object.assign({}, state, { activeChannel: action.payload, activeConversations: [] })
    case ACTIVATE_CONVERSATIONS:
      return Object.assign({}, state, { activeConversations: [...state.activeConversations, action.payload] })
    default: return state;
  }
};
