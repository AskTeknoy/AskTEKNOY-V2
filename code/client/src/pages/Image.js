import React from 'react'

const Image = ({imgPath}) => {
  console.log(imgPath);
  return (
    <div>
        
        {/* image content message */}                
        <img 
            id="imageLoc" 
            style={{width: 150, height: "auto" }} 
            // src={`../../public/image_location/${messageContent.imageName}.jpg`}
            src={imgPath || 'data:image/gif;base64,R0lGODlhAQABAAAQABAAA='}
            onError= {e => e.target.style.display = 'none'}
            // alt={messageContent.imageName}
            alt='cas building'
        />
    </div>
  )
}

export default Image