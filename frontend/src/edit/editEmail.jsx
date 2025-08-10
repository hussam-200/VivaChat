import axios from "axios";
import { useState } from "react"
import './editEmail.css'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function EditEmail() {
    const [currentEmail, setCurrentEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();

    async function submitHandel(e) {
    e.preventDefault();

    // Validate inputs
    if (!currentEmail || !newEmail || !Password) {
        alert("Enter all info");
        return;
    }

    try {
        const res = await axios.post("http://localhost:3333/api/edit/email", {
            oldEmail: currentEmail,
            newEmail: newEmail,
            password: Password
        });

        if (!res.data) {
            alert("Failed to update email. Please try again.");
            return;
        }

        localStorage.setItem("usersToken", res.data);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your email has been updated",
            showConfirmButton: false,
            timer: 1500
        });

        // Clear inputs on success
        setCurrentEmail("");
        setNewEmail("");
        setPassword("");

    } catch (err) {
        if (err.response) {
            const status = err.response.status;
            if (status === 401) {
                Swal.fire({
                    icon: "error",
                    title: "Wrong Password",
                    text: "The password you entered is incorrect."
                });
            } else if (status === 404) {
                Swal.fire({
                    icon: "error",
                    title: "User Not Found",
                    text: "No user found with the current email."
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Server Error",
                    text: `Something went wrong: ${status}`
                });
            }
        } else {
            // Network error or unexpected error
            console.error("Unknown error:", err);
            Swal.fire({
                icon: "error",
                title: "Network Error",
                text: "Unable to reach the server. Please try again later."
            });
        }
    }
}

    function handleProfilePage() {
            navigate("/profilepage")
        }

        return (
            <>
                <header><div>
                    <img src="/logo.png" alt="VivaChat Logo" />
                    <h1>VivaChat</h1>
                </div>

                    <button className="navi" type="submit" onClick={handleProfilePage} >ProfilePage</button>

                </header>
                <div className="conForm">
                    <form onSubmit={submitHandel}>
                        <label >Enter Current Email </label>
                        <input type="email" value={currentEmail}
                            onChange={(e) => {
                                setCurrentEmail(e.target.value)
                            }}
                        />
                        <label >Enter New Email</label>
                        <input type="email" value={newEmail}
                            onChange={(e) => {
                                setNewEmail(e.target.value)
                            }} />
                        <label >Enter Password</label>
                        <input type="password" value={Password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                        <button type="submit"  >Edit</button>

                    </form>
                </div>

                <footer><p>© 2025 VivaChat. All rights reserved.</p>
                    <p>Developed by Hussam</p></footer>

            </>
        )
    }