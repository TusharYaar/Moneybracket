export const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';

export const setTransactions = payload => ({
  type: SET_TRANSACTIONS,
  payload,
});

export const addTransaction = payload => ({
  type: ADD_TRANSACTION,
  payload,
});
