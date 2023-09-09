import React from 'react';
import Expense from './Expense'; // Import the Expense component


const expensesData = [
    {
      "title": "Lunch",
      "date": "2023-09-10",
      "amount": 50.00,
      "category": "Food",
      "paymentMethod": "UPI",
      "description": "Lunch with friends",
    },
    {
      "title": "Gasoline",
      "date": "2023-09-11",
      "amount": 30.50,
      "category": "Transportation",
      "paymentMethod": "Credit Card",
      "description": "Filling up the car",
    },
    {
      "title": "Movie Tickets",
      "date": "2023-09-12",
      "amount": 25.00,
      "category": "Entertainment",
      "paymentMethod": "Cash",
      "description": "Watched a new release",
    },
    {
      "title": "Groceries",
      "date": "2023-09-13",
      "amount": 80.00,
      "category": "Shopping",
      "paymentMethod": "Debit Card",
      "description": "Weekly grocery shopping",
    },
  ];

const ExpenseList = () => {
  return (
    <div>
      {expensesData &&
        expensesData.map((expenseData, index) => (
          <Expense key={index} expenseData={expenseData} />
        ))}
    </div>
  );
};

export default ExpenseList;
