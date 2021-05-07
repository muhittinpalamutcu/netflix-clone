import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_UPDATE_EMAIL_REQUEST,
  USER_UPDATE_EMAIL_SUCCESS,
  USER_UPDATE_EMAIL_FAIL,
  USER_LOGOUT,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userEmailUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_EMAIL_REQUEST:
      return { loading: true };
    case USER_UPDATE_EMAIL_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_EMAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
