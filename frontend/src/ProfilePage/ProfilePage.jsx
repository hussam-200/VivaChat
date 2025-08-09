import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import './ProfilePage.css'
export default function ProfilePage() {
    const [profileData, setProfileData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("usersToken");


        axios("http://localhost:3333/api/Profile/Data",
            {
                headers: { Authorization: `Bearer ${token}` }

            }
        )
            .then(res => {

                setProfileData(res.data)
                localStorage.setItem("UserEmail",res.data.email)
            
            })
            .catch(err => {
                console.log(err);

            })

    }, [])
    function handelEditEmail() {
        navigate("/editemail")
    }
    function handelEditPassword() {
        navigate("/editpassword")
    }
    function handleBackHome() {
        navigate("/Home")
    }
    function handleLogOut() {
        localStorage.removeItem("usersToken")
        navigate("/")
    }



    return (
        <>
            <header className="header">
                <div>
                    <h1>VivaChat</h1>
                </div>
                <div className="logout">
                    <button onClick={handleLogOut}>logout</button>
                </div>
            </header>
            <div className="con">

                <div className="infoCon">
                    <img src="https://static.vecteezy.com/system/resources/previews/020/911/740/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png" />
                    <p>ID :{profileData.id} </p>

                    <h3>Name : {profileData.first_name}{profileData.last_name}</h3>
                    <p>Email : {profileData.email} <button onClick={handelEditEmail}>edit</button></p>
                    <p>Password {profileData.password}  <button onClick={handelEditPassword}>edit</button></p>
                    <div className="buttonCon">
                        <button className="buttonHome" onClick={handleBackHome}>Home page</button>

                    </div>
                </div>




            </div>
            <footer><p>© 2025 VivaChat. All rights reserved.</p>
    <p>Developed by Hussam</p></footer>

        </>

    )
}