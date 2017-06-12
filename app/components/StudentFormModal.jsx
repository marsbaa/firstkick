import React, { Component } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
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
    color: #c94e50
  }
`;

class StudentFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pictureFile: '',
      picturePreviewUrl: '',
      grade: 'prep'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handlePictureChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        pictureFile: file,
        picturePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  handleSubmit() {
    const { dispatch } = this.props;
    var student = {
      name: this.state.name,
      pictureFilename: this.state.pictureFile.name,
      grade: this.state.grade,
      status: 'current'
    };
    dispatch(addStudent(student, this.state.pictureFile));
    this.props.close();
  }

  render() {
    const { show, close, title } = this.props;
    return (
      <Modal show={show} onHide={close} bsSize="medium">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row style={{ padding: '20px' }}>
            <Col xs={7} md={7} lg={7}>
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
                <label>Picture</label>
                <input
                  type="file"
                  name="picture"
                  id="picture"
                  onChange={this.handlePictureChange.bind(this)}
                />
              </form>
            </Col>
            <Col xs={5} md={5} lg={5}>
              <StyledStudentBox key="studentBox">
                <Row>
                  <Col xs={12} md={12} lg={12}>
                    <img src="../image/user.png" style={{ width: '100px' }} />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={12} lg={12}>
                    <b style={{ fontSize: '120%' }}>
                      {this.state.name}
                    </b>
                  </Col>
                </Row>
              </StyledStudentBox>
            </Col>
          </Row>

        </Modal.Body>

        <Modal.Footer>
          <div style={{ textAlign: 'center' }}>
            <StyledButton onClick={close}>Cancel</StyledButton>
            <StyledButton onClick={this.handleSubmit}>
              Submit
            </StyledButton>
          </div>
        </Modal.Footer>

      </Modal>
    );
  }
}

export default connect()(StudentFormModal);
