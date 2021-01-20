import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store/store';
import { getLocations } from './store/actions/locationsAction';
import { getUsers } from './store/actions/usersAction';
import ErrorBoundary from './components/layout/ErrorBoundary';
import Auth0ProviderWithHistory from './auth0-provider-with-history';
import 'react-bootstrap-typeahead/css/Typeahead.css';

store.dispatch(getLocations());
store.dispatch(getUsers());

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <Auth0ProviderWithHistory>
            <App />
          </Auth0ProviderWithHistory>
        </Router>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);





  // import * as serviceWorker from './serviceWorker';
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
