import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledNavBar = styled.div`
  border-width : 1px;
  border-style : solid;
  borde-color: none;
  border-bottom-color: rgba(0,0,0,0.14);
  padding: 10px;
  margin: 0px;
  color: #656565;
`;

class NavBar extends Component {
  render() {
    return (
      <StyledNavBar>
        <Row>
          <Col xs={1} />
          <Col xs={1}>
            <img src="image/logo.png" style={{ height: '50px' }} />
          </Col>
          <Col xs={10}>
            <Link to="/" style={{ textDecoration: 'none', color: '#656565' }}>
              <font
                style={{ fontSize: '2em', marginTop: '10px', display: 'block' }}
              >
                Prep - Learning Agreement
              </font>
            </Link>
          </Col>
        </Row>
      </StyledNavBar>
    );
  }
}

export default NavBar;
