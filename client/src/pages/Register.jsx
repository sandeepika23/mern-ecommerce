import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import toast from "react-hot-toast";
import API from "../api/api";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
  document.title = "MyStore | Register";
}, []);

  const changeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const registerHandler = async () => {
  try {
    const res = await API.post("/users/register", user);

    toast.success("Account Created Successfully");

    navigate("/login");

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Registration Failed"
    );
  }
};

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>Create Account</h1>

        <p>Register to start shopping</p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={changeHandler}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={changeHandler}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={changeHandler}
        />

        <button onClick={registerHandler}>
          Register
        </button>

        <p className="auth-link">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;