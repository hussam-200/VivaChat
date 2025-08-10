import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import './Login.css';
import axios from "axios";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';

export default function Login() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  function handlePasswordChange(e) {
    let val = e.target.value;

    if (val.length > 0) {
      val = val.charAt(0).toUpperCase() + val.slice(1);
    }

    setUserData(prev => ({ ...prev, password: val }));

    if (val.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }
  }

  async function handelLogin(e) {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      alert("Enter your info");
      return;
    }
    if (passwordError) {
      alert(passwordError);
      return;
    }

    try {
      localStorage.setItem("UserEmail", userData.email);

      await axios.post("http://localhost:3333/viva/login", userData)
        .then(res => {
          console.log(res);
          localStorage.setItem("usersToken", res.data.token);
          navigate("/Home");
        })
        .catch(err => {
          let message = "Something went wrong";
          if (err.response) {
            const status = err.response.status;
            if (status === 404) message = "User Not Found";
            // else if (status === 409) message = "Please Enter All Information";
            else if (status === 401) message = "Incorrect email or password";
            else message = "Server error";
          }

          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: message
          });
        });

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="ConstainerLoginCon">

      <h1 className="mainTitle">VivaChat</h1>

      <form className="LoginForm" onSubmit={handelLogin}>
        <h3>Login</h3>

        <label>Enter Your Email</label>
        <input
          className="inputForm"
          placeholder="hussam@gmail.com"
          type="email"
          autoComplete="email"
          value={userData.email}
          onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
          onInvalid={(e) => e.target.setCustomValidity("Please enter your email")}
          onInput={(e) => e.target.setCustomValidity("")}
          required
        />

        <label>Enter Your Password</label>
        <input
          className="inputForm"
          type="password"
          autoComplete="current-password"
          value={userData.password}
          onChange={handlePasswordChange}
          required
        />
        {passwordError && <p style={{ color: 'red', fontSize: '14px' }}>{passwordError}</p>}

        <p>Don't have an account? <NavLink to="/register" className="whiteLink">Register</NavLink></p>

        <button
          className="submitButton"
          type="submit"
          disabled={passwordError}
        >
          Login
        </button>
      </form>



    </div>
  );
}
