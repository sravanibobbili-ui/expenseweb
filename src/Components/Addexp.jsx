import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Addexp.css";
import { format } from "date-fns";

const Addexp = () => {
  const [formData, setFormData] = useState({
    date: new Date(), // Set initial date to today's date
    amount: "",
    user_id: "",
    exp_cat_id: "",
    enttype: "", // Added enttype field to hold the selected expense type
  });
  const history = useNavigate();
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setFormData((prevFormData) => ({
        ...prevFormData,
        user_id: userData.user_id,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date }); // Update date in formData
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // window.location.reload();
      // Fetch exp_cat_id from expensecategory database based on the selected option
      const { data } = await axios.get(
        `http://3.139.63.207:8080/exp/expcat/${formData.enttype}`
      );

      // Check if data exists and has items
      if (data && data.length > 0) {
        const exp_cat_id = data[0].exp_cat_id; // Access exp_cat_id property instead of id

        const formattedDate = format(formData.date, "yyyy-MM-dd");
        const updatedFormData = {
          ...formData,
          date: formattedDate, // Format date for database
          // user: {
          //   user_id: user,
          // },
          exp_cat_id: exp_cat_id.toString(), // Include exp_cat_id in formData
        };
        // console.log(user_id);
        const response = await fetch(
          "http://3.139.63.207:8080/expense/expenses",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFormData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to submit form");
        }

        console.log("Form submitted successfully");

        history(`/Dashboard`);
      } else {
        throw new Error("Expense category not found"); // Throw an error if data is empty
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleBackToDashboard = () => {
    history(`/Dashboard`);
  };

  return (
    <body className="bodylogin">
      <Form onSubmit={handleSubmit} className="formmain">
        <Form.Group controlId="enttype">
          <Form.Label>Add Expense</Form.Label>
          <br />
          <br />
          <Form.Control
            as="select"
            value={formData.enttype}
            onChange={handleChange}
          >
            <option value="">Select the Expense Type</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Movie">Movie</option>
            <option value="Games">Games</option>
            <option value="Rent">Rent</option>
            <option value="Cab">Cab</option>
            <option value="Insurance">Insurance</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="amount">
          <Form.Control
            type="text"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={handleChange}
            className="enteramo"
          />
        </Form.Group>
        <Form.Group controlId="date">
          <br />
          <br />
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            className="datep"
          />
        </Form.Group>
        <button className="Submit" variant="primary" type="submit">
          Submit
        </button>

        <button className="Submit" onClick={handleBackToDashboard}>
          Back
        </button>
      </Form>
    </body>
  );
};

export default Addexp;
