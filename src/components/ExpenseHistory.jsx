import React, { useState } from "react";
import {  FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

const ExpenseHistory = ({ expenses, setExpenses }) => {
  const [sortBy, setSortBy] = useState("date");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleSortChange = (e) => setSortBy(e.target.value);
  const handleMonthChange = (e) => setSelectedMonth(e.target.value);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const getFilteredExpenses = () => {
    let filtered = [...expenses];

    if (selectedMonth !== "all") {
      filtered = filtered.filter((exp) => {
        const expMonth = new Date(exp.date).toISOString().slice(0, 7);
        return expMonth === selectedMonth;
      });
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (exp) =>
          exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exp.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortBy) {
      case "amount":
        filtered.sort((a, b) => b.amount - a.amount);
        break;
      case "date":
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "category":
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        break;
    }

    return filtered;
  };

  const startEdit = (expense) => {
    setEditId(expense.id);
    setEditForm({ ...expense });
  };

  const handleEditChange = (e) => {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveEdit = () => {
    setExpenses((prev) =>
      prev.map((exp) =>
        exp.id === editId
          ? { ...exp, ...editForm, amount: +editForm.amount }
          : exp
      )
    );
    setEditId(null);
  };

  const deleteExpense = (id) => {
    const confirmDelete = window.confirm("Delete this expense?");
    if (confirmDelete) {
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    }
  };

  const months = [
    "all",
    ...Array.from(new Set(expenses.map((e) => e.date.slice(0, 7)))),
  ];

  return (
    <div className="mx-4 md:mx-10 mt-10 p-6 bg-white rounded-lg shadow font-poppins">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Expense History</h2>

     
      <div className="flex  w-full gap-4 mb-6">
        <div className="w-[80%]">
          <div className="border flex items-center gap-2 px-4  rounded-md">
            <CiSearch/>
          <input
            type="text"
            placeholder="Search by title or category"
            value={searchQuery}
            onChange={handleSearchChange}
            className=" w-full py-2  rounded-md outline-none "
          />
          </div>  
        </div>
        <div className="flex gap-2">
          <select
            onChange={handleMonthChange}
            value={selectedMonth}
            className="px-4 py-2 border rounded-md outline-none "
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {m === "all" ? "All" : m}
              </option>
            ))}
          </select>
          <select
            onChange={handleSortChange}
            value={sortBy}
            className="px-4 py-2 border rounded-md outline-none "
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>
      </div>
      <div className="w-full">
        {getFilteredExpenses().map((exp) =>
          editId === exp.id ? (
            <div
              key={exp.id}
              className="border p-4 rounded-lg bg-gray-50 shadow-sm"
            >
              <input
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                className="w-full mb-2 px-2 py-1 border rounded"
              />
              <input
                name="amount"
                type="number"
                value={editForm.amount}
                onChange={handleEditChange}
                className="w-full mb-2 px-2 py-1 border rounded"
              />
              <input
                name="category"
                value={editForm.category}
                onChange={handleEditChange}
                className="w-full mb-2 px-2 py-1 border rounded"
              />
              <input
                name="date"
                type="date"
                value={editForm.date}
                onChange={handleEditChange}
                className="w-full mb-4 px-2 py-1 border rounded"
              />
              <div className="flex justify-between">
                <button
                  onClick={saveEdit}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditId(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div
              key={exp.id}
              className="border p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition mt-4"
            >
              <div className="flex  justify-between items-start w-full mt-4">
                {/* Left Section */}
                <div className="flex flex-col gap-1">
                  <div className="text-lg font-semibold">{exp.title}</div>
                  <div className="text-sm text-blue-600">{exp.category}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(exp.date).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="text-gray-800 font-semibold">
                    ₹{exp.amount}
                  </div>
                  <div className="flex gap-3 text-lg text-blue-600">
                    <MdEdit
                      className="cursor-pointer w-5 h-5 hover:text-blue-800"
                      onClick={() => startEdit(exp)}
                    />
                    <FaTrash
                      className="cursor-pointer text-red-600"
                      onClick={() => deleteExpense(exp.id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ExpenseHistory;
