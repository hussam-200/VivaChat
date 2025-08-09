import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditPassword() {
    const [email, setEmail] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const navigate = useNavigate();
    function handelPassword(e) {
        e.preventDefault();
        try {
            axios.post("http://localhost:3333/api/edit/password",
                {
                    email: email,
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }
            )
                .then(res => {
                    localStorage.setItem("usersToken", res.data)
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
            setEmail("");
            setOldPassword("");
            setNewPassword("");

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

                <h1>VivaChat</h1>
            </div>
                <button className="navi" type="submit" onClick={handleProfilePage} >ProfilePage</button>


            </header>
            <div className="conForm">
                <form onSubmit={handelPassword}>
                    <label >Enter Email </label>
                    <input type="email" value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                    <label >Enter Current Password</label>
                    <input type="password" value={oldPassword}
                        onChange={(e) => {
                            setOldPassword(e.target.value)
                        }} />
                    <label >Enter New Password</label>
                    <input type="password" value={newPassword}
                        onChange={(e) => {
                            setNewPassword(e.target.value)
                        }}
                    />
                    <button type="submit" >Edit</button>
                </form>
            </div>
            <footer>husam</footer>


        </>
    )
}