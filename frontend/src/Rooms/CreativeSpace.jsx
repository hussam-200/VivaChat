import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import './Rooms.css'
export default function CreativeSpace() {
    const [userData, setUserData] = useState([])
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("");
    const socketRef = useRef(null);
    const location = useLocation();
    const { name, roomId } = location.state;
    const [showPicker , setShowPicker]=useState(false)
    const navigate=useNavigate();
    const ScrollRef=useRef(null);

    useEffect(() => {
        socketRef.current = io("http://localhost:3333")

        socketRef.current.emit("joinedRoom", {
            name, roomId
        })
        socketRef.current.on("joinedRoom", (message) => {
            setMessages(prev => [...prev, { name: "VivaChat", text: message, time: new Date().toISOString() }])
        })
        socketRef.current.on("sayWellcome", (message) => {
            setMessages(prev => [...prev, { name: "VivaChat", text: message, time: new Date().toISOString() }])
        })
        socketRef.current.on("chatMessages", (message) => {
            setMessages(prev => [...prev, message])
        })
         socketRef.current.on("leaveRoom", (messages)=>{
            setMessages(prev =>[...prev , {name:"VivaChat" , text:messages , time:new Date().toISOString()}])
        })


        return ()=>{
            socketRef.current.disconnect();
        }
    }, [])

    useEffect(() => {
        axios.get("http://localhost:3333/api/get/joinRoom?roomId=3")
            .then(res => {
                setUserData(res.data)
            })
            .catch(err => {
                console.log(err);

            })
    }, [])

    function showEmoji(imoji){
        setInput(prev => prev + imoji.native )
    }
    function handleHomePage(){
        navigate("/Home")
    }

    useEffect(()=>{
        ScrollRef.current.scrollIntoView({behavior:"smooth"})
    },[messages])
    return (
        <>
       <header className="header">
                <div>
                    <img src="/logo.png" alt="VivaChat Logo" />
                    <h1>VivaChat</h1></div>
                <button onClick={handleHomePage}>Exit Chat</button>
            </header>
            <div className="chatContainer">
                           <div className="messages">
                               {messages.map((msg, i) => (
                                   <div
                                       key={i}
                                       className={`message ${msg.name === name ? "right" : "left"}`}
                                   >
                                       <strong>{msg.name || "Admin"}</strong>
                                       <span className="text">
                                           {typeof msg.text === "string" ? msg.text : JSON.stringify(msg.text)}
                                       </span>
                                       <em className="timestamp">
                                           {new Date(msg.time).toLocaleTimeString()}
                                       </em>
                                   </div>
                               ))}
                               <div ref={ScrollRef} />
                           </div>
           
                           <div className="inputArea">
                               <button
                                   className="emojiButton"
                                   onClick={() => setShowPicker(prev => !prev)}
                               >
                                   😊
                               </button>
           
                               {showPicker && (
                                   <div className="emojiPickerWrapper">
                                       <Picker data={data} onEmojiSelect={showEmoji} />
                                   </div>
                               )}
           
                               <input
                                   type="text"
                                   value={input}
                                   onChange={(e) => setInput(e.target.value)}
                                   className="chatInput"
                                   placeholder="Type your message..."
                               />
           
                               <button
                                   className="sendButton"
                                   onClick={() => {
                                       if (input.trim() !== "") {
                                           socketRef.current.emit("sendMessage", {
                                               name,
                                               text: input,
                                               time: new Date().toISOString(),
                                               roomId
                                           });
                                           setInput("");
                                       }
                                   }}
                               >
                                   Send
                               </button>
                           </div>
                       </div>
           
            <footer><p>© 2025 VivaChat. All rights reserved.</p>
    <p>Developed by Hussam</p></footer>
        </>
    )
}





