import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Glyphicon,
  Badge,
  ButtonGroup,
  Button
} from 'react-bootstrap';
import DeleteModal from 'DeleteModal';
import FormModal from 'FormModal';
import EditFormModal from 'EditFormModal';
import LearningSpace from 'LearningSpace';
import styled from 'styled-components';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import {
  addLearningSpace,
  learningSpaceStatus,
  startLearningSpaces,
  startGrade
} from 'actions';

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

const StyledCircleButton = styled.a`
  display: block;
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

class LearningSpaceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      key: '',
      showModal: false,
      showEditModal: false,
      filter: 'current',
      learningSpace: {},
      gradeSelected: 'Prep'
    };
    this.open = this.open.bind(this);
    this.handleGrade = this.handleGrade.bind(this);
  }

  componentWillMount() {
    const { dispatch, learningSpaces, grades } = this.props;
    if (isEmpty(learningSpaces)) {
      dispatch(startLearningSpaces());
    }
    if (isEmpty(grades)) {
      dispatch(startGrade());
    }
  }

  open(name, key) {
    this.setState({
      name,
      key,
      status,
      showModal: true
    });
  }

  close(e) {
    this.setState({
      showModal: false
    });
  }

  closeE(e) {
    this.setState({
      showEditModal: false
    });
  }

  editLearningSpace(learningSpace) {
    this.setState({
      showEditModal: true,
      learningSpace
    });
  }

  handleGrade(e) {
    this.setState({ gradeSelected: e.target.value });
  }

  changeLearningSpaceStatus(key, status) {
    const { dispatch } = this.props;
    dispatch(learningSpaceStatus(key, status));
  }

  render() {
    const { learningSpaces, grades } = this.props;
    let activeCurrent, activeArchived;
    if (this.state.filter === 'current') {
      activeCurrent = {
        backgroundColor: '#c94e50',
        color: '#fffce1'
      };
      activeArchived = {};
    } else {
      activeCurrent = {};
      activeArchived = {
        backgroundColor: '#c94e50',
        color: '#fffce1'
      };
    }
    let filteredLearningSpaces;
    if (this.state.gradeSelected !== '') {
      filteredLearningSpaces = filter(learningSpaces, {
        grade: this.state.gradeSelected
      });
    }
    return (
      <div>
        <FormModal
          title="ADD LEARNING SPACE"
          show={this.state.showModal}
          close={this.close.bind(this)}
        />
        <EditFormModal
          title="EDIT LEARNING SPACE"
          show={this.state.showEditModal}
          close={this.closeE.bind(this)}
          learningSpace={this.state.learningSpace}
        />

        <Row style={{ textAlign: 'center', margin: '10px 20px' }}>
          <Col xs={2} md={2} lg={2}>
            <FormGroup
              controlId="formControlsSelect"
              style={{ marginBottom: '0' }}
            >
              <FormControl
                id="gradeSelect"
                componentClass="select"
                placeholder="select"
                onChange={this.handleGrade}
              >
                {Object.keys(grades).map(key => {
                  const { name } = grades[key];
                  return (
                    <option key={key} value={name}>
                      {name}
                    </option>
                  );
                })}
              </FormControl>
            </FormGroup>
          </Col>
          <Col xs={8} md={8} lg={8}>
            <StyledButtonGroup
              style={{
                borderTopLeftRadius: '10px',
                borderBottomLeftRadius: '10px',
                ...activeCurrent
              }}
              onClick={() => this.setState({ filter: 'current' })}
            >
              Current
            </StyledButtonGroup>
            <StyledButtonGroup
              style={{
                borderTopRightRadius: '10px',
                borderBottomRightRadius: '10px',
                ...activeArchived
              }}
              onClick={() => this.setState({ filter: 'archived' })}
            >
              Archived
            </StyledButtonGroup>
          </Col>
          <Col xs={2} md={2} lg={2} style={{ paddingLeft: '150px' }}>
            <StyledCircleButton
              onClick={() => this.setState({ showModal: true })}
            >
              <Glyphicon glyph="plus" />
            </StyledCircleButton>
          </Col>
        </Row>

        <SHeader>
          <Col xs={12} md={12} lg={12}>
            {Object.keys(filteredLearningSpaces).map(id => {
              if (this.state.filter === filteredLearningSpaces[id].status) {
                return (
                  <LearningSpace
                    key={id}
                    learningSpace={filteredLearningSpaces[id]}
                    changeLearningSpaceStatus={this.changeLearningSpaceStatus.bind(
                      this
                    )}
                    editLearningSpace={this.editLearningSpace.bind(this)}
                    open={this.open.bind(this)}
                  />
                );
              }
            })}
          </Col>
        </SHeader>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    learningSpaces: state.learningSpaces,
    grades: state.grade,
    selectedGrade: state.selectedGrade
  };
}

export default connect(mapStateToProps)(LearningSpaceForm);
