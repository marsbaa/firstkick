import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Container from 'Container';
import LearningSpaceForm from 'LearningSpaceForm';
import StudentForm from 'StudentForm';
import NavBar from 'NavBar';
import { Provider } from 'react-redux';

var store = require('configureStore').configure();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/learningspaceform" component={LearningSpaceForm} />
          <Route path="/students" component={StudentForm} />
          <Route path="/" component={Container} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('app')
);
