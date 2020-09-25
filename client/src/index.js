import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';


//import redux
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
//import reducers
import usersReducer from './store/reducers/users/users';

//combine reducers
const rootReducer = combineReducers({
    persons: usersReducer
});
//create store
const store = createStore(rootReducer);



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
