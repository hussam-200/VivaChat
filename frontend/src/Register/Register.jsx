import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import './Register.css'
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';



export default function Register() {
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({ firstName: "", lastName: "", email: "", password: "" });
    const [passwordError, setPasswordError] = useState("");

    function handlePasswordChange(e) {
        let val = e.target.value;
        if (!newUser.email) {
            Swal.fire({
                icon: "error",
                title: "Missing Email",
                text: "Please enter your email"
            });
        }
        if (val.length > 0) {
            val = val.charAt(0).toUpperCase() + val.slice(1);
        }

        setNewUser(prev => ({ ...prev, password: val }));

        if (val.length < 8) {
            setPasswordError("Password must be at least 8 characters");
        } else {
            setPasswordError("");
        }
    }
    async function handelLogin(e) {
        e.preventDefault();
        try {
            axios.post("http://localhost:3333/viva/register", newUser)
                .then(res => {
                    console.log(res);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Account is successfully created",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/");
                })
                .catch(err => {
                    if (err.response) {
                        const status = err.response.status;
                        if (status === 401) {
                            // alert("Email is Used");
                            Swal.fire({
                                icon: "error",
                                title: "Login Failed",
                                text: "Email is Used"
                            });
                        } else if (status === 403) {
                            alert("Password is required");
                        } else {
                            alert("Registration failed");
                        }
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="ConstainerLoginCon">
            <form className="LoginForm" onSubmit={handelLogin}>
                <h3>Create New Account</h3>

                <label>First Name:</label>
                <input className="inputForm" type="text" value={newUser.firstName}
                    onChange={(e) => {
                        setNewUser(prev => ({ ...prev, firstName: e.target.value }))
                    }}
                />

                <label>Last Name:</label>
                <input className="inputForm" type="text" value={newUser.lastName}
                    onChange={(e) => {
                        setNewUser(prev => ({ ...prev, lastName: e.target.value }))
                    }} />

                <label>Email:</label>
                <input className="inputForm" type="email" value={newUser.email}
                    autoComplete="email"
                    onChange={(e) => {
                        setNewUser(prev => ({ ...prev, email: e.target.value }))
                    }}
                />

                <label>Password:</label>
                <input className="inputForm" type="password" value={newUser.password}
                    autoComplete="current-password"
                    onChange={handlePasswordChange} />
                {passwordError && <p style={{ color: 'red', fontSize: '14px' }}>{passwordError}</p>}
                <p>Do You Have Account ? <NavLink to="/" className="whiteLink">Register</NavLink></p>


                <button className="submitButton" type="submit"
                    disabled={!newUser.email || passwordError || !newUser.password}
                >Sign Up</button>
            </form>
            <footer>contact Us</footer>
        </div>
    );
}
