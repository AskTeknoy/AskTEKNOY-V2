/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import '../styles/Contacts.css';
import { useState } from 'react'; 
import moment from 'moment';
import validator from 'email-validator'; 

const Contacts = ({socket}) => {
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState(""); 
  const [message, setMesssage] = useState("");


  const saveResponse = async () => {

    if(fullName !== "" && emailAddress !== "" && message !== ""){
        
        // checks valid emails 
        if(validator.validate(emailAddress)){
            console.log("valid email"); 

            // prepare data to save
            const userContactData = {
                fullName: fullName, 
                emailAddress: emailAddress, 
                message: message, 
                time: moment().format('MMMM Do YYYY, h:mm:ss a')    
            }

            // save data to database
             await socket.emit("save-contact-user", userContactData); 
        } 
        else { 
            console.log("invalid email");
            setEmailAddress(""); 
            return;
        }
    }

    setFullName(""); 
    setEmailAddress(""); 
    setMesssage("");  
  }

  return (
    <div className='contact-container'>
        <div className="contact">
            <div className="descript-contact">
                <h2>Contact Us</h2>
                <p>Got any questions to the team? Fill up the form <br/> below and we'll get in touch</p>
            </div>

            <div className='fields'>
                <input 
                    type="text" 
                    value={fullName} 
                    placeholder='Full name' 
                    onChange={(e) => setFullName(e.target.value)}
                     onKeyPress={(e) => e.key === "Enter" && saveResponse()}
                    />
                
                <input 
                    type="text" 
                    value={emailAddress} 
                    placeholder='Email address' 
                    onChange={(e) => setEmailAddress(e.target.value)}
                     onKeyPress={(e) => e.key === "Enter" && saveResponse()}
                    />
            </div>   

            <textarea 
                name="Message" 
                value={message} 
                placeholder="Message" 
                cols="107" rows="15" 
                onChange={(e) => setMesssage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && saveResponse()}
                    
                ></textarea>

            <div className='send-btn'>
                <button 
                onClick={saveResponse}
             
                >Send</button>
            </div>

        </div>
    </div>
  )
}

export default Contacts