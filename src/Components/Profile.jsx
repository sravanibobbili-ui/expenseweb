import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";

import "./Profile.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    password: "",
    username: "",
    last_name: "",
    first_name: "",
    email: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [editable, setEditable] = useState(false); // State to manage edit mode
  const [message, setMessage] = useState(""); // State to manage success message
  const history = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    if (!userData || !userData.user_id) {
      // Redirect to login page or handle the absence of user ID
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://18.219.90.191:8081/api/userid/${userData.user_id}`
        );
        setFormData(response.data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleEditMode = () => {
    setEditable(!editable);
    setMessage("");
  };
  const handleEditField = (fieldName) => {
    // You can add logic here to handle the editing of different fields
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send updated profile data to the backend
    try {
      const response = await axios.put(
        `http://localhost:8080/api/userid/${formData.user_id}`,
        formData
      );

      setFormData(response.data);
      setMessage("Profile updated successfully");
    } catch (error) {
      setMessage("Error updating profile"); // Set error message
    } finally {
      setTimeout(() => {
        setMessage(""); // Reset message after a delay
        // Redirect to dashboard after updating profile
        history(`/Dashboard`); // Redirect to dashboard after updating profile
      }, 10000); // Delay for 2 seconds
    }
  };

  return (
    <body className="bodyProfile">
      <div>
        <form className="formgroup" onSubmit={handleSubmit}>
          <h2>User Profile</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            readOnly={!editable} // Toggle read-only based on editable state
          />
          {editable && (
            <FontAwesomeIcon
              icon={faEdit} // Assuming you have an appropriate pencil icon
              // style={{ cursor: "pointer" }}
              readOnly={!editable}
              className="edit-icon"
            />
          )}

          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            readOnly={!editable} // Toggle read-only based on editable state
          />

          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            readOnly={!editable} // Toggle read-only based on editable state
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            readOnly={!editable} // Toggle read-only based on editable state
          />

          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              readOnly={!editable} // Toggle read-only based on editable state
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
              className="eye-icon"
            />
          </div>
          {message && <p>{message}</p>}
          <button type="button" onClick={toggleEditMode}>
            {editable ? "Cancel" : "Edit Profile"}
          </button>
          {editable && <button type="submit">Update Profile</button>}
          <button onClick={() => (window.location.href = "/Dashboard")}>
            Back
          </button>
        </form>
      </div>
    </body>
  );
};

export default Profile;
