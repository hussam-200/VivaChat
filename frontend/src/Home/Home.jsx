import { useNavigate, NavLink, useLocation } from "react-router-dom"
import './Home.css'
export default function Home() {
    const navigate = useNavigate();
    const location=useLocation();
    const data=location.state || {};
    const email=localStorage.getItem("UserEmail")
    const rooms = [
        {
            id: "1",
            name: "Coding Corner",
            icon: "💻",
            description: "A space dedicated to coding discussions, sharing snippets, and helping each other solve programming problems."
        },
        {
            id: "2",
            name: "Project Room",
            icon: "📁",
            description: "Collaborate on ongoing projects, share updates, assign tasks, and track progress as a team."
        },
        {
            id: "3",
            name: "Creative Space",
            icon: "🎨",
            description: "A room for designers, artists, and creatives to share ideas, get feedback, and brainstorm creatively."
        },
        {
            id: "4",
            name: "Research Room",
            icon: "🔍",
            description: "Ideal for discussing research topics, exploring new technologies, and sharing articles or papers."
        },
        {
            id: "5",
            name: "Problem Solvers",
            icon: "🧩",
            description: "Focused on solving logical challenges, quizzes, and algorithmic problems collaboratively."
        },
        {
            id: "6",
            name: "Group Chat",
            icon: "💬",
            description: "A general chat room for casual conversation, announcements, and community bonding."
        },
        {
            id: "7",
            name: "Ai Chat",
            icon: "🤖",
            description: "Talk to the AI bot, ask questions, generate text, or have fun experimenting with AI responses."
        }
    ];



    function handelGoToRoom(id) {
        navigate(`/join-room/${id}`)
    }
    return (
        <div className="homePage">
            <header className="header">
                <div className="logo-section">
                    {/* <img src="/logo.png" alt="VivaChat Logo" / */}
                    <h1>VivaChat</h1>
                </div>
                <div>
                    <nav className="nav-links">
                        <NavLink to="/profilepage">👤 {"👤" &&email || "Gest"} </NavLink>
                    </nav>
                </div>
            </header>


            <div className="roomCon">

                {rooms && rooms.map((room) => (
                    <div key={room.id}>
                        <h3>{room.name}{room.icon}</h3>
                        <p>{room.description}</p>
                        <button onClick={() => handelGoToRoom(room.id)}>Go a head</button>
                    </div>
                ))}

            </div>
            <footer><p>© 2025 VivaChat. All rights reserved.</p>
    <p>Developed by Hussam</p></footer>


        </div>
    )
}