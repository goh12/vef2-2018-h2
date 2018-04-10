import {
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE, 
  LOGIN_LOGOUT 
} from '../actions/auth';

// Ef það er notandi í localStorage erum við með innskráðan notanda
// hér gætum við líka sótt token
const token = JSON.parse(localStorage.getItem('token') || 'null');

const initialState = {
  isFetching: false,
  isAuthenticated: token ? true : false,
  token,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
      };
    case LOGIN_SUCCESS:
    console.log(action)
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        token: action.token,
        message: action.message,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        message: action.message
      };
    case LOGIN_LOGOUT:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        token: action.token,
      }
    default:
      return state;
  }
};
