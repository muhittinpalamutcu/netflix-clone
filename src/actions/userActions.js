import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_UPDATE_EMAIL_REQUEST,
  USER_UPDATE_EMAIL_SUCCESS,
  USER_UPDATE_EMAIL_FAIL,
  USER_LOGOUT,
} from "../constants/userConstants";
import firebase from "firebase/app";
import { auth } from "../firebase";

export const userlogin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });

  auth
    .signInWithEmailAndPassword(email, password)
    .then((authUser) => {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: { uid: authUser.user.uid, email: authUser.user.email },
      });
    })
    .catch((error) => {
      dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
    });
};

export const updateUserEmail = (currentEmail, newEmail, password) => async (
  dispatch
) => {
  dispatch({ type: USER_UPDATE_EMAIL_REQUEST });

  firebase
    .auth()
    .signInWithEmailAndPassword(currentEmail, password)
    .then(async (userCredential) => {
      await userCredential.user.updateEmail(newEmail);

      dispatch({
        type: USER_UPDATE_EMAIL_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: USER_UPDATE_EMAIL_FAIL,
        payload: error.message,
      });
    });
};

export const userLogout = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT });
};
