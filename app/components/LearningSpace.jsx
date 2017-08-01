import React from 'react';
import {
  Row,
  Col,
  Glyphicon,
  Badge,
  ButtonGroup,
  Button
} from 'react-bootstrap';
import styled from 'styled-components';

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

const LearningSpace = props => {
  const {
    key,
    name,
    pictureURL,
    badgeURL,
    tags,
    status,
    maxGroupSize
  } = props.learningSpace;
  const ls = props.learningSpace;
  return (
    <div
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
            onClick={() => props.changeLearningSpaceStatus(key, status)}
          >
            <Glyphicon glyph="transfer" />
          </StyledButton>
          <StyledButton onClick={() => props.editLearningSpace(ls)}>
            <Glyphicon glyph="pencil" />
          </StyledButton>

          {status === 'archived'
            ? <StyledButton onClick={() => this.open(name, key, status)}>
                <Glyphicon glyph="trash" />
              </StyledButton>
            : null}
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} lg={12}>
          <div style={{ height: '40px' }} />
        </Col>
      </Row>
      <Row className="laFooter">
        <Col xs={2} md={2} lg={2}>
          <img style={{ marginTop: '5px', width: '20px' }} src={badgeURL} />
        </Col>
        <Col xs={8} md={8} lg={8} style={{ margin: '0px', paddingTop: '10px' }}>
          <b>
            {name}
          </b>
        </Col>
        <Col xs={2} md={2} lg={2} style={{ margin: '0px', paddingTop: '10px' }}>
          <b>
            0/{maxGroupSize}
          </b>
        </Col>
      </Row>
    </div>
  );
};

export default LearningSpace;
