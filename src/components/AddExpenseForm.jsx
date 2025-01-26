// react imports
import { useEffect, useRef, useState } from "react"

// rrd imports
import { useFetcher } from "react-router-dom"

// library imports
import { PlusCircleIcon } from "@heroicons/react/24/solid"

const getCategory = (name) => {
  const categories = {
    Food: ["coffee", "tea", "burger", "pizza", "food", "restaurant", "snack", "sandwich", "cake", "dinner", "lunch", "breakfast", "fast food", "dessert"],
    Entertainment: ["movie", "concert", "game", "show", "theater", "music", "party", "club", "sports", "event", "streaming"],
    Transport: ["taxi", "bus", "train", "fuel", "car", "bike", "gas", "ride", "subway", "transportation", "parking", "uber", "lyft"],
    Utilities: ["electricity", "water", "internet", "phone", "cable", "gas bill", "utilities", "electric", "wifi"],
    Shopping: ["clothing", "electronics", "grocery", "store", "shopping", "purchase", "buy", "apparel", "fashion", "accessories"],
    Health: ["medicine", "doctor", "hospital", "pharmacy", "health", "appointment", "clinic", "fitness", "gym", "wellness"],
    Travel: ["flight", "hotel", "trip", "vacation", "airline", "resort", "tour", "cruise", "travel", "luggage", "passport"],
    Bills: ["subscription", "insurance", "rent", "mortgage", "membership", "payment", "fee", "bill", "credit card", "loan", "tax"],
    Gifts: ["gift", "present", "donation", "charity", "birthday", "holiday", "wedding", "celebration"],
    Miscellaneous: [] 
  };

  const lowerCaseName = name.toLowerCase();

  for (let category in categories) {
    if (categories[category].some(keyword => lowerCaseName.includes(keyword))) {
      return category;
    }
  }
  return "Miscellaneous";
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