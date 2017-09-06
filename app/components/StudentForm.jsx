import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {
  Row,
  Col,
  Glyphicon,
  FormGroup,
  ControlLabel,
  FormControl
} from 'react-bootstrap';
import { laHeader, inputfile } from 'styles.css';
import StudentFormModal from 'StudentFormModal';
import StudentModal from 'StudentModal';
import styled from 'styled-components';
import { startStudents, addStudent, startGrade } from 'actions';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import Papa from 'papaparse';

const StyledStudentBox = styled.div`
  border: 1px solid black;
  background: white;
  padding: 0.2rem 0.2rem;
  margin-right: 0.5rem;
  margin-bottom: 0.4rem;
  float: left;
  width: 14rem;
  text-align: center;
  font-size: 16px;
`;

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

class StudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showStudentModal: false,
      student: '',
      gradeSelected: 'Prep'
    };
    this.handleGrade = this.handleGrade.bind(this);
  }
  componentWillMount() {
    const { dispatch, students, grades } = this.props;
    if (isEmpty(students)) {
      dispatch(startStudents());
    }
    if (isEmpty(grades)) {
      dispatch(startGrade());
    }
  }

  handleGrade(e) {
    this.setState({ gradeSelected: e.target.value });
  }

  handleChange(e) {
    var { dispatch } = this.props;
    Papa.parse(e.target.files[0], {
      delimiter: '',
      newline: '',
      header: true,
      complete: function(results, file) {
        Object.keys(results.data).map(id => {
          var student = results.data[id];
          dispatch(addStudent(student));
        });
      }
    });
  }

  close(e) {
    this.setState({
      showModal: false
    });
  }

  closeS(e) {
    this.setState({
      showStudentModal: false
    });
  }

  render() {
    const { students, grades } = this.props;
    let filteredStudents;
    if (this.state.gradeSelected !== '') {
      filteredStudents = filter(students, {
        grade: this.state.gradeSelected
      });
    }
    return (
      <div key="studentform" style={{ margin: '20px 40px 40px 20px' }}>
        <StudentFormModal
          title="ADD STUDENT"
          grades={grades}
          grade={this.state.gradeSelected}
          show={this.state.showModal}
          close={this.close.bind(this)}
        />
        <StudentModal
          title="STUDENT DETAILS"
          show={this.state.showStudentModal}
          close={this.closeS.bind(this)}
          student={this.state.student}
        />
        <Row style={{ textAlign: 'center', margin: '10px 20px' }}>
          <Col xs={2} md={2} lg={2}>
            <FormGroup style={{ marginBottom: '0' }}>
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
          <Col xs={8} md={8} lg={8} />
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
            {Object.keys(filteredStudents).map(key => {
              const { name } = filteredStudents[key];
              return (
                <StyledStudentBox
                  key={key}
                  onClick={() =>
                    this.setState({
                      student: filteredStudents[key],
                      showStudentModal: true
                    })}
                >
                  <Row>
                    <Col xs={12} md={12} lg={12}>
                      <img src="/image/user.png" style={{ width: '100px' }} />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={12} lg={12}>
                      <b style={{ fontSize: '120%' }}>
                        {name.substring(0, 1)}
                      </b>
                      {name.substring(1, name.length)}
                    </Col>
                  </Row>
                </StyledStudentBox>
              );
            })}
          </Col>
        </SHeader>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    students: state.students,
    grades: state.grade
  };
}

export default connect(mapStateToProps)(StudentForm);
