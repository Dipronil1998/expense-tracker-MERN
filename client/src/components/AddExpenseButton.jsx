import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ExpenseModal from './ExpenseModal';
import { useAppContext } from '../context/appContext';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

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
  const { selectedDates,
    setSelectedDates,
    tempSelectedDates,
    setTempSelectedDates,getAllExpenses } = useAppContext();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDateChange = (dates) => {
    setTempSelectedDates(dates); 
  };

  const applyDateChange = () => {
    setSelectedDates(tempSelectedDates); 
  };

  const cancelDateChange = () => {
    setSelectedDates([]);
    setTempSelectedDates([]);
  };
  

  return (
    <div style={buttonStyle}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* <RangePickers /> */}
        <Space direction="vertical" size={12}>
          <RangePicker
            value={tempSelectedDates}
            onChange={handleDateChange}
            allowClear={false}
          />
        </Space>
        <div style={buttonGap}>
          <Button variant="info" onClick={applyDateChange}>Apply</Button>
        </div>
        <div style={buttonGap}>
          <Button variant="danger" onClick={cancelDateChange}>Cancel</Button>
        </div>
      </div>
      <div className="">

        <Button
          variant="primary"
          onClick={openModal}
        >
          Add Expense
        </Button>
      </div>

      {/* Render the ExpenseModal component */}
      <ExpenseModal show={showModal} handleClose={closeModal} />
    </div>
  );
};

export default AddExpenseButton;
