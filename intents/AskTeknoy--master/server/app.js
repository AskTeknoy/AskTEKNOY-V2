const express = require('express') 
const { Server } = require('socket.io')
const cors = require('cors')
const http = require('http')
const { NlpManager } = require('node-nlp');

const app = express() 

app.use(cors())

const trainModel = require('./train'); 

const manager = new NlpManager({language: ["en"]}); 

manager.load(); 

const server = http.createServer(app) 

// io socket connection to client
const io = new Server(server, { 
    cors: { 
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"]
    }
})

// listening to client connection 
io.on("connection", socket => {
    console.log(`User connected: ${socket.id}`)

    // when user send message 
    socket.on("send-query", async (messageClient) => {
        
        // nlp word finder
        const response = await manager.process("en", messageClient.message); 
        const time = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
        
        if(response.answer){
            const botMessageContent = {
                author: "AskTeknoy", 
                message: response.answer, 
                time: time
            }

            await socket.emit("receive-message", botMessageContent);
        } 
        else {
            await socket.emit("receive-message", { author: "bot", message: "what was that?" , time: time})
        }
    })

    socket.on("disconnect", () => { 
        console.log(`User disconnected: `, socket.id);
    })
})

server.listen('4001', () => { 
    console.log('Server on port: 4001') 
})