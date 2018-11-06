// ./react-redux-client/src/App.js
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import routes from './routes';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Keycloak from 'keycloak-js';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

class App extends Component {

  render() {
   return (
        <Provider store={store}>
          <div>
            <Router history={history} routes={routes} />
          </div>
        </Provider>
      );
    }
}


App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default App;
