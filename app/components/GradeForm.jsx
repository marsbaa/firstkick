import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import GradeFormModal from 'GradeFormModal';
import EditGradeFormModal from 'EditGradeFormModal';
import styled from 'styled-components';
import { startGrade } from 'actions';
import isEmpty from 'lodash/isEmpty';

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

class GradeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showEditModal: false,
      selectedGrade: {}
    };
  }
  componentWillMount() {
    const { dispatch, grades } = this.props;
    if (isEmpty(grades)) {
      dispatch(startGrade());
    }
  }

  handleEditGrade(grade) {
    this.setState({
      selectedGrade: grade,
      showEditModal: true
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

  render() {
    const { grades } = this.props;

    return (
      <div key="gradeform" style={{ margin: '20px 40px 40px 20px' }}>
        <GradeFormModal
          title="ADD GRADE"
          show={this.state.showModal}
          close={this.close.bind(this)}
        />
        <EditGradeFormModal
          title="EDIT GRADE"
          grade={this.state.selectedGrade}
          show={this.state.showEditModal}
          close={this.closeE.bind(this)}
        />
        <Row style={{ textAlign: 'center', margin: '10px 20px' }}>
          <Col xs={10} md={10} lg={10} />
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
            {Object.keys(grades).map(key => {
              return (
                <div className="gradeBox" key={key}>
                  <Row className="gradeHeader">
                    <Col xs={10} md={10} lg={10} />
                    <Col xs={2} md={2} lg={2}>
                      <StyledButton
                        onClick={() => this.handleEditGrade(grades[key])}
                      >
                        <Glyphicon glyph="pencil" />
                      </StyledButton>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={12} lg={12}>
                      <h1>
                        {grades[key].name}
                      </h1>
                    </Col>
                  </Row>
                </div>
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

export default connect(mapStateToProps)(GradeForm);
