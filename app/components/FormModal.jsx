import React, { Component } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { Creatable } from 'react-select';
import 'react-select/dist/react-select.css';
import styled from 'styled-components';
import { addLearningSpace } from 'actions';
import { connect } from 'react-redux';

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

class FormModal extends Component {
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
      multiValue: [],
      grade: 'Prep'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEarnBadge(e) {
    this.setState({ earnBadge: e.target.value });
  }

  handleGradeChange(e) {
    this.setState({ grade: e.target.value });
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

  handleSubmit() {
    const { dispatch } = this.props;
    let tags = [];
    Object.keys(this.state.multiValue).map(id => {
      let tag = this.state.multiValue[id];
      tags.push(tag.value);
    });
    var learningSpace = {
      name: this.state.lsName,
      grade: this.state.grade,
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
    this.props.close();
  }

  render() {
    const { show, close, title } = this.props;

    return (
      <Modal show={show} onHide={close} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>
            {title}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row style={{ padding: '20px' }}>
            <Col xs={7} md={7} lg={7}>
              <form>
                <div className="form-group">
                  <label>Grade</label>
                  <select
                    className="form-control"
                    onChange={this.handleGradeChange.bind(this)}
                  >
                    <option value="Prep">Prep</option>
                    <option value="Grade1">Grade 1</option>
                    <option value="Grade2">Grade 2</option>
                    <option value="Grade3">Grade 3</option>
                    <option value="Grade4">Grade 4</option>
                    <option value="Grade5">Grade 5</option>
                    <option value="Grade6">Grade 6</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    className="form-control"
                    style={{}}
                    type="text"
                    name="name"
                    placeholder="Enter Name of Learning Space"
                    onChange={this.handleNameChange.bind(this)}
                  />
                </div>
                <div className="form-group">
                  <label>Maximum Group Size</label>
                  <input
                    className="form-control"
                    type="text"
                    name="maxgroupsize"
                    placeholder="Enter Maximum Group Size"
                    onChange={this.handleMaxSizeChange.bind(this)}
                  />
                </div>
                <label>Picture</label>
                <input
                  type="file"
                  name="picture"
                  id="picture"
                  onChange={this.handlePictureChange.bind(this)}
                />
                <label style={{ marginTop: '20px' }}>Badge</label>
                <input
                  type="file"
                  name="badge"
                  id="badge"
                  onChange={this.handleBadgeChange.bind(this)}
                />
                <div className="form-group" style={{ marginTop: '20px' }}>
                  <label>Attempts needed to earn badge</label>
                  <input
                    className="form-control"
                    type="text"
                    name="earnbadge"
                    placeholder="Enter number of attempts needed"
                    onChange={this.handleEarnBadge.bind(this)}
                  />
                </div>
                <label style={{ marginTop: '20px' }}>Tags</label>
                <Creatable
                  multi={true}
                  options={[
                    { value: 'Arts', label: 'Arts' },
                    { value: 'Numeracy', label: 'Numeracy' },
                    { value: 'Science', label: 'Science' }
                  ]}
                  onChange={this.handleChange.bind(this)}
                  value={this.state.multiValue}
                />
              </form>
            </Col>
            <Col xs={5} md={5} lg={5}>
              <div
                className="laBox"
                style={{
                  backgroundImage: `url(${this.state.picturePreviewUrl})`
                }}
              >
                <div style={{ height: '35px' }} />
                <Row className="laFooter">
                  <Col xs={2}>
                    <img
                      style={{ marginTop: '5px', width: '20px' }}
                      src={this.state.badgePreviewUrl}
                    />
                  </Col>
                  <Col xs={8} style={{ margin: '0px', paddingTop: '10px' }}>
                    <b>
                      {this.state.lsName}
                    </b>
                  </Col>
                  <Col xs={2} style={{ margin: '0px', paddingTop: '10px' }}>
                    <b>
                      0/{this.state.maxgroupsize}
                    </b>
                  </Col>
                </Row>
              </div>
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

export default connect()(FormModal);
