// component import
import ExpenseBudget from "./ExpenseBudget";

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

const Table1 = ({ expenses, showBudget = true }) => {
  
  const groupedExpenses = expenses.reduce((acc, expense) => {
    const category = getCategory(expense.name);
    if (!acc[category]) {
      acc[category] = {
        category,
        amount: 0,
        expenses: [],
      };
    }
    acc[category].amount += expense.amount; 
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
