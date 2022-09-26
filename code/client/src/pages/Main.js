/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import validator from 'email-validator'; 
import { Alert } from 'antd'; 

import 'antd/dist/antd.css';
import '../styles/Main.css';

const Main = ({socket}) => {
    const [emailAddress, setEmailAddress] = useState("");
    const [feedbackMessage, setFeedBackMessage] = useState(""); 
    const [isSuccess, setIsSuccess] = useState(false); 
    const [isError, setIsError] = useState(false); 
    const [isNotValidEmail, setIsNotValidEmail] = useState(false); 

    const FeaturesRef = useRef(null); 

    const sendFeedbackMessage = () => {
        if(emailAddress !== "" && feedbackMessage !== ""){
            
            if(validator.validate(emailAddress)){
                const feedbackUserMessage = {
                    emailAddress: emailAddress, 
                    feedbackMessage: feedbackMessage, 
                }
                setIsNotValidEmail(false);
                socket.emit("user-feedback", feedbackUserMessage); 
            }   
           
            setIsNotValidEmail(true); 
            setEmailAddress("");  
        }
        
        setEmailAddress("");  
        setFeedBackMessage("");  
    }

    useEffect(() => {
        // state firebase fetch data (success or fail)
        socket.on("firebase-feedback", (data) => {
            setIsSuccess(false);

            if(data.isSuccess){
                setIsSuccess(data.isSuccess);
                return  
            }
            setIsError(!data.isSuccess); 
        });

    }, [socket, setIsSuccess, setIsError])

    return (
    <section>
        
        <div className='intro'>
         
            <div className="description">
                <div className="content">
                    <h2 className='title-intro'>Start chatting with the new university inquiry bot</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et vel cupiditate eos sed quod mollitia
                        vitae
                        at est perferendis expedita provident placeat consectetur adipisicing elit. Et vel cupiditate
                        eos
                        sed
                        quod mollitia vitae at est perferendis expedita provident placeat</p>

                    <Link to="/chatbot">Start Chatting Now &#10140;</Link>
                </div>

                <div>
                    <div className="circle"></div>
                    <img src={require("./images/logo/girl.png")} alt="woman"/>
                </div>
            </div>
        </div>

        <div className="features-view" ref={FeaturesRef}>
          <div className="title-features">
              <h2 className="feat-title">Chatbot Features</h2>
          </div>
          <div className="features-container">
              <div className="features feature-1">
                  <img src={require("./images/logo/real-time.png")} alt="real time response"/>
                  <div className="feature-description">
                      <h2>Real-time response</h2>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque at aliquam doloribus quae!
                      </p>
                  </div>
              </div>

              <div className="features feature-2">
                  <img src={require("./images/logo/nlp.png")} alt="nlp"/>
                  <div className="feature-description">
                      <h2>NLP enabled</h2>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                          Itaque at aliquam doloribus quae!
                      </p>
                  </div>
              </div>

              <div className="features feature-3">
                  <img src={require("./images/logo/analytical.png")}  alt=""/>
                  <div className="feature-description">
                      <h2>Analytical</h2>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque at aliquam doloribus quae!
                      </p>

                  </div>
              </div>

              <div className="features feature-4">
                  <img src= {require("./images/logo/multi-media.png")} alt=""/>
                  <div class="feature-description">
                      <h2>Multi-media integration</h2>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque at aliquam doloribus quae!
                      </p>
                  </div>
              </div>

              <div className="features feature-5">
                  <img src={require("./images/logo/text-to-speech.png")} alt=""/>
                  <div className="feature-description">
                      <h2>Text-to-speech</h2>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque at aliquam doloribus quae!
                      </p>
                  </div>
              </div>

              <div className="features feature-6">
                  <img src={require("./images/logo/map.png")} alt=""/>
                  <div className="feature-description">
                      <h2>Google Maps Integration</h2>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque at aliquam doloribus quae!
                      </p>
                  </div>
              </div>
            </div>
      </div>

      <div className="how-to-use">
          <div className="how-description">
              <h2>How to use?</h2>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque ea, consequuntur eius enim odio, in
                  est placeat possimus cumque nesciunt voluptate modi eveniet sequi. Exercitationem facilis nam magnam
                  ni</p>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab a rem non tenetur!si veritatis sapiente
                  voluptates, qui minus maxime eos doloremque, perspiciatis, possimus
                  praesentium!</p>
          </div>
          <div className="how-img">
              <img src="" alt="Chat System"/>
          </div>
      </div>

      <div className="feedback">
          <img src={require("./images/logo/girl2.png")} alt="Girl Picture"/>

          <div className="form">
              <h2 className='send-feedback-title'>Send Feedback Anytime</h2>
              <p>If you found any issues and suggestions on the chatbot, <br/> feel free to react out to the team.</p>
              
              {isSuccess &&
                <Alert 
                    type='success'
                    message='Success'
                    description="Your response have been saved"
                    closable
                    showIcon
                />}
              
              {isError && 
                <Alert 
                    type='error'
                    message='Error'
                    description="Can't saved your query, please try again later."
                    closable
                    showIcon
                />}

              {isNotValidEmail &&
                 <Alert 
                    type='warning'
                    message='Warning'
                    description="Your email is invalid, please try again."
                    closable
                    showIcon
                />
              }

              <div className="form-section">
                <div className="form-container">
                   <input type="text" 
                    value={emailAddress}
                    placeholder="Email Address"
                    onChange={(e) => { setEmailAddress(e.target.value)}}
                    onKeyPress={(e) => e.key === "Enter" && sendFeedbackMessage()}
                    />
                   
                   <textarea 
                    cols="30" 
                    rows="10" 
                    value={feedbackMessage}
                    placeholder='Write your message here...'
                    onChange={(e) => { setFeedBackMessage(e.target.value)}}
                    onKeyPress={(e) => e.key === "Enter" && sendFeedbackMessage()}
                    ></textarea>            
                </div>
              </div>

              <div className="feedback-btn">
                  <button onClick={sendFeedbackMessage}>Send feedback</button>
              </div>
          </div>
      </div>
    
    <div className="chat-section">
          <h2 className='start-chat-title'>Got your questions ready?</h2>
          <Link to="/chatbot">Start Chat</Link>
      </div>
  </section>
  )
}

export default Main; 