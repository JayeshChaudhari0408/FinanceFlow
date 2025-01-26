export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

// colors
const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// Get all items from local storage
export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  if (!key || !value) {
    return data;
    
  }
  return data.filter((item) => item[key] === value);
};

// delete item from local storage
export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

// create budget
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

// create expense
export const createExpense = ({ name, amount, budgetId, category }) => {
  
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: budgetId,
  })[0];

  // Calculate current spent amount
  const spent = calculateSpentByBudget(budgetId);
  
  // Check if adding this expense would exceed the budget
  if (spent + Number(amount) > budget.amount) {
    throw new Error(`Adding this expense would exceed your budget limit of ${formatCurrency(budget.amount)}`);
  }

  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
    category: category,
  };
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

// total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    // check if expense.id === budgetId I passed in
    if (expense.budgetId !== budgetId) return acc;

    // add the current amount to my total
    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};

// FORMATTING
export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString();

// Formating percentages
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

// Format currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "INR",
  });
};

// edit budget
export const editBudget = ({ id, name, amount }) => {
  const existingBudgets = fetchData("budgets");
  const budget = existingBudgets.find(budget => budget.id === id);
  
  // Calculate current spent amount
  const spent = calculateSpentByBudget(id);
  
  // Check if new budget amount would be less than what's already spent
  if (Number(amount) < spent) {
    throw new Error(`New budget amount cannot be less than what's already spent (${formatCurrency(spent)})`);
  }

  const updatedBudgets = existingBudgets.map(budget => {
    if (budget.id === id) {
      return {
        ...budget,
        name,
        amount: +amount,
      };
    }
    return budget;
  });

  localStorage.setItem("budgets", JSON.stringify(updatedBudgets));
};

