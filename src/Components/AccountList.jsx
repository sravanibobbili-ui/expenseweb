import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AccountList.css";

function AccountList() {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [error, setError] = useState(null); // Add state for error handling
  const history = useNavigate();

  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        // Fetch user data from session storage
        const userData = JSON.parse(sessionStorage.getItem("user"));
        if (!userData || !userData.user_id) {
          throw new Error("User data not found in session storage");
        }

        // Fetch bank accounts for the user
        const response = await axios.get(
          `http://3.144.85.162:8081/get/account/${userData.user_id}`
        );
        setBankAccounts(response.data);
      } catch (error) {
        console.error("Error fetching bank accounts:", error);
        setError(error.message); // Set error state
      }
    };

    fetchBankAccounts();
  }, []);

  const handleBackToDashboard = () => {
    history("/Dashboard");
  };

  return (
    <div className="bank-account-list">
      <h2>Bank Accounts</h2>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Display error message if error exists */}
      <table>
        <thead>
          <tr>
            <th>Account Number</th>
            <th>Bank Name</th>
            <th>Payment Mode</th>
            <th>Branch</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {bankAccounts.map((account, index) => (
            <tr key={index}>
              <td>{account.acct_num}</td>
              <td>{account.acc_bank_name}</td>
              <td>{account.payment_mode}</td>
              <td>{account.branch}</td>
              <td>{account.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleBackToDashboard}>Back to Dashboard</button>
    </div>
  );
}

export default AccountList;
