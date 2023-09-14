import React from 'react';
import moment from 'moment';
import '../assets/css/Expense.css';
import { Button, message, Popconfirm } from 'antd';

const Expense = ({ expenseData }) => {
  const confirm = (e) => {
    console.log(e);
    message.success('Click on Yes');
  };
  const cancel = (e) => {
    console.log(e);
    message.error('Your Data is saved.');
  };
  return (
    <div className="parent-container">
      <div className="expense-card">
        <div className="expense-header">
          <h3>{expenseData.title}</h3>
          <div className="expense-buttons">
            <button className="edit-button">Edit</button>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button className="delete-button">Delete</Button>
            </Popconfirm>
            {/* <button className="delete-button">Delete</button> */}
          </div>
        </div>
        <p className="expense-details">
          <span className="expense-date">Date: {moment(expenseData.date).format('DD-MM-YYYY')}</span>
          <span className="expense-amount">Amount: ₹{expenseData.amount}</span>
        </p>
        <p className="expense-details">
          <span className="expense-category">Category: {expenseData.category}</span>
          <span className="expense-paymentMethod">Payment Method: {expenseData.paymentMethod}</span>
          <span className="expense-paymentBank">Payment Method: {expenseData.paymentBank}</span>
        </p>
        <p className="expense-description">Description: {expenseData.description}</p>
      </div>
    </div>
  );
};

export default Expense;
