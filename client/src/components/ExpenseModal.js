import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ExpenseModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Content of your modal goes here.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {/* Add additional buttons or actions here */}
      </Modal.Footer>
    </Modal>
  );
};

export default ExpenseModal;
