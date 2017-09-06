import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { startGrade } from 'actions';
import styled from 'styled-components';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import Container from 'Container';

const StyledButtonGroup = styled.a`
  display: inline-block;
  width: 80px;
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

class ContainerPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSession: 1
    };
  }
  componentWillMount() {
    const { dispatch, grades } = this.props;
    if (isEmpty(grades)) {
      dispatch(startGrade());
    }
  }
  render() {
    const { grades } = this.props;
    const grade = find(grades, {
      name: this.props.match.params.grade
    });
    let c = [];
    if (grade !== undefined) {
      for (var i = 0; i < grade.slots; i++) {
        c.push({
          id: i + 1,
          grade: grade.name
        });
      }
    }

    return (
      <div>
        <Row style={{ textAlign: 'center', margin: '10px 20px' }}>
          <Col xs={10} md={10} lg={10}>
            {c.length > 1
              ? c.map(session => {
                  return (
                    <StyledButtonGroup
                      key={session.id}
                      style={{
                        backgroundColor:
                          this.state.selectedSession === session.id
                            ? '#c94e50'
                            : '#fffce1',
                        color:
                          this.state.selectedSession === session.id
                            ? '#fffce1'
                            : '#656565'
                      }}
                      onClick={() =>
                        this.setState({ selectedSession: session.id })}
                    >
                      Session {session.id}
                    </StyledButtonGroup>
                  );
                })
              : null}
          </Col>
          <Col xs={2} md={2} lg={2} />
        </Row>
        {c.map(session => {
          return (
            <Container
              key={session.id}
              grade={session.grade}
              badgeEnabled={grade.badge}
              sessionId={session.id}
              display={this.state.selectedSession === session.id}
            />
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    grades: state.grade
  };
}

export default connect(mapStateToProps)(ContainerPanel);
