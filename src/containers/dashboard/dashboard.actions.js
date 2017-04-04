export const ADD_CHANNEL = 'ADD_CHANNEL';
export const ADD_CHANNEL_SUCCESS = 'ADD_CHANNEL_SUCCESS';
export const ACTIVATE_CHANNEL = 'ACTIVATE_CHANNEL'

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
