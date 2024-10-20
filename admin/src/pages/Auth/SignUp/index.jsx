import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [register, setRegister] = useState({
    name: "",
    username: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleChange = ({ target: { name, value } }) => {
    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, confirmPassword } = register;

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setErrorMessage(""); // Clear error message if passwords match

    const newUserData = {
      name: register?.name,
      username: register?.username,
      phone: register?.phone,
      address: register?.address,
      password: register?.password,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/admin/register`,
        newUserData
      );

      if (response?.data) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("Something went wrong, please try again later.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="shadow p-4" style={{ width: "500px" }}>
        <h3 className="text-center mb-2">Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={register.name}
              onChange={(e) => handleChange(e)}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="username"
              className="form-control"
              id="username"
              name="username"
              value={register.username}
              onChange={(e) => handleChange(e)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={register.phone}
              onChange={(e) => handleChange(e)}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="address">Address</label>
            <textarea
              className="form-control"
              id="address"
              name="address"
              value={register.address}
              onChange={(e) => handleChange(e)}
              placeholder="Enter your address"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={register.password}
              onChange={(e) => handleChange(e)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={register.confirmPassword}
              onChange={(e) => handleChange(e)}
              placeholder="Confirm your password"
              required
            />
          </div>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
        <div className="text-center mt-1">
          <p>
           Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
