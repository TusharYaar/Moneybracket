import {
  SET_CATEGORIES,
  DELETE_CATEGORY,
  ADD_CATEGORY,
} from '../actions/categories';
const initialState = {
  categories: [],
  loaded: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_CATEGORIES:
      return payload;
    case DELETE_CATEGORY:
      const newCategories = state.categories.filter(
        category => category.category !== payload,
      );
      return {...state, categories: newCategories};

    default:
      return state;
  }
};
