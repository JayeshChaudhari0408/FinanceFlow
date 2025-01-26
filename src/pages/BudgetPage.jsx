// rrd imports
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";

// library
import { toast } from "react-toastify";
import { PencilIcon } from "@heroicons/react/24/outline";

// components
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table1 from "../components/Table1";
import EditBudgetForm from "../components/EditBudgetForm";
import EditButton from "../components/EditButton";

import { createExpense, deleteItem, getAllMatchingItems, editBudget } from "../localStorage";

// loader
export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget you're trying to find doesn't exist");
  }

  return { budget, expenses };
}

// action
export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        category: values.newExpenseCategory,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      return toast.error(e.message);
    }
  }

  if (_action === "editBudget") {
    try {
      editBudget({
        id: values.budgetId,
        name: values.newBudgetName,
        amount: values.newBudgetAmount,
      });
      return { ok: true };
    } catch (e) {
      return toast.error(e.message);
    }
  }

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleClick = () => {
    navigate('/'); // Redirect to the homepage or any route you want
  };

  return (
    <div
      className="grid-lg"
      style={{
        "--accent": budget.color,
      }}
    >
      {isEditing ? (
        <EditBudgetForm 
          budget={budget} 
          onClose={() => setIsEditing(false)} 
        />
      ) : (
        <>
        <button
          className="btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '0px', // Space between NavLink and Back button
            border: 'none',
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
          <h1 className="h2">
            <span className="accent">{budget.name}</span> Overview
            
          </h1>
          <div className="flex-lg">
            {/* <BudgetItem budget={budget} showDelete={true} /> */}
            <EditButton budget={budget} showDelete={true} />
            <AddExpenseForm budgets={[budget]} />
          </div>
        </>
      )}
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <Table1 expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;  