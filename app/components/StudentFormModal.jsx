import React, { Component } from 'react';
import { Modal, Button, Row, Col, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addStudent } from 'actions';

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
const StyledButton = styled.a`
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
  font-weight: 900;
  color: #656565;
  margin: 10px 10px;
  &:hover,
  &:focus {
    text-decoration: none;
    color: #c94e50;
  }
`;

class StudentFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      grade: props.grade
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGrade = this.handleGrade.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleGrade(e) {
    this.setState({ grade: e.target.value });
  }

  handleSubmit() {
    const { dispatch } = this.props;
    var student = {
      name: this.state.name,
      grade: document.getElementById('gradeSelect').value,
      status: 'current'
    };
    dispatch(addStudent(student));
    this.props.close();
  }

  render() {
    const { show, close, title, grades, grade } = this.props;
    return (
      <Modal show={show} onHide={close} bsSize="small">
        <Modal.Header closeButton>
          <Modal.Title>
            {title}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row style={{ padding: '20px' }}>
            <Col xs={12} md={12} lg={12}>
              <form>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    className="form-control"
                    style={{}}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter student's name"
                    onChange={this.handleNameChange.bind(this)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '0' }}>
                  <label>Grade</label>
                  <FormControl
                    id="gradeSelect"
                    componentClass="select"
                    placeholder="select"
                    defaultValue={grade}
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
                </div>
              </form>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <div style={{ textAlign: 'center' }}>
            <StyledButton onClick={close}>Cancel</StyledButton>
            <StyledButton onClick={this.handleSubmit}>Submit</StyledButton>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect()(StudentFormModal);
