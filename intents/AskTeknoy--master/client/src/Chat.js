import React from 'react'
import { useState, useEffect } from 'react'; 
import ScrollToBottom from 'react-scroll-to-bottom';
import { useSpeechSynthesis } from 'react-speech-kit'; 

function Chat({socket}) {
  const [userQuery, setQuery] = useState(""); 
  const [messageList, setMessageList] = useState([]); 
  const defaultAuthor = "Guest";


  // speack  
  const { speak } =  useSpeechSynthesis(); 

  const sendQuery = async () => {
    if(userQuery !== ""){

        const messageData = { 
            author: defaultAuthor,
            message: userQuery, 
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
        }

        setMessageList((list) => [...list, messageData])

        await socket.emit("send-query", messageData); 
    }

    setQuery(" "); 
  }

  useEffect(() => { 
    // receive message from bot
    socket.off("receive-message").on('receive-message', (botMessageRes) => { 
        setMessageList((list) => [...list, botMessageRes])
        // text to speech
        speak({text: botMessageRes.message}); 
    })
  }, [socket, speak])

  return (
    <div className="App">
        <div className="chat-window">
            <div className="chat-header">
                <p>AskTeknoy</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent) => {
                        return (
                            <div className="message" id={() => messageContent.author === "AskTeknoy" ? "AskTeknoy" : "Guest"}>
                                <div className="message-content">
                                    <p>{messageContent.message}</p>
                                </div>
                                
                                <div className="message-meta">
                                    <p id="author">{messageContent.author}</p>
                                    <p id="time">{messageContent.time}</p>
                                </div>
                            </div>
                        )
                    })}
                </ScrollToBottom>
                
            </div>
            <div className="chat-footer">
                <input 
                type="text"
                value={userQuery}
                placeholder="Enter message..." 
                onChange={(event) => setQuery(event.target.value)} 
                onKeyPress={(event) => event.key === "Enter" && sendQuery()}
                />
                <button onClick={sendQuery}>&#9658;</button>
            </div>
        </div>
    </div>
  )
}

export default Chat