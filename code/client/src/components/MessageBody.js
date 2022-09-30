/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Image from './Image';
import MapGoogle from './MapGoogle';

const Message = ({messageContent, handleClickFile, copyEmailLink, index, author}) => {
  return (
    <div>
        <div key={index} className="message" id={author}>

            <div className='message-box' id={author + "-box"}>
                <div className="message-meta">
                    <p id="author">{messageContent.author}</p>
                    <p id="time">{messageContent.time}</p>
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

                    {/* Map content intents */}

                    {messageContent.typeData === "map" ? <MapGoogle /> : <></>}
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Message;