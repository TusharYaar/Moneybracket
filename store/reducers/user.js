import {LOGIN, LOGOUT} from '../actions/user';
const initialState = {
  email: null,
  authToken: null,
  autoLogin: true,
  userType: 'user',
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case '21':
      return {...state, ...payload};

    default:
      return state;
  }
};
