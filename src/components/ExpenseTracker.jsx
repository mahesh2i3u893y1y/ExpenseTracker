import React, { useState } from "react";
import AddExpense from "./AddExpense";
import ExpenseHistory from "./ExpenseHistory";
import Expense from "./Expense";
import Navbar from "./Navbar";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Navbar />
      <Expense expenses={expenses} />
      <AddExpense expenses={expenses} setExpenses={setExpenses} />
      <ExpenseHistory expenses={expenses} setExpenses={setExpenses} />
    </div>
  );
};

export default ExpenseTracker;
