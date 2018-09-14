// ./react-redux-client/src/routes.js
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Buildings from './containers/Buildings';
import Building from './containers/Building';
import Results from './containers/Results';

export default (
  <Route path="/" component={App}>
     <IndexRoute component={Buildings} />
     <Route path="/:id" component={Building} />
     <Route path="/results/:id" component={Results} />
  </Route>
)