import { getFirebase } from 'react-redux-firebase'

import { store } from '../../store';
import { ADD_CHANNEL, ADD_CHANNEL_SUCCESS } from './dashboard.actions';

export class DashboardEpic {

  static addChannel = (action$) =>
    action$.ofType(ADD_CHANNEL)
      .switchMap(({ payload }) => {
        return getFirebase().set('channels/' + payload + '/', { owner: store.getState().login.user.uid })
      }).mapTo({type: ADD_CHANNEL_SUCCESS })

}
