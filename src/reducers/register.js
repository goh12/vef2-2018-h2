import {
    REGISTER_REQUEST, 
    REGISTER_SUCCESS, 
    REGISTER_FAILURE 
} from '../actions/register';
  
  const initialState = {
    isFetching: false,
    registered: false,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_REQUEST:
        return {
          ...state,
          isFetching: action.isFetching,
          registered: action.registered,
        };
      case REGISTER_SUCCESS:
        return {
          ...state,
          isFetching: action.isFetching,
          registered: action.registered,
          message: action.message,
        };
      case REGISTER_FAILURE:
        return {
          ...state,
          isFetching: action.isFetching,
          registered: action.registered,
          message: action.message
        };
      default:
        return state;
    }
  };
  