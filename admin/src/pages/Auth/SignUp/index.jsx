import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerAdmin } from "../../../api/auth";

const SignUp = () => {
  const [register, setRegister] = useState({
    name: "",
    username: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate on change
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "name" && value.trim().length === 0) {
      error = "Name is required.";
    }

    if (name === "username" && value.trim().length === 0) {
      error = "Username is required.";
    }

    if (name === "phone") {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(value)) {
        error = "Phone number must be 10 digits.";
      }
    }

    if (name === "address" && value.trim().length === 0) {
      error = "Address is required.";
    }

    if (name === "password" && value.length < 6) {
      error = "Password must be at least 6 characters long.";
    }

    if (name === "confirmPassword" && value !== register.password) {
      error = "Passwords do not match.";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    return error === ""; // Return true if no error
  };

  const validateForm = () => {
    const isValidName = validateField("name", register.name);
    const isValidUsername = validateField("username", register.username);
    const isValidPhone = validateField("phone", register.phone);
    const isValidAddress = validateField("address", register.address);
    const isValidPassword = validateField("password", register.password);
    const isValidConfirmPassword = validateField(
      "confirmPassword",
      register.confirmPassword
    );

    return (
      isValidName &&
      isValidUsername &&
      isValidPhone &&
      isValidAddress &&
      isValidPassword &&
      isValidConfirmPassword
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setErrorMessage("Please fix the errors in the form.");
      return;
    }

    const newUserData = {
      name: register?.name,
      username: register?.username,
      phone: register?.phone,
      address: register?.address,
      password: register?.password,
    };

    try {
      const { status } = await registerAdmin(newUserData);
      if (status) {
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
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              id="name"
              name="name"
              value={register.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              id="username"
              name="username"
              value={register.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              id="phone"
              name="phone"
              value={register.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="address">Address</label>
            <textarea
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              id="address"
              name="address"
              value={register.address}
              onChange={handleChange}
              placeholder="Enter your address"
            />
            {errors.address && (
              <div className="invalid-feedback">{errors.address}</div>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="password"
              name="password"
              value={register.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className={`form-control ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
              id="confirmPassword"
              name="confirmPassword"
              value={register.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          </div>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{
              backgroundColor: "#438a7a",
              border: "none",
              outline: "none",
            }}
          >
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
