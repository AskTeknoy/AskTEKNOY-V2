const FeedbackSchema = require('../models/FeedbackSchema');
const mongoose = require('mongoose');

// connection to db 
const ConnectDatabase =  () => {
    let isConnected = false;
    const dbFeedbackAskTeknoy = "mongodb+srv://gigagbyte:Megabyte.panis101@cluster0.fitqhah.mongodb.net/?retryWrites=true&w=majority";
    mongoose.connect(dbFeedbackAskTeknoy, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            isConnected = true; 
        })
        .catch(err => console.log("connection error", err))
    
    return isConnected;  
}

module.exports = { ConnectDatabase }; 

    
