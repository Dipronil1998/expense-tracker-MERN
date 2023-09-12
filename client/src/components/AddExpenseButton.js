import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ExpenseModal from './ExpenseModal';
import RangePickers from './RangePickers';

const buttonStyle = {
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  display: 'flex',
  flexDirection: 'row',
  marginRight: '5%',
  justifyContent: 'space-between'
};

const buttonGap = {
  marginLeft: '10px'
}

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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <RangePickers />
        <div style={buttonGap}>
          <Button variant="info">Apply</Button>
        </div>
        <div style={buttonGap}>
          <Button variant="danger">Cancel</Button>
        </div>
      </div>
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
