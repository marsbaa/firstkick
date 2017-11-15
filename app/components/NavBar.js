import React, { Component } from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Menu from 'react-burger-menu/lib/menus/slide';

const StyledNavBar = styled.div`
  border-width: 1px;
  border-style: solid;
  borde-color: none;
  border-bottom-color: rgba(0, 0, 0, 0.14);
  padding: 10px;
  margin: 0px;
  color: #656565;
`;
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

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  render() {
    return (
      <div id="outer-container">
        <Menu
          pageWrapId={'page-wrap'}
          outerContainerId={'outer-container'}
          styles={styles}
          left
          width={'25%'}
          isOpen={this.state.show}
        >
          <StyledLink
            to="/learningspaceform"
            onClick={() => this.setState({ show: false })}
          >
            <SGlyphicon glyph="globe" /> Manage Learning Space
          </StyledLink>
          <StyledLink
            to="/students"
            onClick={() => this.setState({ show: false })}
          >
            <SGlyphicon glyph="user" /> Manage Students
          </StyledLink>
          <StyledLink
            to="/gradeform"
            onClick={() => this.setState({ show: false })}
          >
            <SGlyphicon glyph="globe" /> Manage Grade Level
          </StyledLink>
          <StyledLink
            to="/summary"
            onClick={() => this.setState({ show: false })}
          >
            <SGlyphicon glyph="stats" /> View Summary
          </StyledLink>
          <StyledLink to="/help" onClick={() => this.setState({ show: false })}>
            <SGlyphicon glyph="question-sign" /> Help
          </StyledLink>
        </Menu>
        <main id="page-wrap">
          <StyledNavBar>
            <Row>
              <Col xs={1} />
              <Col xs={1}>
                <img src="image/logo.png" style={{ height: '50px' }} />
              </Col>
              <Col xs={10}>
                <Link
                  to="/"
                  style={{ textDecoration: 'none', color: '#656565' }}
                >
                  <font
                    style={{
                      fontSize: '2em',
                      marginTop: '10px',
                      display: 'block'
                    }}
                  >
                    Learning Agreement
                  </font>
                </Link>
              </Col>
            </Row>
          </StyledNavBar>
        </main>
      </div>
    );
  }
}

export default NavBar;
