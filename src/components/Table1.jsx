// component import
import ExpenseBudget from "./ExpenseBudget";

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

const Table1 = ({ expenses, showBudget = true }) => {
  // Group expenses by category and sum amounts
  const groupedExpenses = expenses.reduce((acc, expense) => {
    const category = getCategory(expense.name);
    if (!acc[category]) {
      acc[category] = {
        category,
        amount: 0,
        expenses: [],
      };
    }
    acc[category].amount += expense.amount; // Summing the amounts for each category
    acc[category].expenses.push(expense);
    return acc;
  }, {});

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {["Category", "Amount", "Details"].map((i, index) => (
              <th key={index} style={{ padding: "var(--space-sm)" }} >{i}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.values(groupedExpenses).map((group, index) => (
            <tr key={index} >
              <ExpenseBudget expense={group.expenses[0]} category={group.category} amount={group.amount} expenses={group.expenses} showBudget={showBudget} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table1;
