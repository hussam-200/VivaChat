import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditPassword() {
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

    function handelPassword(e) {
        e.preventDefault();

        axios.post("http://localhost:3333/api/edit/password", {
            email,
            oldPassword,
            newPassword
        })
            .then(res => {
                localStorage.setItem("usersToken", res.data);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });

                // Clear inputs on success only
                setEmail("");
                setOldPassword("");
                setNewPassword("");
            })
            .catch(err => {
                if (err.response) {
                    const status = err.response.status;
                    if (status === 403) {
                        Swal.fire({
                            icon: "error",
                            title: "Login Failed",
                            text: "Incorrect information"
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: `Server responded with status code: ${status}`
                        });
                    }
                } else {
                    // Handles network or unexpected errors
                    console.error("Network or unknown error:", err);
                    Swal.fire({
                        icon: "error",
                        title: "Network Error",
                        text: "Unable to connect to the server. Please try again later."
                    });
                }
            });
    }

    function handleProfilePage() {
        navigate("/profilepage");
    }

    return (
        <>
            <header>
                <div>
                    <h1>VivaChat</h1>
                </div>
                <button className="navi" type="button" onClick={handleProfilePage}>
                    ProfilePage
                </button>
            </header>

            <div className="conForm">
                <form onSubmit={handelPassword}>
                    <label>Enter Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>Enter Current Password</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                    <label>Enter New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Edit</button>
                </form>
            </div>

            <footer><p>© 2025 VivaChat. All rights reserved.</p>
    <p>Developed by Hussam</p></footer>
        </>
    );
}