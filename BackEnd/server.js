require("dotenv").config();
const express = require("express");
const http = require('http');
const socketIo = require("socket.io")
const cors = require("cors");
const axios = require("axios")


const pg = require("pg");
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })


const app = express();
app.use(cors())
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});
app.use(express.json())

const login = require("./route/login");
const editInfo = require("./route/userInfo");
const userId = require("./route/usersRoom");
app.use("/viva", login)
app.use("/api", userId)
app.use("/api", editInfo)

const users = {};

io.on("connection", socket => {
    socket.on('joinedRoom', (joinedUser) => {
        socket.join(joinedUser.roomId)
        users[socket.id] = {
            name: joinedUser.name,
            roomId: joinedUser.roomId
        };
        socket.emit("joinedRoom", `you are joind in room ${joinedUser.roomId}`)
        socket.broadcast.to(joinedUser.roomId).emit("sayWellcome", `say Wellcome to ${joinedUser.name}`)
    })
    socket.on('sendMessage', async (message) => {
        const user = users[socket.id];
        if (user) {

            io.to(user.roomId).emit("chatMessages", {
                name: user.name,
                text: message.text,
                time: new Date().toISOString()
            });
            if (user.roomId === "7") {
                try {
                    const response = await axios.post(
                        "https://openrouter.ai/api/v1/chat/completions",
                        {
                            model: "openai/gpt-3.5-turbo",
                            messages: [
                                { role: "system", content: "You are a helpful assistant in a developer chat room." },
                                { role: "user", content: message.text }
                            ]
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                                "Content-Type": "application/json",
                                "HTTP-Referer": "http://localhost",
                                "X-Title": "VivaChat"
                            }
                        }
                    );

                    const aiResponse = {
                        name: "AI Bot",
                        text: response.data.choices[0].message.content,
                        time: new Date().toISOString()
                    };

                    io.to(user.roomId).emit("chatMessages", aiResponse);
                } catch (error) {
                    console.error("OpenRouter error:", error.response?.data || error.message);
                    io.to(user.roomId).emit("chatMessages", {
                        name: "VivaChatAI",
                        text: "❌ Sorry, I couldn't respond right now.",
                        time: new Date().toISOString()
                    });
                }
            }
        }
    })

    socket.on('disconnect', async () => {
        const user = users[socket.id];
        if (user) {
            socket.broadcast.to(user.roomId).emit("leaveRoom", `this user left room ${user.name}`)
            delete users[socket.id];
        }
        try {

            await pool.query(
                'DELETE FROM room_users WHERE name = $1 AND room_id = $2',
                [user.name, user.roomId]
            );


        } catch (error) {
            console.log(error);

        }
    })
})

port = process.env.PORT || 3000;


server.listen(port, () => {
    console.log(port);

})

