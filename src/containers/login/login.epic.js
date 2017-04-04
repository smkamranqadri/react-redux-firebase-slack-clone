import * as firebase from 'firebase';
import { push } from 'react-router-redux';
import { Observable } from 'rxjs'

import { LOGIN_WITH_GOOGLE, LOGIN_SUCCESS, LOGIN_FAIL, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL } from './login.actions';

export class LoginEpic {

  static loginWithGoogle = (action$) =>
    action$.ofType(LOGIN_WITH_GOOGLE)
      .switchMap((action) => {
        const provider = new firebase.auth.GoogleAuthProvider();
        return Observable.fromPromise(firebase.auth().signInWithPopup(provider))
          .switchMap((result) => {
            let user = {
              uid: result.user.uid,
              displayName: result.user.displayName,
              email: result.user.email,
              photoURL: result.user.photoURL
            };
            return Observable.of({ type: LOGIN_SUCCESS, payload: user })
          }).catch((error) => {
            console.log(LOGIN_FAIL, error);
            return Observable.of({ type: LOGIN_FAIL, payload: error });
        });
      })

  static updateProfile = (action$) =>
    action$.ofType(LOGIN_SUCCESS)
      .switchMap(({ payload }) => {
        firebase.database().ref('users/' + payload.uid).set(payload, function(err){
          console.log('err', err)
        });
        return Observable.of(push('/'));
      })

}
