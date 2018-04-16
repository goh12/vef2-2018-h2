import api from '../api';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

function requestRegister() {
  return {
    type: REGISTER_REQUEST,
    isFetching: true,
    registered: false,
    message: null,
  }
}

function receiveRegister(user) {
  return {
    type: REGISTER_SUCCESS,
    isFetching: false,
    user,
    registered: true,
    message: null,
  }
}

function registerError(message) {
  return {
    type: REGISTER_FAILURE,
    isFetching: false,
    registered: false,
    message
  }
}

export const createUser = (username, password, name) => {
    return async (dispatch) => {
      dispatch(requestRegister());
  
      let register;
      try {
        register = await api.post('register', { username, password, name });
      } catch (e) {
        return dispatch(registerError([{ message: e}]));
      }
  
      if (register.result.errors) {      
        const errors = [];
        register.result.errors.forEach(element => {
          errors.push(element.message);
        });     
        dispatch(registerError(errors));
      }
  
      if (register.result.username) {
        dispatch(receiveRegister());
      }
    }
}