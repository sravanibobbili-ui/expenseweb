import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./Create.css";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
  });
  const history = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Changed e.target.id to e.target.name
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://3.139.63.207:8080/api/userdetails", {
        method: "POST", // Changed to uppercase
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const userData = await response.json();
      const { user_id, username } = userData; // Extract user_id and username from response

      // Store user_id and username in session storage
      sessionStorage.setItem("user", JSON.stringify({ user_id, username }));

      // Redirect to dashboard or any other appropriate route
      history("/Dashboard");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <body className="bodyclass">
        <div>
          <Form onSubmit={handleSubmit} className="formmain1">
            <h1>Expense Tracker</h1>
            <br />
            <input
              type="text"
              name="username" // Changed to name
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password" // Changed to name
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email" // Changed to name
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="firstname" // Changed to name
              placeholder="Enter firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastname" // Changed to name
              placeholder="Enter lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
            <a href="Login" className="LoginLink">
              Already have an account? Sign in
            </a>
            {/* <a href="Account" className="AccountLink">
              Account details
            </a> */}
          </Form>
        </div>
      </body>
    </>
  );
};

export default Create;
