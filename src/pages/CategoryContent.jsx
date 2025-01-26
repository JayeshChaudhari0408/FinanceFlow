import React from 'react'

import { useParams, useNavigate } from 'react-router-dom';
import { getAllMatchingItems } from '../localStorage'; 
export async function categoryLoader() {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];
}

  
const CategoryContent = () => {
  const { category} = useParams();  // Get the category from the URL

  const expenses = getAllMatchingItems({ category: 'expenses' });
  const budId = localStorage.getItem("budId");
  console.log("expenses",expenses);
  console.log("Budget ID:", budId );

  const navigate = useNavigate(); // Use the useNavigate hook

  const handleClick = () => {
    navigate(`/budget/${budId}`); // Redirect to the homepage or any route you want
  };

  // Filter expenses based on the category
  const filteredExpenses = expenses.filter((expense) => {
    return expense.category && category && expense.category.toLowerCase() === category.toLowerCase();
  });
  console.log("filtered",filteredExpenses);

  const newFilter = filteredExpenses.filter((expense) => {
    return expense.budgetId === budId;
  });
  console.log("newFilter",newFilter);

  return (
    <div style={{width:"-webkit-fill-available"}} className='table'>
    <button
          className="btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '6px', // Space between NavLink and Back button
            border: 'none',
            marginLeft: '6.5px',
            background: 'white',
            cursor: 'pointer',
            paddingLeft: '10px', // Aligning the Back button to the left, similar to the Home button
          }}
          onClick={handleClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ width: '24px', height: '24px', marginRight: '8px' }}>
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
          </svg>
        </button>
      <h2>Transactions for <span className="accent">{category}</span></h2>
      <table style={{marginTop:"2rem"}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {newFilter.length > 0 ? (
            newFilter.map((expense) => (
              <tr key={expense.id}>
                <td style={{textTransform:"capitalize", fontSize:"1.5rem"}}>{expense.name}</td>
                <td style={{fontSize:"1.5rem"}}>{expense.amount}</td>
                <td style={{fontSize:"1.5rem"}}>{new Date(expense.createdAt).toLocaleDateString()} </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No transactions found for this category.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryContent; 