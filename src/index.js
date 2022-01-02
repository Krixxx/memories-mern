import React from 'react';
import ReactDom from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './App';

import './index.css';

//create redux store with reducers and apply middeware 'thunk'.
//We need thunk to return functions, rather than actions, within Redux.
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
