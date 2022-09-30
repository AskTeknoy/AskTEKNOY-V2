import React from 'react'
import  LibraryImages  from './LibraryImages.js';

import '../styles/Image.css'; 

const Image = ({imgKey}) => {
  console.log(imgKey);

  return (
    <div>
        
        {/* image content message */}                
        <img 
            class="imageLoc" 
            style={{width: 180, height: "auto", borderRadius: 10, marginBottom: 5}} 
            // src={`../../public/image_location/${messageContent.imageName}.jpg`}
            src={LibraryImages[imgKey] || 'data:image/gif;base64,R0lGODlhAQABAAAQABAAA='}
            onError= {e => e.target.style.display = 'none'}
            // alt={messageContent.imageName}
            alt='cas building'
        />
    </div>
  )
}

export default Image