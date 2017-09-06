import React, { Component } from 'react';
import { Modal, Button, Row, Col, Checkbox } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateGrade } from 'actions';

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

class GradeFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      slots: '',
      badge: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { dispatch } = this.props;
    const { key, name, slots, badge } = this.props.grade;
    var grade = {
      name: this.state.name === '' ? name : this.state.name,
      slots: this.state.slots === '' ? slots : this.state.slots,
      badge: this.state.badge === '' ? badge : this.state.badge
    };
    console.log(grade, key);
    dispatch(updateGrade(grade, key));
    this.props.close();
  }

  render() {
    const { show, close, title, grade } = this.props;
    return (
      <Modal show={show} onHide={close} bsSize="small">
        <Modal.Header closeButton>
          <Modal.Title>
            {title}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row style={{ padding: '10px' }}>
            <Col xs={12} md={12} lg={12}>
              <form>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    className="form-control"
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={grade.name}
                    placeholder="Enter Grade name"
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Learning Agreement Slots Per Day</label>
                  <input
                    className="form-control"
                    type="text"
                    name="maxSlots"
                    id="maxSlots"
                    defaultValue={grade.slots}
                    placeholder="Enter Slots per day"
                    onChange={e => this.setState({ slots: e.target.value })}
                  />
                </div>
                <Checkbox
                  name="badgeEnable"
                  style={{ marginRight: '5px' }}
                  defaultChecked={grade.badge}
                  onChange={() =>
                    this.setState({ badge: this.state.badge ? false : true })}
                >
                  Enable Badges
                </Checkbox>
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

export default connect()(GradeFormModal);
