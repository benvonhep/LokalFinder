import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store/store';
import { getLocationFromSelect, getLocations } from './store/actions/locationsAction';
import ErrorBoundary from './components/layout/ErrorBoundary';

store.dispatch(getLocations());

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary><Provider store={store}><BrowserRouter> <App /></BrowserRouter></Provider></ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);





  // import * as serviceWorker from './serviceWorker';
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
