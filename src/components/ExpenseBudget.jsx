// rrd imports
import { Link, useNavigate } from "react-router-dom";

import "../index.css";

import {
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingItems,
} from "../localStorage";

const ExpenseBudget = ({ expense, showBudget, category, amount }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${category}`);
  };

  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];

  const budId = expense.budgetId;
  localStorage.setItem("budId", budId);
  const color = budget.color;

  return (
    <>
      <td>
        <Link
          to={`/category/${category}`}
          style={{ "--accent": budget.color }}
        >
          {category}
        </Link>
      </td>
      <td style={{ padding: "var(--space-sm)" }}>
        {formatCurrency(amount)}
      </td>
      {showBudget && (
        <td>
          <Link
            to={`/budget/${budget.id}`}
            style={{ "--accent": budget.color }}
          >
            {budget.name}
          </Link>
        </td>
      )}
      <td 
        onClick={handleClick} 
        style={{
          textDecoration: "underline",
          cursor: "pointer",
          color: `hsl(${color})`
        }}
      >
        View Details
      </td>
    </>
  );
};

export default ExpenseBudget;
