import React from 'react';
import Expense from './Expense'; // Import the Expense component
import { useAppContext } from '../context/appContext';

const noDataMessageStyle = {
  color: '#888',
  fontSize: '18px',
  textAlign: 'center',
  marginTop: '20px',
};

const ExpenseList = () => {
  const { expensesData } = useAppContext();
  
  return (
    <div>
      {expensesData?.length === 0 ? (
        <p style={noDataMessageStyle}>No data found.</p>
      ) : (
        expensesData?.map((expenseData, index) => (
          <Expense key={index} expenseData={expenseData} />
        ))
      )}
    </div>
  );
};

export default ExpenseList;
