export const LOGIN_WITH_GOOGLE = 'LOGIN_WITH_GOOGLE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAIL = 'UPDATE_PROFILE_FAIL';

export function loginWithGoogle() {
  return {
    type: LOGIN_WITH_GOOGLE
  };
}
