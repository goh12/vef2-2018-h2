
/**
 * Ef redux er notað skal skilgreina allar actions fyrir auth hér og
 * síðan í annari skrá fyrir aðra virkni.
 * Í async "thunks" ætti þá að gera vefþjónustuköll
 */
import api from '../api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_LOGOUT = 'LOGIN_LOGOUT';


function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    message: null,
  }
}

/* todo fleiri action */

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user,
    message: null,
  }
}

function loginError(message) {
  console.log(message);
  
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function logout() {
  return {
    type: LOGIN_LOGOUT,
    isFetching: false,
    isAuthenticated: false,
    user: null,
  }
}

/* todo async "thunk" fyrir tengingu við vefþjónustu */
// Thunk!
export const loginUser = (username, password) => {  
  return async (dispatch) => {
    dispatch(requestLogin());

    let login;
    try {
      login = await api.post('login', { username, password });
    } catch (e) {
      return dispatch(loginError(e))
    }

    if (!login.result.token) {
      // útfæra þ.a. allir errorar eru settir í fylki
      // breytum þá aftur í map fallið inn í login
      // eins og staðan er núna kemur aðeins inn einn error, ekki allir        
      dispatch(loginError(login.result.error))
    }

    if (login.result.token) {
      const { token, user } = login.result;
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(receiveLogin(user));
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());
  }
}

export const createUser = (username, password, name) => {
  return async (dispatch) => {
    dispatch(requestLogin());

    let register;
    try {
      register = await api.post('register', { username, password, name });
    } catch (e) {
      return dispatch(loginError([{ message: e}]));
    }

    if (register.result.errors) {      
      const errors = [];
      register.result.errors.forEach(element => {
        errors.push(element.message);
      });     
      dispatch(loginError(errors));
    }

    if (register.result.username) {
      // ath! væri ekki sniðugast að logga notenda inn hér?
      dispatch(receiveLogin());
    }
  }
}