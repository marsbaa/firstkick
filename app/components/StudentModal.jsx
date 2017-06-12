import React, { Component } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { startLearningSpaces, startLearningAgreements } from 'actions';
import BadgeStatus from 'BadgeStatus';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import size from 'lodash/size';

const StyledStudentBox = styled.div`
  background: white;
  padding: 0.2rem 0.2rem;
  margin-right: 0.5rem;
  margin-bottom: 0.4rem;
  margin-top: 0.4rem;
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
const SHeader = styled(Row)`
  height: 35px;
  border: 1px solid white;
  border-top-color: rgba(0,0,0,0.4);
  padding: 10px 5px;
  color: #656565;
  margin-top: 20px;
`;

class StudentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pictureFile: '',
      picturePreviewUrl: '',
      grade: 'prep'
    };
  }

  componentDidMount() {
    const { dispatch, learningSpaces, learningAgreements } = this.props;
    if (isEmpty(learningSpaces)) {
      dispatch(startLearningSpaces());
    }
    if (isEmpty(learningAgreements)) {
      dispatch(startLearningAgreements());
    }
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

  render() {
    const {
      show,
      close,
      title,
      learningSpaces,
      student,
      learningAgreements
    } = this.props;
    const filteredLearningSpaces = filter(learningSpaces, {
      status: 'current'
    });
    const filteredLearningAgreements = filter(learningAgreements, {
      studentKey: student.key
    });

    return (
      <Modal show={show} onHide={close} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row style={{ padding: '20px' }}>
            <Col xs={3} md={3} lg={3}>
              <StyledStudentBox key="studentBox">
                <Row>
                  <Col xs={12} md={12} lg={12}>
                    <img src="../image/user.png" style={{ width: '120px' }} />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={12} lg={12}>
                    <b style={{ fontSize: '22px', textAlign: 'center' }}>
                      {student.name}
                    </b>
                  </Col>
                </Row>
                <SHeader>
                  <Col xs={12} md={12} lg={12}>
                    <b style={{ fontSize: '12px' }}>BADGE EARNED</b>
                    <div style={{ marginTop: '10px' }}>
                      {Object.keys(filteredLearningSpaces).map(id => {
                        const {
                          badgeURL,
                          earnBadge,
                          key
                        } = filteredLearningSpaces[id];
                        const count = size(
                          filter(filteredLearningAgreements, {
                            learningSpaceKey: key
                          })
                        );
                        if (count === parseInt(earnBadge)) {
                          return (
                            <img
                              src={badgeURL}
                              style={{ width: '30px', float: 'left' }}
                            />
                          );
                        }
                      })}
                    </div>

                  </Col>
                </SHeader>
              </StyledStudentBox>
            </Col>
            <Col xs={9} md={9} lg={9}>
              {Object.keys(filteredLearningSpaces).map(id => {
                const { badgeURL, earnBadge, key } = filteredLearningSpaces[id];
                const count = size(
                  filter(filteredLearningAgreements, { learningSpaceKey: key })
                );
                return (
                  <BadgeStatus
                    key={key}
                    earned={count}
                    toComplete={earnBadge}
                    badge={badgeURL}
                  />
                );
              })}
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <div style={{ textAlign: 'center' }}>
            <StyledButton onClick={close}>Done</StyledButton>
          </div>
        </Modal.Footer>

      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    learningSpaces: state.learningSpaces,
    learningAgreements: state.learningAgreements
  };
}

export default connect(mapStateToProps)(StudentModal);
