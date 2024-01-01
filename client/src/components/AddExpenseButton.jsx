import React from 'react';
import { Button } from 'react-bootstrap';
import ExpenseModal from './ExpenseModal';
import { useAppContext } from '../context/appContext';
import { DatePicker, Space, Select } from 'antd';

const { RangePicker } = DatePicker;

const buttonStyle = {
  // justifyContent: 'flex-end',
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
    setSelectedDates,
    tempSelectedDates,
    setTempSelectedDates,
    showModal,
    toggleModal,
    validCategories,
    setSelectedCategoryFilter,
    tempSelectedCategoryFilter,
    setTempSelectedCategoryFilter,
    validIncomeCategories,
    downloadExpenses
  } = useAppContext();

  const categories = validCategories.concat(validIncomeCategories);
  
  categories.map((category) => {
    options.push({
      label: category,
      value: category,
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

  const handleDownloadClick = () => {
    let baseUrl;
    const { hostname } = window.location;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        baseUrl = "http://localhost:3001/api/v1";
    } else {
        baseUrl = "https://dipronil-expense-app.onrender.com/api/v1";
    }
    window.location.href = `${baseUrl}/expenses/download/report`;
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
        <div style={buttonGap}>
          <Button onClick={handleDownloadClick} variant="success">
            Download
          </Button>
        </div>

      </div>
      <div className="">
        <Button variant="primary" onClick={openModal}>
          Manage Expense
        </Button>
      </div>
      {/* Render the ExpenseModal component */}
      <ExpenseModal show={showModal}/>
    </div>
  );
};

export default AddExpenseButton;
