/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect, useRef } from 'react'; 
import ScrollToBottom from 'react-scroll-to-bottom';
import { useSpeechSynthesis } from 'react-speech-kit'; 
import '../styles/Chat.css'; 
import Axios from 'axios';
import FileDownload from 'js-file-download';
import moment from 'moment';

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
  
  useEffect(() => { 
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

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messageList]);

  return (
    <div className="App">
        <p className="section-title">Start Chat AskTeknoy</p>
        <div className="chat-window">
            <div className="chat-header">
                <p>AskTeknoy</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container" mode="bottom">
                    {messageList.map((messageContent) => {
                        return (
                            <div className="message" id={() => messageContent.author === "AskTeknoy" ? "AskTeknoy" : "Guest"}>
                                <div className="message-meta">
                                    <p id="author">{messageContent.author}</p>
                                    <p id="time">{messageContent.time}</p>
                                </div>

                                <div className="message-content">
                                    <p>{messageContent.message}</p>
                                    {/* link content */}
                                    <a href={messageContent.link}>{messageContent.link}</a>

                                    {/* send file pdf content */}
                                    <a href="#" onClick={(e) => { handleClickFile(e)}}>{messageContent.fileName}</a>

                                    {/* email content */}
                                    <a href="#">{messageContent.email}</a>

                                    {/* image content message */}
                                    <img style={{width: 500, height: "auto"}} src={messageContent.imageURL} alt={messageContent.imageName}/>
                                    
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