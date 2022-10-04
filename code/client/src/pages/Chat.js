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

import Message from '../components/MessageBody';
import '../styles/Chat.css'; 
import '../styles/responsive/chat-rwd.css';


function Chat({socket}) {
  const [userQuery, setQuery] = useState(""); 
  const [messageList, setMessageList] = useState([]); 
  const [fileName, setFileName] = useState(""); 

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
    document.title = "Start Ask AskTeknoy";

    // receive message from bot
    socket.off("receive-message").on('receive-message', (botMessageRes) => { 
        setMessageList((list) => [...list, botMessageRes])

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
                        <> 
                            {messageContent.author === "AskTeknoy" ? 
                                <Message 
                                messageContent={messageContent} 
                                index={index}
                                handleClickFile={handleClickFile} 
                                copyEmailLink={copyEmailLink}   
                                author="AskTeknoy"
                            /> 
                            :
                            <Message 
                                messageContent={messageContent} 
                                index={index}
                                handleClickFile={handleClickFile} 
                                copyEmailLink={copyEmailLink}   
                                author="Guest"
                            />
                            }
                        </>
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