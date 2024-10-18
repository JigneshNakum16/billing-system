import {useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/admin/login`,
        login
      );
      const {
        data: {
          data: { accessToken },
        },
      } = response;

      if (accessToken) {
        Cookies.set("token", accessToken, {
          path: "/",
          sameSite: "None",
          secure: true,
        });
        navigate("/");
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
              type="username"
              className="form-control"
              id="username"
              name="username"
              value={login.username}
              onChange={(e) => handleChange(e)}
              placeholder="Enter your username"
              // required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={login.password}
              onChange={(e) => handleChange(e)}
              placeholder="Enter your password"
              // required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
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
