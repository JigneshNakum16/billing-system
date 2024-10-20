import { useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { loginAdmin } from "../../../api/auth";

const Login = () => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate on change
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = "";

    if (name === "username") {
      if (!value || value.trim().length === 0) {
        errorMessage = "Username is required.";
      }
    }

    if (name === "password") {
      if (!value || value.length < 6) {
        errorMessage = "Password must be at least 6 characters long.";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));

    return errorMessage === ""; // Return true if no error
  };

  const validateForm = () => {
    const isValidUsername = validateField("username", login.username);
    const isValidPassword = validateField("password", login.password);

    return isValidUsername && isValidPassword;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form before submitting
    if (!validateForm()) {
      return;
    }

    try {
      const response = await loginAdmin(login);
      console.log('response', response)
      const {
        data: {
          data: { accessToken },
        },
      } = response;

      if (accessToken) {
        Cookies.set("token", accessToken);
        // navigate("/");
        window.location.href = "/";

      } else {
        console.error("No access token received from the API.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              id="username"
              name="username"
              value={login.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="password"
              name="password"
              value={login.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{
              backgroundColor: "#438a7a",
              border: "none",
              outline: "none",
            }}
          >
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
