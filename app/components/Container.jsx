import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import MultiBackend, { TouchTransition } from 'react-dnd-multi-backend';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import LearningSpaceSelector from 'LearningSpaceSelector';
import Student from 'Student';
import {
  Grid,
  Row,
  Col,
  Glyphicon,
  Well,
  DropdownButton,
  MenuItem,
  ButtonToolbar
} from 'react-bootstrap';
var actions = require('actions');
import { connect } from 'react-redux';
import update from 'react/lib/update';
import Speech from 'react-speech';
import Wad from 'web-audio-daw';
import { sHeader } from 'styles.css';
import firebase from 'app/firebase';
import {
  startStudents,
  startLearningSpaces,
  startLearningAgreements,
  addLearningAgreement,
  removeLearningAgreement
} from 'actions';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import filter from 'lodash/filter';
import size from 'lodash/size';
import moment from 'moment';
import styled from 'styled-components';

const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend
    },
    {
      backend: TouchBackend({ enableMouseEvents: true }), // Note that you can call your backends with options
      preview: true,
      transition: TouchTransition
    }
  ]
};

const SHeader = styled(Row)`
  height: 35px;
  border-width: 1px;
  border-style: solid;
  border-color: white;
  border-top-color: rgba(0,0,0,0.4);
  padding: 10px 10px;
  margin-left: 10px;
  margin-right: 10px;
  color: #656565;
`;

@DragDropContext(MultiBackend)
class Container extends Component {
  componentWillMount() {
    const {
      dispatch,
      students,
      learningSpaces,
      learningAgreements
    } = this.props;
    if (isEmpty(students)) {
      dispatch(startStudents());
    }
    if (isEmpty(learningSpaces)) {
      dispatch(startLearningSpaces());
    }
    if (isEmpty(learningAgreements)) {
      dispatch(startLearningAgreements());
    }
  }

  constructor(props) {
    super(props);
    this.handleDropOutside = this.handleDropOutside.bind(this);
  }
  render() {
    const { learningSpaces, students, learningAgreements } = this.props;
    let dropStudent = 0;
    let filteredLA = filter(learningAgreements, o => {
      if (o.date !== undefined) {
        return moment().isSame(o.date, 'day');
      }
    });

    return (
      <div style={{ margin: '20px 40px 40px 20px' }}>
        <Row>
          <Col md={9} lg={9} xs={9}>
            <SHeader>
              {Object.keys(learningSpaces).map(id => {
                const {
                  key,
                  name,
                  pictureURL,
                  badgeURL,
                  maxGroupSize
                } = learningSpaces[id];
                const laStudents = filter(filteredLA, {
                  learningSpaceKey: key
                });
                dropStudent += _.size(laStudents);
                return (
                  <LearningSpaceSelector
                    key={key}
                    name={name}
                    picture={pictureURL}
                    badge={badgeURL}
                    students={laStudents}
                    maxSize={parseInt(maxGroupSize)}
                    onDrop={item => this.handleDrop(key, item)}
                    moveStudent={item => {
                      this.handleDropOutside(item);
                    }}
                  />
                );
              })}
            </SHeader>

          </Col>
          <Col xs={3}>
            <SHeader>
              <Col xs={6}>
                <b>Students</b>
              </Col>
              <Col xs={6}>
                <b style={{ float: 'right' }}>
                  {size(students) - dropStudent}
                  /
                  {size(students)}
                </b>
              </Col>
            </SHeader>
            <Row style={{ padding: '10px 10px 10px 35px' }}>
              <Col xs={12}>
                {Object.keys(students).map(key => {
                  const { name } = students[key];
                  const dropped = find(filteredLA, { studentKey: key });
                  if (dropped === undefined) {
                    return (
                      <Student
                        key={key}
                        name={name}
                        id={key}
                        moveStudent={() => {
                          this.handleDropOutside(key);
                        }}
                      />
                    );
                  }
                })}
              </Col>

            </Row>
          </Col>
        </Row>
      </div>
    );
  }
  handleDropOutside(key) {
    const { dispatch, learningAgreements } = this.props;
    let filteredLA = filter(learningAgreements, o => {
      return moment().isSame(o.date, 'day');
    });
    const la = find(filteredLA, { studentKey: key });
    if (la !== undefined) {
      dispatch(removeLearningAgreement(la.key));
    }
  }

  handleDrop(key, item) {
    const { dispatch, learningAgreements } = this.props;
    const learningAgreement = {
      date: moment().format(),
      name: item.name,
      studentKey: item.id,
      learningSpaceKey: key
    };
    let filteredLA = filter(learningAgreements, o => {
      return moment().isSame(o.date, 'day');
    });
    const exist = find(filteredLA, { studentKey: item.id });
    if (exist !== undefined) {
      dispatch(addLearningAgreement(learningAgreement, exist.key));
    } else {
      dispatch(addLearningAgreement(learningAgreement, null));
    }
  }
}

function mapStateToProps(state) {
  return {
    learningSpaces: state.learningSpaces,
    students: state.students,
    learningAgreements: state.learningAgreements
  };
}

export default connect(mapStateToProps)(Container);
