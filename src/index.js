import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './components/app';
import thunk from 'redux-thunk';
import reducers from './reducers';
import promise from 'redux-promise';
import { Router, Route, browserHistory } from 'react-router';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="*" component={App}/>
    </Router>
  </Provider>
  , document.querySelector('.container'));
