import { useFetcher, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const EditBudgetForm = ({ budget, onClose }) => {
  const fetcher = useFetcher();
  const formRef = useRef();
  const focusRef = useRef();
  const navigate = useNavigate();

  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (!isSubmitting && fetcher.data?.ok) {
      formRef.current?.reset();
      onClose();
      toast.success("Budget updated successfully!");
      navigate("/");
      
    }
  }, [isSubmitting, fetcher.data, onClose, navigate])

  return (
    <div className="form-wrapper">
      <h2 className="h3">Edit Budget</h2>
      <fetcher.Form 
        method="post" 
        className="grid-sm" 
        ref={formRef}
      >
        <div className="grid-xs">
          <label htmlFor="newBudgetName">Budget Name</label>
          <input
            type="text"
            name="newBudgetName"
            id="newBudgetName"
            placeholder="e.g. January"
            required
            ref={focusRef}
            defaultValue={budget.name}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g. ₹350"
            required
            inputMode="decimal"
            defaultValue={budget.amount}
          />
        </div>
        <input type="hidden" name="_action" value="editBudget" />
        <input type="hidden" name="budgetId" value={budget.id} />
        <div className="grid-xs" style={{ display: "flex", gap: "1rem" }}>
          <button type="submit" className="btn btn--dark">
            {isSubmitting ? "Saving..." : "Save Budget"}
          </button>
          <button type="button" className="btn btn--warning" onClick={onClose}>
            Cancel
          </button>
        </div>
        
      </fetcher.Form>
    </div>
  );
};

export default EditBudgetForm;