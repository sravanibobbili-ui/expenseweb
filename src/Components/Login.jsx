import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear any previous errors when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://18.219.90.191:8081/api/user/${formData.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to authenticate");
      }

      const userData = await response.json();

      // Check if userData is an array and has at least one element
      if (Array.isArray(userData) && userData.length > 0) {
        const { user_id, username } = userData[0];
        sessionStorage.setItem("user", JSON.stringify({ user_id, username }));
        navigate(`/Dashboard`);
      } else {
        throw new Error("User data not found");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message); // Set error message to display to the user
    }
  };

  return (
    <body className="bodylogin">
      <div>
        <br />
        <form onSubmit={handleSubmit} className="formmain">
          <h2>Login</h2>
          <br />
          <input
            type="text"
            name="email"
            className="Username"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
          <br />
          <br />
          <input
            type="password"
            name="password"
            className="Password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <br />
          {error && <p className="error-message">{error}</p>}
          <a href="" className="ForgotPass">
            Forgot Password?
          </a>
          <br />
          <button className="Submit" type="submit">
            Submit
          </button>
          <a href="Create">Create Account</a>
        </form>
      </div>
    </body>
  );
};

export default Login;
