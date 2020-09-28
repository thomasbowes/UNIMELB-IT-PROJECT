import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';


//import redux
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

//redux thunk
import thunk from 'redux-thunk';

//import reducers
import usersReducer from './store/reducers/users';
import authReducer from './store/reducers/auth';

//combine reducers
const rootReducer = combineReducers({
    users: usersReducer,
    auth: authReducer
});

// import redux dev tools for chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//create store
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));




ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Provider store={store}><App /></Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
