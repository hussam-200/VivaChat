import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { io } from "socket.io-client"
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import './Rooms.css'
export default function Ai() {
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])
    const socket = useRef(null)
    const location = useLocation();
    const { name, roomId } = location.state;
    const [showPicker, setShowPicker] = useState(false);
    const navigate = useNavigate();
    const [loadingChat, setLoadingChat] = useState(true)
    const ScrollRef=useRef(null);
    useEffect(() => {
        socket.current = io("http://localhost:3333")

        socket.current.emit("joinedRoom", {
            name: name,
            roomId: roomId
        })
        socket.current.on("joinedRoom", (messages) => {
            setMessages(prev => [...prev, { name: "VivaChatAI", text: messages, time: new Date().toISOString() }])
            setLoadingChat(false)
        })
        socket.current.on("chatMessages", (messages) => {
            setMessages(prev => [...prev, messages])
            setLoadingChat(false)
        })

        return () => { socket.current.disconnect() }
    }, [])

    const addEmoji = (emoji) => {
        setInput(prev => prev + emoji.native)
    }
    function handleHomePage() {
        navigate("/Home")
    }
    useEffect(() => {
        if (messages.length > 0) {
            const time = setTimeout(() => {
                setLoadingChat(false)
            }, 1000)
            return () => clearTimeout(time)
        }
    }, [messages])
    useEffect(()=>{
        ScrollRef.current.scrollIntoView({behavior:"smooth"})
    },[messages])
    return (
        <>
            <header className="header">
                <div>
                    <h1>VivaChat</h1>
                </div>
                <button onClick={handleHomePage}>Exit Chat</button>
            </header>

            <div className="chatContainer">
                <div className="messages">
                    {loadingChat ? (
                        <>Loading Messages...</>
                    ) : (
                        messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`message ${msg.name === name ? "right" : "left"}`}
                            >
                                <strong>{msg.name || "Admin"}</strong>
                                <span className="text">
                                    {typeof msg.text === "string"
                                        ? msg.text
                                        : JSON.stringify(msg.text)}
                                </span>
                                <em className="timestamp">
                                    {new Date(msg.time).toLocaleTimeString()}
                                </em>
                            </div>
                        ))
                    )}
                    <div ref={ScrollRef} />
                </div>

                <div  className="inputArea">
                    <button
                        className="emojiButton"
                        onClick={() => setShowPicker(prev => !prev)}
                    >
                        😊
                    </button>

                    {showPicker && (
                        <div className="emojiPickerWrapper">
                            <Picker data={data} onEmojiSelect={addEmoji} />
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
                                socket.current.emit("sendMessage", {
                                    name,
                                    text: input,
                                    time: new Date().toISOString(),
                                    roomId,
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
    );
}