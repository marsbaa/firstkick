import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import styled from 'styled-components';

const StyledCircleButton = styled.a`
  display: inline-block;
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
const AddGradeHelp = () => {
  return (
    <SHeader>
      <Col xs={12} md={12} lg={12} style={{ padding: '10px 100px' }}>
        <h3>How to Add Grade?</h3>
        <p style={{ fontSize: '20px' }}>
          <ol>
            <li>
              Click on <Glyphicon glyph="menu-hamburger" /> menu
            </li>
            <li>Select "Manage Grade Level"</li>
            <li>
              Click on{' '}
              <StyledCircleButton>
                <Glyphicon glyph="plus" />
              </StyledCircleButton>
            </li>
            <li>
              Enter the name for the 'Grade Level' (e.g Prep, Grade 1, Grade 2)
            </li>
            <li>
              Enter the number of learning agreement sessions per day for .{' '}
              <i>Always choose the higher limit if unsure</i>
            </li>
            <li>
              Check on Enable Badge if you would like students to earn badge as
              they progress.
            </li>
            <li>Submit</li>
          </ol>
        </p>
      </Col>
    </SHeader>
  );
};

export default AddGradeHelp;
