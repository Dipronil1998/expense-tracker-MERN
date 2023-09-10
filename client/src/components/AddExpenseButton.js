import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ExpenseModal from './ExpenseModal';

const buttonStyle = {
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  display: 'flex',
  flexDirection: 'row',
  marginRight: '5%', 
};

const AddExpenseButton = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div style={buttonStyle}>
      <Button
        variant="primary"
        className="top-right-button"
        onClick={openModal}
      >
        Add Expense
      </Button>

      {/* Render the ExpenseModal component */}
      <ExpenseModal show={showModal} handleClose={closeModal} />
    </div>
  );
};

export default AddExpenseButton;
