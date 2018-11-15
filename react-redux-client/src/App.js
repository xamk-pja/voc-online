// ./react-redux-client/src/App.js
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import routes from './routes';
import configureStore from './store/configureStore';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

/**
 * Main App function
 */
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
