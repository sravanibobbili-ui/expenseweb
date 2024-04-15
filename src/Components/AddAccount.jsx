import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddAccount.css";
function AddAccount() {
  const [formData, setFormData] = useState({
    acc_bank_name: "",
    payment_mode: "",
    branch: "",
    balance: 0,
    user_id: "", // Initialize user_id as an empty string
    acct_num: 0,
  });

  const history = useNavigate();

  useEffect(() => {
    // Retrieve user_id from sessionStorage and update formData
    const storedUserData = sessionStorage.getItem("user");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setFormData({
        ...formData,
        user_id: userData.user_id,
      });
    }
  }, []);

  console.log("Current formData.user_id:", formData.user_id); // Log user_id to ensure it's set correctly

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/get/addaccount",
        formData
      );

      setFormData({
        acc_bank_name: "",
        payment_mode: "",
        branch: "",
        balance: 0,
        user_id: sessionStorage.getItem("user"),
        acct_num: 0,
      });
      // Redirect to dashboard after successful submission
      history("/Dashboard");
    } catch (error) {
      console.error("Error creating account:", error);
      // Handle errors here
    }
  };
  const handleBackToDashboard = () => {
    history(`/Dashboard`);
  };
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label>
        Bank Name:
        <input
          type="text"
          name="acc_bank_name"
          value={formData.acc_bank_name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Payment Mode:
        <input
          type="text"
          name="payment_mode"
          value={formData.payment_mode}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Branch:
        <input
          type="text"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Balance:
        <input
          type="number"
          name="balance"
          value={formData.balance}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Account Number:
        <input
          type="number"
          name="acct_num"
          value={formData.acct_num}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit">Create Account</button>
      <button type="Submit" onClick={handleBackToDashboard}>
        Back
      </button>
    </form>
  );
}

export default AddAccount;
