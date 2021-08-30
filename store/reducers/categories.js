import {SET_CATEGORIES} from '../actions/categories';
const initialState = {
  categories: [],
  loaded: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_CATEGORIES:
      return payload;

    default:
      return state;
  }
};
