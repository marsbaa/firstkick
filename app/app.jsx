import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Container from 'Container';
import LearningSpaceForm from 'LearningSpaceForm';
import StudentForm from 'StudentForm';
import NavBar from 'NavBar';
import { Row, Col, Glyphicon, Overlay, Tooltip } from 'react-bootstrap';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import Menu from 'react-burger-menu/lib/menus/slide';
var store = require('configureStore').configure();

const StyledLink = styled(Link)`
  color: papayawhip;
  font-size: 22px;
  margin-top: 20px;
`;

const SGlyphicon = styled(Glyphicon)`
  margin-right: 10px;
`;

const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '25px'
  },
  bmBurgerBars: {
    background: '#656565'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
};

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div id="outer-container">
        <Menu
          pageWrapId={'page-wrap'}
          outerContainerId={'outer-container'}
          styles={styles}
          left
          width={'25%'}
        >
          <StyledLink to="/learningspaceform">
            <SGlyphicon glyph="globe" /> Manage Learning Space
          </StyledLink>
          <StyledLink to="/students">
            <SGlyphicon glyph="user" /> Manage Students
          </StyledLink>
          <StyledLink to="/summary">
            <SGlyphicon glyph="stats" /> View Summary
          </StyledLink>
        </Menu>
        <main id="page-wrap">
          <NavBar />
          <Switch>
            <Route path="/learningspaceform" component={LearningSpaceForm} />
            <Route path="/students" component={StudentForm} />
            <Route path="/" component={Container} />
          </Switch>
        </main>
      </div>

    </Router>
  </Provider>,
  document.getElementById('app')
);
