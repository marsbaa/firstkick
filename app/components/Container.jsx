import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import MultiBackend, {
  Preview,
  TouchTransition
} from 'react-dnd-multi-backend';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import LearningSpaceSelector from 'LearningSpaceSelector';
import Student from 'Student';
import BadgeCheck from 'BadgeCheck';
import StudentModal from 'StudentModal';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { sHeader } from 'styles.css';
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
      backend: HTML5Backend,
      preview: true
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
  padding: 10px 5px;
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
    this.state = {
      showStudentModal: false,
      student: ''
    };
    this.handleDropOutside = this.handleDropOutside.bind(this);
  }

  closeS(e) {
    this.setState({
      showStudentModal: false
    });
  }

  generatePreview(type, item, style) {
    Object.assign(style, {
      backgroundColor: item.color,
      width: '50px',
      height: '50px'
    });
    return (
      <div style={style}>
        <img style={{ width: '100px', height: '100px' }} src="image/sun.png" />
      </div>
    );
  }

  render() {
    const { learningSpaces, students, learningAgreements, grade } = this.props;
    const selectedGrade = this.props.match.params.grade;
    console.log(selectedGrade);
    let dropStudent = 0;
    var filteredLA = filter(learningAgreements, o => {
      if (o.date !== undefined) {
        return moment().isSame(o.date, 'day');
      }
    });

    return (
      <div style={{ margin: '20px 40px 40px 20px' }}>
        <Preview generator={this.generatePreview} />
        <StudentModal
          title="STUDENT DETAILS"
          show={this.state.showStudentModal}
          close={this.closeS.bind(this)}
          student={this.state.student}
        />
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
                    learningAgreements={filter(learningAgreements, {
                      learningSpaceKey: key
                    })}
                    moveStudent={item => {
                      this.handleDropOutside(item);
                    }}
                  />
                );
              })}
            </SHeader>

          </Col>
          <Col xs={3} md={3} lg={3}>
            <SHeader>
              <Col xs={6} md={3} lg={3}>
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
              <Col xs={12} md={12} lg={12}>
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
            <Row>
              <Col xs={12} md={12} lg={12}>
                <BadgeCheck onDrop={item => this.handleBadgeCheck(item)} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }

  handleBadgeCheck(item) {
    const { students } = this.props;
    this.setState({
      showStudentModal: true,
      student: students[item.id]
    });
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
