const admin = require('firebase-admin'); 
const credentials = require('../config/askteknoy-key.json'); 
const { v4:uuid } = require('uuid'); 
const { async } = require('@firebase/util');

const ConnectDB = () => {
    admin.initializeApp({
        credential: admin.credential.cert(credentials)
    }); 

    // firebase db connection 
    const db = admin.firestore(); 
    console.log("connect to db"); 

    return db;
}

const SaveData = async (feedBackData) => {
    const dbFeedback = ConnectDB(); 
    const feedBackID = uuid(); 
    
    if (feedBackData !== null){
        const userFeedback = {
            id: feedBackID,
            name: feedBackData.fullName, 
            email: feedBackData.emailAddress, 
            feedbackMessage: feedBackData.message,
            time: feedBackData.time
        }

        const response = await dbFeedback.collection('user_feedback').doc(feedBackID).set(userFeedback);  
        if (response !== null) return true; 
    }
    return false;
}

module.exports = { SaveData }; 
