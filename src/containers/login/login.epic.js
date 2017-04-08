import * as firebase from 'firebase';
import { push } from 'react-router-redux';
import { Observable } from 'rxjs';
import { getFirebase } from 'react-redux-firebase';

import { LOGIN_WITH_GOOGLE, LOGIN_SUCCESS, LOGIN_FAIL } from './login.actions';

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
        return Observable.concat(
          getFirebase().set('users/' + payload.uid, payload)
        )

        // firebase.database().ref('users/' + payload.uid).set(payload, function(err){
        //   console.log('err', err)
        // });
      }).mapTo(push('/'))

  static checkLogin = (action$) =>
    action$.ofType('@@reactReduxFirebase/LOGIN')
      .switchMap(({ auth }) => {
        let user = {
          uid: auth.uid,
          displayName: auth.displayName,
          email: auth.email,
          photoURL: auth.photoURL
        };
        return Observable.of({
          type: LOGIN_SUCCESS,
          payload: user
        })
      })

}
