/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect, useRef } from 'react'; 
import { useSpeechSynthesis } from 'react-speech-kit'; 
import ScrollToBottom from 'react-scroll-to-bottom';
import { Alert } from 'react-st-modal';
import Axios from 'axios';
import FileDownload from 'js-file-download';
import moment from 'moment';
import copy from 'copy-to-clipboard';

import Image from './Image';
import '../styles/Chat.css'; 


function Chat({socket}) {
  const [userQuery, setQuery] = useState(""); 
  const [messageList, setMessageList] = useState([]); 
  const [fileName, setFileName] = useState(""); 
  const [isImage, setIsImage] = useState(false); 
  const defaultAuthor = "Guest";

  const bottomRef = useRef(null); 
  // speack  
  const { speak, speaking, cancel } =  useSpeechSynthesis(); 

  let messageData = { }; 

  const sendQuery = async () => {
    if(userQuery !== ""){
    
        messageData = { 
            author: defaultAuthor,
            message: userQuery, 
            time: moment().format("LT")
            // time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
        }

        setMessageList((list) => [...list, messageData])

        await socket.emit("send-query", messageData); 
    }

    setQuery(" "); 
  }

  // render download data file
  const handleClickFile = (e) => { 
    e.preventDefault();

    // get request for file download
    Axios({
        url: "http://localhost:4001/download-pdf", 
        method: "GET", 
        responseType: "blob"
    })
    .then((res) => { 
        console.log(res);
        FileDownload(res.data, `${fileName}`); 
    })
    .catch(err => alert("File does not exist"));
  }

  const copyEmailLink = async (emailLink) => {
    copy(emailLink);

    const result = await Alert("Email link copied to clipboard."); 
  }


  useEffect(() => { 
    // receive message from bot
    socket.off("receive-message").on('receive-message', (botMessageRes) => { 
        setMessageList((list) => [...list, botMessageRes])
        
        if(botMessageRes.typeData === 'image'){
            setIsImage(true);
        }

        // text to speech
        if(speaking){
            cancel();
            speak({text: botMessageRes.message}); 
        } else {
            speak({text: botMessageRes.message}); 
        }
        
        if(botMessageRes.typeData === "file"){ 
            setFileName(botMessageRes.fileName);
        }
    })

  }, [cancel, socket, speak, speaking]);

  return (
    <div className="App">
        <p className="section-title">Start Chat AskTeknoy</p>
        <div className="chat-window">
            <div className="chat-header">
                <p>AskTeknoy</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container" mode="bottom">
                    {messageList.map((messageContent, index) => {
                        return (
                            
                            <div key={index} className="message" id={() => messageContent.author === "AskTeknoy" ? "AskTeknoy" : "Guest"}>
                                <div key={index} className="message-meta">
                                    <p key={index} id="author">{messageContent.author}</p>
                                    <p key={index} id="time">{messageContent.time}</p>
                                </div>

                                <div className="message-content">     
                                    <p >{messageContent.message}</p>
                                    {/* link content */}
                                    <a  href={messageContent.link}>{messageContent.link}</a>

                                    {/* Send file pdf content */}
                                    <a  href="#" 
                                        onClick={(e) => { handleClickFile(e)}}>{messageContent.fileName}
                                    </a>

                                    {/* Email content */}
                                    <a onClick={() => { copyEmailLink(messageContent.email)}}>{messageContent.email}</a>
                                    
                                    {/* Image Content */}
                                    {messageContent.typeData === 'image' ? <Image imgKey={messageContent.imageName}/> : ''}
                                </div>

                            </div>
                        )
                    })}
                </ScrollToBottom>
                <div ref={bottomRef} />
            </div>
            
            <div className="chat-footer">
                <input 
                type="text"
                value={userQuery}
                placeholder="Enter message..." 
                onChange={(event) => setQuery(event.target.value)} 
                onKeyPress={(event) => event.key === "Enter" && sendQuery()}
                />
                <button onClick={sendQuery}>&#10148;</button>
            </div>
        </div>
    </div>
  )
}

export default Chat