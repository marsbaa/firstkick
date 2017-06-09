import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import { laHeader, inputfile } from 'styles.css';
import styled from 'styled-components';
import { startStudents, addStudent } from 'actions';
import isEmpty from 'lodash/isEmpty';
import Papa from 'papaparse';

const StyledStudentBox = styled.div`
  border: 3px solid black;
  border-radius: 10px;
  background: #FFD503;
  padding: 0.2rem 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0.4rem;
  float: left;
  width: 15rem;
  text-align: center;
  font-size: 12px;
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

class StudentForm extends Component {
  componentWillMount() {
    const { dispatch, students } = this.props;
    if (isEmpty(students)) {
      dispatch(startStudents());
    }
  }

  handleChange(e) {
    var { dispatch, coaches } = this.props;
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

  onSubmit(values) {
    var { dispatch } = this.props;
    var student = {
      name: values.name,
      grade: 'Prep'
    };
    dispatch(addStudent(student));
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-error' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className={field.className} type={field.type} {...field.input} />
        <div className="help-block">{touched ? error : ''}</div>

      </div>
    );
  }

  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const { students, handleSubmit } = this.props;

    return (
      <div key="studentform" style={{ margin: '20px 40px 40px 20px' }}>
        <Row style={{ padding: '10px' }}>
          <Col xs={9}>
            {Object.keys(students).map(key => {
              const { name } = students[key];
              return (
                <StyledStudentBox key={key}>
                  <Row>
                    <Col xs={6}>
                      <b style={{ fontSize: '140%' }}>{name.substring(0, 1)}</b>
                      {name.substring(1, name.length)}
                    </Col>
                    <Col xs={6}>
                      <StyledButton>
                        <Glyphicon glyph="remove" />
                      </StyledButton>
                    </Col>
                  </Row>

                </StyledStudentBox>
              );
            })}
          </Col>
          <Col
            xs={3}
            md={3}
            lg={3}
            style={{
              border: '1px solid black',
              borderRadius: '10px'
            }}
          >
            <Row className="sHeader">
              <Col xs={10}>
                <h4 style={{ textAlign: 'center', marginTop: '0px' }}>
                  Add Student
                </h4>
              </Col>
              <Col xs={2}>
                <input
                  name="file"
                  id="file"
                  className="inputfile"
                  type="file"
                  accept=".csv"
                  onChange={this.handleChange.bind(this)}
                />
                <label htmlFor="file"><Glyphicon glyph="upload" /></label>
              </Col>
            </Row>
            <Row style={{ padding: '10px 46px 40px 10px' }}>
              <div>
                <Row style={{ marginTop: '20px' }}>
                  <Col xs={12}>
                    <form
                      style={{ marginTop: '20px', float: 'right' }}
                      onSubmit={handleSubmit(this.onSubmit.bind(this))}
                    >
                      <Field
                        label="Name"
                        className="form-control"
                        type="text"
                        id="name"
                        name="name"
                        component={this.renderField}
                      />
                      <label>Picture</label>
                      <input
                        type="file"
                        name="picture"
                        id="picture"
                        onChange={this.handleImageChange.bind(this)}
                      />
                      <button
                        style={{
                          marginTop: '40px',
                          float: 'right',
                          width: '100%'
                        }}
                        type="submit"
                        className="btn btn-primary"
                      >
                        Submit
                      </button>
                    </form>
                  </Col>
                </Row>
              </div>

            </Row>
          </Col>

        </Row>
      </div>
    );
  }
}
function validate(values) {
  const errors = {};
  if (!values.name) {
    errors.name = 'Enter a Name!';
  }
  return errors;
}

StudentForm = reduxForm({
  validate,
  form: 'StudentForm'
})(StudentForm);

const selector = formValueSelector('StudentForm'); // <-- same as form name
StudentForm = connect(state => {
  // can select values individually
  const nameValue = selector(state, 'name');
  return {
    nameValue,
    students: state.students
  };
})(StudentForm);

export default StudentForm;
