import React from "react";
import { FaDollarSign } from "react-icons/fa6";
import { FiPieChart } from "react-icons/fi";


const getTotalExpense = (expenses = []) => {
  return expenses.reduce((total, item) => total + item.amount, 0);
};

const getCategoryTotals = (expenses = []) => {
  return expenses.reduce((acc, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = 0;
    }
    acc[curr.category] += curr.amount;
    return acc;
  }, {});
};


const Expense = ({ expenses }) => {
  const total = getTotalExpense(expenses);
  const categoryTotals = getCategoryTotals(expenses);

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 px-10 font-poppins">

      <div className="flex flex-col justify-start w-full md:w-6/12 bg-white p-5 rounded-md">
        <div className="flex items-center gap-2 mb-2">
          <FaDollarSign className="w-5 h-5 text-green-500" />
          <p className="text-2xl font-bold">Monthly Summary</p>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <FaDollarSign className="text-green-500 font-bold h-6 w-6" />
          <p className="text-3xl font-semibold text-green-500">{total}</p>
        </div>
        <p className="text-gray-400 text-sm">Total for April 2025</p>
      </div>

   
      <div className="flex flex-col justify-start w-full md:w-6/12 bg-white p-5 rounded-md">
        <div className="flex items-center gap-2 mb-4">
          <FiPieChart className="w-5 h-5 text-blue-500" />
          <p className="text-2xl font-bold">Category Breakdown</p>
        </div>
        {Object.entries(categoryTotals).map(([category, amount]) => (
          <div key={category} className="flex justify-between items-center py-1">
            <p>{category}</p>
            <p className="text-right">${amount.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expense;
