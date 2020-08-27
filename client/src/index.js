import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Routes from './Routes';

import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './store/reducers/rootReducer';

const store=createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();