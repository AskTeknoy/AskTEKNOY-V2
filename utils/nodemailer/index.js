const fs = require('fs');
const nodemailer = require('nodemailer'); 


const getCredentials = (keyPath) => {
    // read line by line 
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(keyPath)
    });

    let password = " "; 
    let gmail = " "; 


    // separate key gmail and password
    lineReader.on('line', function (line) {
    if(line.includes('gmail:')){
        gmail = line.replace("gmail:", "").trim();
        console.log(gmail);
    }

    if(line.includes('pass:')){
        password = line.replace("pass:", "").trim();
        console.log(password);
    }
    });
    
    return { gmail, password }; 
}

const newEmail = (userFeedback) => {
    const credential = getCredentials("key.txt");

    const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: credential.gmail,
            pass: credential.password
        } 
    })

    const details = { 
        from: credential.gmail,
        to: userFeedback.emailAddress,
        subject: "AskTEKNOY: Feedback response", 
        text: userFeedback.feedbackMessage
    }

    mailTransporter.sendMail(details, (err)  => {
        console.log(err, "error send data"); 
    })
}
