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
        if (currentEmail === "" || newEmail === "" || Password === "") {
            alert("enter all info ")
            return
        }
        e.preventDefault();
        try {
            await axios.post("http://localhost:3333/api/edit/email",
                {
                    oldEmail: currentEmail,
                    newEmail: newEmail,
                    password: Password
                }
            )
                .then(res => {
                    console.log(res);
                    if (!res.data) {
                        alert("Failed to update email. Please try again.");
                        return;
                    } else {
                        localStorage.setItem("usersToken", res.data)
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your work has been saved",
                            showConfirmButton: false,
                            timer: 1500
                        });

                    }
                })
            setCurrentEmail("")
            setNewEmail("")
            setPassword("")

        } catch (error) {
            console.log(error);

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

            <footer>husam</footer>

        </>
    )
}