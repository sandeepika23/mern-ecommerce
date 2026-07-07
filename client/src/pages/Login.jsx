import { useState, useContext,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Auth.css";
import API from "../api/api";
import toast from "react-hot-toast";
function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(CartContext);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
  document.title = "MyStore | Login";
}, []);

  const changeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loginHandler = async () => {
    try {
      const res = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (!res.ok) {
        return alert(data.message);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setIsLoggedIn(true);

      alert("Login Successful");
      localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.user));
 toast.success("Welcome Back!");
      navigate("/");
    }catch(error){

toast.error("Invalid Email or Password");

}
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>Welcome Back 👋</h1>

        <p>Login to continue shopping</p>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={changeHandler}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={changeHandler}
        />

        <button onClick={loginHandler}>
          Login
        </button>

        <p className="auth-link">
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;