/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import Image from './Image';
import MapGoogle from './MapGoogle';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'

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
                    {/* fb link content */}
                    {messageContent.typeData === 'link' ? 
                        <a  href={messageContent.link}>
                            <FontAwesomeIcon icon={faFacebookSquare} />
                            {messageContent.link}
                        </a>
                    : <></>
                    }

                    {/* Send file pdf content */}
                    {messageContent.typeData === 'file' ? 
                        <a  href="#" 
                            onClick={(e) => { handleClickFile(e)}}>
                            <FontAwesomeIcon icon={faFilePdf} />
                            {messageContent.fileName}
                        </a>
                    : <></>}
                    

                    {/* Email content */}
                    {messageContent.typeData === 'email' ? 
                        <a onClick={() => { copyEmailLink(messageContent.email)}}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            {messageContent.email}
                        </a>
                    : <></>
                    }
                    
                    {/* Image Content */}
                    {messageContent.typeData === 'image' ? <Image imgKey={messageContent.imageName}/> : ''}

                    {/* Map content intents */}
                    {messageContent.typeData === "map" ? <MapGoogle /> : null}
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Message;