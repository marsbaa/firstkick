import React, { Component } from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import styled from 'styled-components';
import AddGradeHelp from 'AddGradeHelp';
import AddStudentsHelp from 'AddStudentsHelp';
import AddLearningSpaceHelp from 'AddLearningSpaceHelp';

const StyledButton = styled.button`
  display: inline-block;
  padding: 3px 5px;
  margin: auto 1px;
  font-size: 12px;
  font-weight: normal;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid #656565;
  border-radius: 5px;
  background-color: white;
  color: black;
  float: right;
`;

const StyledButtonGroup = styled.a`
  display: inline-block;
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 2.5em;
  cursor: pointer;
  background: #fffce1;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8em;
  font-weight: 800;
  color: #656565;
  &:hover,
  &:focus {
    text-decoration: none;
    color: #c94e50;
  }
`;

const StyledCircleButton = styled.a`
  display: inline-block;
  height: 30px;
  padding: 5px;
  width: 30px;
  border-radius: 50%;
  border: none;
  background: #fffce1;
  color: #656565;
  &:hover,
  &:focus {
    text-decoration: none;
    color: #c94e50;
  }
`;

const SHeader = styled(Row)`
  height: 35px;
  border: 1px solid white;
  border-top-color: rgba(0,0,0,0.4);
  padding: 10px 5px;
  margin-left: 20px;
  margin-right: 20px;
  color: #656565;
`;

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'Add Grade'
    };
  }
  render() {
    let activeCurrent = 'Add Grade';
    return (
      <div>
        <Row style={{ textAlign: 'center', margin: '10px 20px' }}>
          <Col xs={2} md={2} lg={2}>
            <h4>How to Guides...</h4>
          </Col>
          <Col xs={10} md={10} lg={10}>
            <StyledButtonGroup
              style={
                this.state.filter === 'Add Grade'
                  ? {
                      backgroundColor: '#c94e50',
                      color: '#fffce1',
                      borderTopLeftRadius: '10px',
                      borderBottomLeftRadius: '10px'
                    }
                  : {
                      borderTopLeftRadius: '10px',
                      borderBottomLeftRadius: '10px'
                    }
              }
              onClick={() => this.setState({ filter: 'Add Grade' })}
            >
              Add Grade
            </StyledButtonGroup>
            <StyledButtonGroup
              style={
                this.state.filter === 'Add Learning Space'
                  ? {
                      backgroundColor: '#c94e50',
                      color: '#fffce1'
                    }
                  : {}
              }
              onClick={() => this.setState({ filter: 'Add Learning Space' })}
            >
              Add Learning Space
            </StyledButtonGroup>

            <StyledButtonGroup
              style={
                this.state.filter === 'Add Students'
                  ? {
                      backgroundColor: '#c94e50',
                      color: '#fffce1',
                      borderTopRightRadius: '10px',
                      borderBottomRightRadius: '10px'
                    }
                  : {
                      borderTopRightRadius: '10px',
                      borderBottomRightRadius: '10px'
                    }
              }
              onClick={() => this.setState({ filter: 'Add Students' })}
            >
              Add Students
            </StyledButtonGroup>
          </Col>
        </Row>
        {this.state.filter === 'Add Grade' ? <AddGradeHelp /> : ''}
        {this.state.filter === 'Add Learning Space'
          ? <AddLearningSpaceHelp />
          : ''}
        {this.state.filter === 'Add Students' ? <AddStudentsHelp /> : ''}
      </div>
    );
  }
}

export default Help;
