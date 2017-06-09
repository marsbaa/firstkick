import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Creatable } from 'react-select';
import 'react-select/dist/react-select.css';
import styled from 'styled-components';

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

const FormModal = props => {
  return (
    <Modal show={props.show} onHide={props.close()}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form style={{ padding: '10px 40px' }}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              style={{}}
              type="text"
              id="name"
              name="name"
              placeholder="Enter Name of Learning Space"
              onChange={e => props.handleNameChange(e)}
            />
          </div>
          <div className="form-group">
            <label>Maximum Group Size</label>
            <input
              className="form-control"
              type="text"
              name="maxgroupsize"
              id="maxgroupsize"
              placeholder="Enter Maximum Group Size"
              onChange={e => props.handleMaxSizeChange(e)}
            />
          </div>
          <label>Picture</label>
          <input
            type="file"
            name="picture"
            id="picture"
            onChange={e => props.handlePictureChange(e)}
          />
          <label style={{ marginTop: '20px' }}>Badge</label>
          <input
            type="file"
            name="badge"
            id="badge"
            onChange={e => props.handleBadgeChange(e)}
          />
          <div className="form-group" style={{ marginTop: '20px' }}>
            <label>Attempts needed to earn badge</label>
            <input
              className="form-control"
              type="text"
              name="earnbadge"
              id="earnbadge"
              placeholder="Enter number of attempts needed"
              onChange={e => props.handleEarnBadge(e)}
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
            onChange={e => props.handleChange(e)}
            value={props.multiValue}
          />

        </form>

      </Modal.Body>

      <Modal.Footer>
        <div style={{ textAlign: 'center' }}>
          <StyledButton onClick={props.close()}>Cancel</StyledButton>
          <StyledButton onClick={() => props.handleSubmit()}>
            Submit
          </StyledButton>
        </div>
      </Modal.Footer>

    </Modal>
  );
};

export default FormModal;
