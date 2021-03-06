import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import userReducer from './store/reducers/user';
import settingsReducer from './store/reducers/settings';
import exchangeRatesReducer from './store/reducers/exchangeRates';
import categoriesReducer from './store/reducers/categories';
import transactionsReducer from './store/reducers/transactions';
import themesReducer from './store/reducers/allThemes';
import AppContainer from './AppContainer';

const App = () => {
  const rootReducer = combineReducers({
    user: userReducer,
    settings: settingsReducer,
    exchangeRates: exchangeRatesReducer,
    categories: categoriesReducer,
    transactions: transactionsReducer,
    themes: themesReducer,
  });

  const store = createStore(rootReducer, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
