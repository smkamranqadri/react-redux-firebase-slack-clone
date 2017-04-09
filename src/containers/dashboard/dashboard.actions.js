export const ADD_CHANNEL = 'ADD_CHANNEL';
export const ADD_CHANNEL_SUCCESS = 'ADD_CHANNEL_SUCCESS';
export const NO_ACTIVE_CHANNEL = 'NO_ACTIVE_CHANNEL'
export const ACTIVATE_CHANNEL = 'ACTIVATE_CHANNEL'
export const ACTIVATE_CONVERSATIONS = 'ACTIVATE_CONVERSATIONS'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS'

export function addChannel(channelName) {
  return {
    type: ADD_CHANNEL,
    payload: channelName
  };
}

export function activateChannel(channelName) {
  return {
    type: ACTIVATE_CHANNEL,
    payload: channelName
  }
}

export function sendMessage(message) {
  return {
    type: SEND_MESSAGE,
    payload: message
  }
}
