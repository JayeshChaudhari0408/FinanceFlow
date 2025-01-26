// component import
import ExpenseItem from "./ExpenseItem";

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

const Table = ({ expenses, showBudget = true }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {["Name", "Amount", "Date","Category", showBudget ? "Budget" : "", ""].map(
              (i, index) => (
                <th key={index} style={{ padding: "var(--space-sm)" }}>{i}</th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => ( 
            <tr key={expense.id}>
              <ExpenseItem expense={expense} category={getCategory(expense.name)} showBudget={showBudget}  />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
