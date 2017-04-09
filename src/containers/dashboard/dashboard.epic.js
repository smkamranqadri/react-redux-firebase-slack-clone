import { getFirebase } from 'react-redux-firebase'
import { Observable, Scheduler } from 'rxjs';

import { store } from '../../store';
import { ADD_CHANNEL, ADD_CHANNEL_SUCCESS, NO_ACTIVE_CHANNEL, ACTIVATE_CHANNEL, ACTIVATE_CONVERSATIONS, SEND_MESSAGE, SEND_MESSAGE_SUCCESS } from './dashboard.actions';

export class DashboardEpic {

  static addChannel = (action$) =>
    action$.ofType(ADD_CHANNEL)
      .switchMap(({ payload }) => {
        return getFirebase().set('channels/' + payload + '/', { owner: store.getState().login.user.uid })
      }).mapTo({type: ADD_CHANNEL_SUCCESS })

  static getActiveChannelConversations = (action$) =>
    action$.ofType(ACTIVATE_CHANNEL)
      .switchMap(({ payload }) => {
        return new Observable(observer => {
          getFirebase().ref('conversations/' + payload.channelName).on('child_added', snap => {
            observer.next({type: ACTIVATE_CONVERSATIONS, payload: snap.val() })
          })
        })
      })

  static sendMessage = (action$, store) =>
    action$.ofType(SEND_MESSAGE)
      .switchMap(({ payload }) => {
        let state = store.getState();
        if (state.dashboard.activeChannel.channelName === 'Chat Box') return Observable.of({ type: NO_ACTIVE_CHANNEL})
        let messageObj = {
            name: state.login.user.displayName,
            displayPicture: state.login.user.photoURL,
            date: new Date().toString(),
            message: payload
        }
        if (state.dashboard.activeChannel.owner !== state.login.user.uid) messageObj.align = 'right'
        return Observable.fromPromise(getFirebase().push('conversations/' + state.dashboard.activeChannel.channelName, messageObj))
          .switchMap(res => {
            return Observable.of({ type: SEND_MESSAGE_SUCCESS, payload: messageObj })
          })
      })

}
