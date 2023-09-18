import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ExpenseModal from './ExpenseModal';
import { useAppContext } from '../context/appContext';
import { DatePicker, Space, Select } from 'antd';

const { RangePicker } = DatePicker;

const buttonStyle = {
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  display: 'flex',
  flexDirection: 'row',
  marginRight: '5%',
  justifyContent: 'space-between',
};

const buttonGap = {
  marginLeft: '10px',
};

const AddExpenseButton = () => {
  const options = [];
  const {
    selectedDates,
    setSelectedDates,
    tempSelectedDates,
    setTempSelectedDates,
    showModal,
    toggleModal,
    validCategories,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    tempSelectedCategoryFilter,
    setTempSelectedCategoryFilter,
  } = useAppContext();

  validCategories.map((validCategory) => {
    options.push({
      label: validCategory,
      value: validCategory,
    });
  });

  const openModal = () => {
    toggleModal();
  };

  

  const handleDateChange = (dates) => {
    setTempSelectedDates(dates);
  };

  const handleChange = (value) => {
    setTempSelectedCategoryFilter(value);
  };

  const applyDateChange = () => {
    setSelectedDates(tempSelectedDates);
    setSelectedCategoryFilter(tempSelectedCategoryFilter);
  };

  const cancelDateChange = () => {
    setSelectedDates([]);
    setTempSelectedDates([]);
    setSelectedCategoryFilter([]);
    setTempSelectedCategoryFilter([]);

    document.querySelector('.ant-select-selector').click(); 
  };

  return (
    <div style={buttonStyle}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Space style={{ width: '50%' }} direction="vertical">
          <Select
            mode="multiple"
            allowClear={false}
            style={{ width: '100%' }}
            placeholder="Please select"
            value={tempSelectedCategoryFilter} 
            onChange={handleChange}
            options={options}
          />
        </Space>
        <Space style={{ width: '100%', marginLeft: "10px" }} direction="vertical" size={30}>
          <RangePicker
            value={tempSelectedDates}
            onChange={handleDateChange}
            allowClear={false}
            className="custom-range-picker"
          />
        </Space>
        <div style={buttonGap}>
          <Button variant="info" onClick={applyDateChange}>
            Apply
          </Button>
        </div>
        <div style={buttonGap}>
          <Button variant="danger" onClick={cancelDateChange}>
            Cancel
          </Button>
        </div>
      </div>
      <div className="">
        <Button variant="primary" onClick={openModal}>
          Add Expense
        </Button>
      </div>
      {/* Render the ExpenseModal component */}
      <ExpenseModal show={showModal}/>
    </div>
  );
};

export default AddExpenseButton;
