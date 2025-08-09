import {
    Routes, Route, NavLink,
    useLocation
} from "react-router-dom"

import Home from "../Home/Home"
import Login from "../Login/Login"
import Register from "../Register/Register"
import JoinRoom from "../JoinRoom/JoinRoom"
import CodingCorner from "../Rooms/CodingCorner"
import CreativeSpace from "../Rooms/CreativeSpace"
import GroupChat from "../Rooms/GroupChat"
import ProblemSolvers from "../Rooms/ProblemSolvers"
import ProjectRoom from "../Rooms/ProjectRoom"
import ResearchRoom from "../Rooms/ResearchRoom"
import ProfilePage from "../ProfilePage/ProfilePage"
import EditEmail from "../edit/editEmail"
import EditPassword from "../edit/editPassword"
import NotFound from "../NotFound/NotFound"
import Ai from "../Rooms/Ai"
import { useRef } from "react"
import Nav from "./Nav"

export default function Navigation() {
    const login = useRef(null)
    const register = useRef(null)
    const location = useLocation();


    const handelScroll = (ref) => {
        ref.current.scrollIntoView({ behavior: "smooth" });
    }




    return (
        <>
            {/* Show Nav only on "/" (login page) */}
            {/* {location.pathname === "/" && ( */}
                {/* <Login onScroll={(page) => { */}
                {/* //     if (page === "login") { handelScroll(login) }
                //     if (page === "register") { handelScroll(register) }
                // }} />
            // )} */}

            <Routes>

                {/* <Route path="/" element={
                    <>
                        {/* <div ref={login}>
                            <Login />
                        </div> }
                        <div ref={register}>
                            < Register />
                        </div>
                    </>

                } /> 
                {/* <Route path="/register" element={<Register />} /> */}
                <Route path="/" element={<Login/>} />
                <Route path="/register" element={<Register/>} />


                <Route path="/Home" element={<Home />} />
                <Route path="/join-room/:roomId" element={<JoinRoom />} />
                <Route path="/room/codingCorner" element={<CodingCorner />} />
                <Route path="/room/creativespace" element={<CreativeSpace />} />
                <Route path="/room/groupchat" element={<GroupChat />} />
                <Route path="/room/peoblemsolvers" element={<ProblemSolvers />} />
                <Route path="/room/projectroom" element={<ProjectRoom />} />
                <Route path="/room/researchroom" element={<ResearchRoom />} />
                <Route path="/profilepage" element={<ProfilePage />} />
                <Route path="/editemail" element={<EditEmail />} />
                <Route path="/editpassword" element={<EditPassword />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/ai" element={<Ai />} />





            </Routes>


        </>
    )
}