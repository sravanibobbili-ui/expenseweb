import React, { useState, useEffect } from "react";
import { Form, Button, Table } from "react-bootstrap";
import axios from "axios";
import "./Dataview.css";
import { useNavigate } from "react-router-dom";
import Addexp from "./Addexp";
import Header from "./Header";

const Dataview = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expensesPerPage] = useState(7); // Number of expenses per page
  const history = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (!userData || !userData.user_id) {
      // Redirect to login page or handle the absence of user ID
      return;
    }
    const fetchData = async () => {
      try {
        const [expenseResponse, categoryResponse] = await Promise.all([
          axios.get(`http://3.144.85.162:8081/expense/exp/${userData.user_id}`),
          axios.get("http://3.144.85.162:8081/exp"), // Assuming this endpoint provides the category mapping data
        ]);
        setExpenses(expenseResponse.data);
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userData]);

  const handleAddExpense = () => {
    history("/Addexp");
  };

  const handleBack = () => {
    history(`/Dashboard`);
  };

  // Get current expenses
  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = expenses.slice(
    indexOfFirstExpense,
    indexOfLastExpense
  );

  // Function to get the category name by exp_cat_id
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.exp_cat_id === categoryId);
    return category ? category.enttype : "Unknown";
  };

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to the top when changing page
  };

  return (
    <div>
      <div className="container">
        <div className="table-container">
          <h1>Expense List</h1>
          <Table className="expense-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {currentExpenses.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.date}</td>
                  <td>{expense.amount}</td>
                  <td>{getCategoryName(expense.exp_cat_id)}</td>
                </tr>
              ))}
              <Button className="button" onClick={handleBack}>
                Back
              </Button>
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="pagination-container">
          {Array.from({
            length: Math.ceil(expenses.length / expensesPerPage),
          }).map((_, index) => (
            <span key={index}>
              {index !== 0 && " -- "}
              <a href="#!" onClick={() => paginate(index + 1)}>
                {index + 1}
              </a>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dataview;
