import React from 'react';
import '../assets/css/Expense.css';

const Expense = ({ expenseData }) => {
  return (
    <div className="parent-container">
      <div className="expense-card">
        <div className="expense-header">
          <h3>{expenseData.title}</h3>
          <div className="expense-buttons">
            <button className="edit-button">Edit</button>
            <button className="delete-button">Delete</button>
          </div>
        </div>
        <p className="expense-details">
          <span className="expense-date">Date: {expenseData.date}</span>
          <span className="expense-amount">Amount: ${expenseData.amount}</span>
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
