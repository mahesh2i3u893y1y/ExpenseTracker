import React, { useState } from "react";

const AddExpense = ({ expenses, setExpenses }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const categories = ["Food", "Travel", "Health", "Entertainment", "Other"];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, amount, category, date } = formData;

    if (!title || !amount || !category || !date) {
      alert("Please fill all the fields");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      category,
      date,
    };

    setExpenses([...expenses, newExpense]);

    setFormData({
      title: "",
      amount: "",
      category: "",
      date: "",
    });
  };

  return (
    <div className="mx-10 mt-10 p-6 bg-white shadow-lg rounded-xl font-poppins">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter expense title"
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none "
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Amount (₹)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none "
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none "
          >
            <option value="">Select category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none "
          />
        </div>

        <button
          type="submit"
          className="w-2/12 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Add Expense
        </button>
      </form>

     
    </div>
  );
};

export default AddExpense;
