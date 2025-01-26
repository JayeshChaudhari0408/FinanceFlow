// component import
import ExpenseItem from "./ExpenseItem";

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
