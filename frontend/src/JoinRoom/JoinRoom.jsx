import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios";
import './JoinRoom.css'
export default function JoinRoom() {
    const { roomId } = useParams();
    const [nameInRoom, setNameInRoom] = useState("");
    const navigate = useNavigate();


    async function handleRoom() {
        try {
            const res = await axios.post("http://localhost:3333/api/joinRoom", {
                name: nameInRoom,
                roomId: roomId
            })
            console.log(res.data);

        } catch (error) {
            console.log(error);

        }
    }


    async function HandelInter() {

        if (nameInRoom.trim()) {
            try {
                await handleRoom();
                switch (roomId) {
                    case "1":
                        navigate("/room/codingCorner", {
                            state: {
                                name: nameInRoom,
                                roomId: roomId
                            }
                        })
                        break;
                    case "2":
                        navigate("/room/projectroom", {
                            state: {
                                name: nameInRoom,
                                roomId: roomId
                            }
                        })
                        break;
                    case "3":
                        navigate("/room/creativespace", {
                            state: {
                                name: nameInRoom,
                                roomId: roomId
                            }
                        })
                        break;

                    case "4":
                        navigate("/room/researchroom", {
                            state: {
                                name: nameInRoom,
                                roomId: roomId
                            }
                        })
                        break;

                    case "5":
                        navigate("/room/peoblemsolvers", {
                            state: {
                                name: nameInRoom,
                                roomId: roomId
                            }
                        })
                        break;
                        case "6":
                        navigate("/room/groupchat", {
                            state: {
                                name: nameInRoom,
                                roomId: roomId
                            }
                        })
                        break;

                    case "7":
                        navigate("/Ai", {
                            state: {
                                name: nameInRoom,
                                roomId: roomId
                            }
                        })

                }
            } catch (error) {

            }

        }

    }

    return (
        <>
            <header className="header">
  <h1>VivaChat</h1>
</header>

<div className="joinCon">
  <div className="joinForm">
    <label>Enter Your Name In Room:</label>
    <input type="text" value={nameInRoom}
      onChange={(e) => setNameInRoom(e.target.value)}
      placeholder="Your Name"
    />
    <button type="button" onClick={HandelInter} disabled={!nameInRoom.trim()}>Go In</button>
  </div>
</div>

<footer><p>© 2025 VivaChat. All rights reserved.</p>
    <p>Developed by Hussam</p></footer>

        </>
    )
}