import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Provider as AlertProvider} from 'react-alert';
import Alert from './components/layout/Alert';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer';

const store=createStore(rootReducer, applyMiddleware(thunk));

const AlertTemplate = ({style, options, message, close}) =>(
  <Alert
    style = {style}
    options = {options}
    message = {message}
    close = {close}
  />
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate}>
        <App/>
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();