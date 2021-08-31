import {
  SET_TRANSACTIONS,
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
} from '../actions/transactions';

const initialState = {
  loaded: false,
  transactions: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_TRANSACTIONS:
      return {loaded: true, transactions: payload};
    case ADD_TRANSACTION:
      console.log('payload', payload);
      return {...state, transactions: [...state.transactions, payload]};
    default:
      return state;
  }
};
