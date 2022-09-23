const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const http = require('http');
const fs = require('fs').promises 
const { NlpManager } = require('node-nlp');
const moment = require('moment'); 
const extractUrl = require('extract-urls'); 
const email = require('node-email-extractor').default;
const { findPhoneNumbersInText, findNumbers  } = require('libphonenumber-js');
const { GetImageLocation, GetFile } = require('./firebase/getImage');
const { SaveData, SaveDataFeedback } = require('./firebase/models/userContact');

// automatic train model
const trainModel = require('./train'); 

const app = express() 
app.use(cors())

// change file name 
let fileName = " "; 


// manager to open model
const manager = new NlpManager({language: ["en"]}); 

manager.load(); 

// create server
const server = http.createServer(app) 

// io socket connection to client
const io = new Server(server, { 
    cors: { 
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"]
    }
})

// request to server 
app.get("/download-pdf", (req, res) => {

    const file = `syllabus/${fileName}`;     
    res.download(file);
}); 

// listening to client connection 
io.on("connection", socket => {

    let typeData = "text"; // default data value
    let botMessageContent = {}; // init bot response
    const time = moment().format("LT"); // current time sent

    // check connection
    if(socket.id){
       console.log(`User connected: ${socket.id}`);

       // initial message of the bot
        const defaultGreetingsHi = [
            "Hey there!, I'm AskTeknoy your virtual assistant. How may I help you?", 
            "Hello, I'm AskTeknoy, how may I help you?", 
            "Hello, I'm chatbot assistant, AskTeknoy, ready to help you!", 
            "Greetings, I'm AskTeknoy, a query chatbot, at your service.", 
            "AskTeknoy is here, how may I help you?"
        ]

        // random message of the greetings bot
        const randomDefaultGreetingsHi = defaultGreetingsHi[Math.floor(Math.random() * 4)]; 
        botMessageContent = {
            author: "AskTeknoy", 
            message: randomDefaultGreetingsHi,
            time: time, 
            typeData: typeData, 
        }

        // send initial message to client
        socket.emit("receive-message", botMessageContent);      
    }
    
    // contact user
    socket.on("save-contact-user", (userContactData) => {
        if(SaveData(userContactData)){

        }
    });

    // feedback user 
    socket.on("user-feedback", (userFeedbackMessage) => {
        if(SaveDataFeedback(userFeedbackMessage)){
            console.log("data saved feedback");
            socket.emit("firebase-feedback", {isSuccess: true}); 
        }
        else {
            socket.emit("firebase-feedback", {isSuccess: false}); 
        }
    })

    // when user send message 
    socket.on("send-query", async (messageClient) => {
        
        // nlp word finder
        const response = await manager.process("en", messageClient.message); 
        // const time = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
        
        // random bot response 
        const randomDefault = [ 
            "What was it?", 
            "I don't understand, can you please try again?",
            "Sorry, I didn't get it.",
            "One more time?", 
            "I missed what you said. Chat it again?", 
            "I don't understand, can you repeat?"
        ]; 

        const defaultAnswer =  randomDefault[Math.floor(Math.random() * 6)]; 
        
        const intent = response.intent; // user intent
        
        if(response.answer){
            // link website intents
            if(intent.includes("website") || intent.includes("fb.page") || intent.includes("link")){
                typeData = "link"; 
                console.log(typeData);
                
                try {
                    // link url 
                    const linkUrl = extractUrl(response.answer)[0]; 

                    // separate link and non link
                    const messageLink = (response.answer).replace(linkUrl, ""); 
                                     
                    botMessageContent = {
                        author: "AskTeknoy", 
                        message: messageLink,
                        time: time, 
                        typeData: typeData, 
                        link: linkUrl, 
                    }
                    
                    // send bot response to client 
                    await socket.emit("receive-message", botMessageContent);
                }
                catch(err){
                    console.log(err); 
                }
            }
            // email intent
            else if(intent.includes("email") || intent.includes("emails")){
                typeData = "emails"; 
                
                try { 
                    // extract email data 
                    const botAnswerEmail = response.answer; 
                    const emailUrlData = email.text(botAnswerEmail);
                    const emailUrl = emailUrlData.emails[0]; 

                    // separate email and non email
                    const messageEmail = botAnswerEmail.replace(emailUrl, ""); 

                    botMessageContent = {
                        author: "AskTeknoy",
                        time: time, 
                        typeData: typeData, 
                        email: emailUrl, 
                        message: messageEmail
                    }

                    // send email type to client 
                    await socket.emit("receive-message", botMessageContent);
                }
                catch(err){
                    console.log(err);
                }
            }
            // send pdf syllabus
            else if(intent.includes("syllabus")){
                typeData = "file"; 
                try {
                    
                    fileName = intent + ".pdf" ;   

                    botMessageContent = {
                        author: "AskTeknoy", 
                        time: time, 
                        typeData: typeData, 
                        message: response.answer, 
                        fileName: fileName
                    }   

                    await socket.emit("receive-message", botMessageContent);
                }
                catch(err){
                    console.log(err);
                }
            }
            
            else if(intent.includes("contacts")){

                typeData = "contact"; 
                const phoneNumber = findNumbers(response.answer, 'US'); 
                // const newMessageContact = (response.answer).replace(phoneNumber, ""); 

                console.log(phoneNumber); 

                botMessageContent = {
                        author: "AskTeknoy", 
                        message: response.answer, 
                        time: time, 
                        typeData: typeData
                }

                await socket.emit("receive-message", botMessageContent);

            }

            // location (image) intent
            else if(intent.includes("location") || intent.includes("building")) { 
                
                // const imageUrl = __dirname + `/image_location/${intent}.jpg`; 

            
                // image files (location and building)
                try {
                   
                    const imageFileName = `${intent}.jpg`; 
                    console.log(imageFileName);
                    

                    const imageURL = GetImageLocation(imageFileName); 
                    console.log(`image url: ${imageURL}`);

                    // current intent

                    typeData = "image"; 
                    console.log(typeData);

                    botMessageContent = {
                        author: "AskTeknoy", 
                        message: response.answer, 
                        time: time, 
                        typeData: typeData,  
                        imageName: imageFileName,
                        imageURL: imageURL,
                        // imageUrl: imageUrl  
                    }

                    // send bot response to client 
                    await socket.emit("receive-message", botMessageContent);
                }
                catch(err){
                    console.log(err); 
                }

            } else {
                
                try {
                    typeData = "text"; 

                    botMessageContent = {
                        author: "AskTeknoy", 
                        message: response.answer, 
                        time: time, 
                        typeData: typeData
                    }

                    // send bot response to client 
                    await socket.emit("receive-message", botMessageContent);
                }
                catch(err){
                    console.log(err)
                }
            }
        } 

        else {

            await socket.emit("receive-message", { author: "AskTeknoy", 
                            message: defaultAnswer, 
                            time: time, 
                            typeData: typeData, 
            });   
        }
    })

    socket.on("disconnect", () => { 
        console.log(`User disconnected: `, socket.id);
    })
})

const PORT = process.env.PORT || 4001; 


server.listen(PORT, () => { 
    console.log(`Server on port: ${PORT}`);
})