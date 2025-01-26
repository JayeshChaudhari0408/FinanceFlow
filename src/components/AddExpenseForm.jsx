// react imports
import { useEffect, useRef, useState } from "react"

// rrd imports
import { useFetcher } from "react-router-dom"

// library imports
import { PlusCircleIcon } from "@heroicons/react/24/solid"

const getCategory = (name) => {
  // Define categories based on keywords in the name
  const foodKeywords = ["coffee", "tea", "burger", "pizza", "food"];
  const entertainmentKeywords = ["movie", "concert", "game", "show"];
  const transportKeywords = ["taxi", "bus", "train", "fuel"];
  const utilitiesKeywords = ["electricity", "water", "internet", "phone"];

  // Check the name for keywords and return the category
  if (foodKeywords.some(keyword => name.toLowerCase().includes(keyword))) {
    return "Food";
  }
  if (entertainmentKeywords.some(keyword => name.toLowerCase().includes(keyword))) {
    return "Entertainment";
  }
  if (transportKeywords.some(keyword => name.toLowerCase().includes(keyword))) {
    return "Transport";
  }
  if (utilitiesKeywords.some(keyword => name.toLowerCase().includes(keyword))) {
    return "Utilities";
  }
  return "Miscellaneous"; // Default category
};

const AddExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef()
  const focusRef = useRef()

  const [category, setCategory] = useState("")
  
  const handleExpenseNameChange = (event) => {
    const expenseName = event.target.value
    console.log(expenseName);
    setCategory(getCategory(expenseName));
  }

  useEffect(() => {
  
  }, [category]);

  useEffect(() => {
    if (!isSubmitting) {
      // clear form
      formRef.current.reset()
      // reset focus
      focusRef.current.focus()
    }

  }, [isSubmitting])

  return (
    <div className="form-wrapper">
      <h2 className="h3">Add New{" "}<span className="accent">
        {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
      </span>{" "}
        Expense
      </h2>
      <fetcher.Form
        method="post"
        className="grid-sm"
        ref={formRef}
      >
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g. Coffee"
              ref={focusRef}
              required
              onChange={handleExpenseNameChange}
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input
              type="number"
              step="1"
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="e.g. ₹35"
              required
              min={0}
            />
          </div>
        </div>
        <div className="grid-xs" hidden={budgets.length === 1}>
          <label htmlFor="newExpenseBudget">Budget Category</label>
          <select name="newExpenseBudget" id="newExpenseBudget" required>
            {
              budgets
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((budget) => {
                  return (
                    <option key={budget.id} value={budget.id}>
                      {budget.name}
                    </option>
                  )
                })
            }
          </select>
        </div>
        <input type="hidden" id="newExpenseCategory" name="newExpenseCategory" value={category} />
        <input type="hidden" name="_action" value="createExpense" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {
            isSubmitting ? <span>Submitting…</span> : (
              <>
                <span>Add Expense</span>
                <PlusCircleIcon width={20} />
              </>
            )
          }
        </button>
      </fetcher.Form>
    </div>
  )
}
export default AddExpenseForm