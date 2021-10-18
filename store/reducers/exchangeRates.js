import {SET_RATES} from '../actions/exchangeRates';
const initialState = {
  rates: [],
  loaded: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_RATES:
      return {rates: payload, loaded: true};
    default:
      return state;
  }
};
