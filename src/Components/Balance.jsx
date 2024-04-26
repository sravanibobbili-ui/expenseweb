import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useParams } from "react-router-dom";
import "./Balance.css";
const Balance = ({ user }) => {
  const [expenses, setExpenses] = useState({});
  const [accountDetails, setAccountDetails] = useState({});

  useEffect(() => {
    // Fetch expenses by user ID and date
    const fetchExpenses = async () => {
      try {
        // const date = "jan2"; // Replace with the actual date
        const response = await axios.get(
          `http://3.139.63.207:8080/expense/totalexp/${user}`
        );
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    // Fetch account details by user ID
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get(
          `http://3.139.63.207:8080/expense/account/${user}`
        );

        setAccountDetails(response.data);
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };

    fetchExpenses();
    fetchAccountDetails();
  }, [user]);

  return (
    <div className="main-conte">
      <div className="divname">
        Account Balance: <h2>{accountDetails.totalBalance}</h2>
      </div>
      <div className="divname">
        Total Expense: <h2>{expenses.total_expenses}</h2>
      </div>

      <div className="divname">
        Remaining Balance: <h2> {accountDetails.remainingBalance}</h2>
      </div>
    </div>
  );
};

export default Balance;
