import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = props => {
  return (
    <Modal show={props.show} onHide={props.close()}>
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {props.body}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.close()}>No</Button>
        <Button bsStyle="primary" onClick={() => props.delete()}>Yes</Button>
      </Modal.Footer>

    </Modal>
  );
};

export default DeleteModal;
