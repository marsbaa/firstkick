import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Dashboard from 'Dashboard';
import LearningSpaceForm from 'LearningSpaceForm';
import ContainerPanel from 'ContainerPanel';
import GradeForm from 'GradeForm';
import StudentForm from 'StudentForm';
import Summary from 'Summary';
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
          <Route path="/gradeform" component={GradeForm} />
          <Route path="/students" component={StudentForm} />
          <Route path="/summary" component={Summary} />
          <Route path="/:grade" component={ContainerPanel} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('app')
);
