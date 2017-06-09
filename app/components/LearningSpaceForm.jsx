import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  FieldGroup,
  Glyphicon,
  Badge,
  ButtonGroup,
  Button
} from 'react-bootstrap';
import DeleteModal from 'DeleteModal';
import FormModal from 'FormModal';
import { laHeader } from 'styles.css';
import styled from 'styled-components';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import {
  addLearningSpace,
  learningSpaceStatus,
  startLearningSpaces
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
      color: #c94e50
    }
`;

const StyledCircleButton = styled.a`
  display:block;
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
      color: #c94e50
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
      pictureFile: '',
      picturePreviewUrl: '',
      badgeFile: '',
      badgePreviewUrl: '',
      earnBadge: '',
      lsName: '',
      maxgroupsize: '',
      name: '',
      key: '',
      showModal: false,
      multiValue: [],
      filter: 'current'
    };
    this.open = this.open.bind(this);
  }

  componentDidMount() {
    const { dispatch, learningSpaces } = this.props;
    if (isEmpty(learningSpaces)) {
      dispatch(startLearningSpaces());
    }
  }
  handleEarnBadge(e) {
    this.setState({ earnBadge: e.target.value });
  }

  handleChange(multiValue) {
    this.setState({ multiValue });
  }

  handleNameChange(e) {
    this.setState({ lsName: e.target.value });
  }

  handleMaxSizeChange(e) {
    this.setState({ maxgroupsize: e.target.value });
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
    e.preventDefault();
    this.setState({ showModal: false });
  }

  handleSubmit() {
    var { dispatch } = this.props;
    let tags = [];
    Object.keys(this.state.multiValue).map(id => {
      let tag = this.state.multiValue[id];
      tags.push(tag.value);
    });
    var learningSpace = {
      name: this.state.lsName,
      maxGroupSize: this.state.maxgroupsize,
      pictureFilename: this.state.pictureFile.name,
      badgeFilename: this.state.badgeFile.name,
      earnBadge: this.state.earnBadge,
      tags,
      status: 'current'
    };
    dispatch(
      addLearningSpace(
        learningSpace,
        this.state.pictureFile,
        this.state.badgeFile
      )
    );
    this.setState({ showModal: false });
  }

  changeLearningSpaceStatus(key, status) {
    const { dispatch } = this.props;
    dispatch(learningSpaceStatus(key, status));
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

  handleBadgeChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        badgeFile: file,
        badgePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const { learningSpaces } = this.props;

    let filteredLearningSpaces = filter(learningSpaces, {
      status: this.state.filter
    });
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
    return (
      <div>
        <FormModal
          title="ADD LEARNING SPACE"
          show={this.state.showModal}
          close={e => this.close.bind(this)}
          handlePictureChange={this.handlePictureChange.bind(this)}
          handleEarnBadge={this.handleEarnBadge.bind(this)}
          handleBadgeChange={this.handleBadgeChange.bind(this)}
          handleChange={this.handleChange.bind(this)}
          handleNameChange={this.handleNameChange.bind(this)}
          handleMaxSizeChange={this.handleMaxSizeChange.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
          multiValue={this.state.multiValue}
        />

        <Row style={{ textAlign: 'center', margin: '10px 20px' }}>
          <Col xs={10} md={10} lg={10} style={{ paddingLeft: '200px' }}>
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
              const {
                key,
                name,
                pictureURL,
                badgeURL,
                students,
                tags,
                status,
                maxGroupSize
              } = filteredLearningSpaces[id];
              return (
                <div
                  key={key}
                  className="laBox"
                  style={{
                    backgroundImage: `url(${pictureURL})`
                  }}
                >
                  <Row className="laHeader">
                    <Col xs={7} md={7} lg={7}>
                      {tags.map((tag, id) => {
                        return (
                          <Badge
                            style={{
                              marginTop: '7px',
                              marginRight: '2px',
                              float: 'left'
                            }}
                            key={id}
                          >
                            {tag}
                          </Badge>
                        );
                      })}
                    </Col>
                    <Col xs={5} md={5} lg={5} style={{ marginTop: '3px' }}>
                      <StyledButton
                        onClick={() =>
                          this.changeLearningSpaceStatus(key, status)}
                      >
                        <Glyphicon glyph="pencil" />
                      </StyledButton>
                      <StyledButton
                        onClick={() =>
                          this.changeLearningSpaceStatus(key, status)}
                      >
                        <Glyphicon glyph="transfer" />
                      </StyledButton>
                      {status === 'archived'
                        ? <StyledButton
                            onClick={() => this.open(name, key, status)}
                          >
                            <Glyphicon glyph="trash" />
                          </StyledButton>
                        : null}
                    </Col>
                  </Row>
                  <Row className="laFooter">
                    <Col xs={2} md={2} lg={2}>
                      <img
                        style={{ marginTop: '5px', width: '20px' }}
                        src={badgeURL}
                      />
                    </Col>
                    <Col
                      xs={8}
                      md={8}
                      lg={8}
                      style={{ margin: '0px', paddingTop: '10px' }}
                    >
                      <b>{name}</b>
                    </Col>
                    <Col
                      xs={2}
                      md={2}
                      lg={2}
                      style={{ margin: '0px', paddingTop: '10px' }}
                    >
                      <b>0/{maxGroupSize}</b>
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
    learningSpaces: state.learningSpaces
  };
}

export default connect(mapStateToProps)(LearningSpaceForm);
