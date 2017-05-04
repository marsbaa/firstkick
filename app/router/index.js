import React from 'react';
import {Route, Router, IndexRoute, browserHistory} from 'react-router';
import Container from 'Container'

export default (
  <Router history={browserHistory}>
    <Route path="/">
        <IndexRoute component={Container} />
    </Route>
  </Router>
)
