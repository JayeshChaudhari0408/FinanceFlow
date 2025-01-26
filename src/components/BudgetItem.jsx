// rrd imports
import { Form, Link } from "react-router-dom";

// library imports
import { BanknotesIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../localStorage";

const BudgetItem = ({ budget, showDelete = false }) => {
  const { id, name, amount, color } = budget;
  const spent = calculateSpentByBudget(id);

  return (
    <div
      className="budget"
      style={{
        "--accent": color,
      }}
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </div>
      <div className="flex-sm" style={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link to={`/budget/${id}`} className="btn">
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </Link>

        </div>
        {showDelete && (
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (!confirm("Are you sure you want to permanently delete this budget?")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn btn--warning">
              <TrashIcon width={20} />
            </button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default BudgetItem;