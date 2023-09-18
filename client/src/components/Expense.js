import React from 'react';
import moment from 'moment';
import '../assets/css/Expense.css';
import { Button, message, Popconfirm } from 'antd';
import { useAppContext } from '../context/appContext';

const Expense = ({ expenseData }) => {
  const {deleteExpenses, setEditExpenses} = useAppContext();
  const confirm = (e) => {
    deleteExpenses(expenseData._id);
    message.success('Expenses delete successfully.');
  };
  const cancel = (e) => {
    message.info('Your Data is safed.');
  };
  return (
    <div className="parent-container">
      <div className="expense-card">
        <div className="expense-header">
          <h3>{expenseData.title}</h3>
          <div className="expense-buttons">
            <button className="edit-button" onClick={() => setEditExpenses(expenseData._id)}>Edit</button>
            <Popconfirm
              title="Delete the Expenses"
              description="Are you sure to delete this Expenses?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button className="delete-button" >Delete</Button>
            </Popconfirm>
          </div>
        </div>
        <p className="expense-details">
          <span className="expense-date">Date: {moment(expenseData.date).format('DD-MM-YYYY')}</span>
          <span className="expense-amount">Amount: ₹{expenseData.amount}</span>
        </p>
        <p className="expense-details">
          <span className="expense-category">Category: {expenseData.category}</span>
          <span className="expense-paymentMethod">Payment Method: {expenseData.paymentMethod}</span>
          <span className="expense-paymentBank">Payment Bank: {expenseData.paymentBank}</span>
        </p>
        <p className="expense-description">Description: {expenseData.description}</p>
      </div>
    </div>
  );
};

export default Expense;
