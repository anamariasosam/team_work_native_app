import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
} from './types'
import firebase from 'firebase'


export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

export const passwordChanged = (password) => {
  return {
    type: PASSWORD_CHANGED,
    payload: password
  }
}

export const loginUser = ({email, password}) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER })
    firebase.auth().signInWithEmailAndPassword(email,password)
      .then( user => loginSuccess(dispatch, user))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email,password)
          .then( user => loginSuccess(dispatch, user))
          .catch(() => loginUserFail(dispatch))
      })
  }
}

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL })
}

const loginSuccess = (dispatch, user) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user})
}
