import React from 'react'
import '../styles/About.css';

const About = () => {
  return (
    <div>
        <div className="about-title">
            <h2>About Us</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima tempora dolorum at consequatur!</p>
        </div>

         <div className='about-container'>  
            <div className="profiles">
                <div className='container'>
                    <img className='profile-pic' src={require("./images/team_profiles/darius.jpg")} alt="Kim Darius Panis" />

                    <div className='overlay overlay-fade'>
                        <a href="https://github.com/WhooperDar"><img className='logo-social' src={require(`../pages/images/logo/github.png`)} alt="github" /></a>
                        <a href="https://www.facebook.com/whooperdrs/"><img className='logo-social' src={require(`../pages/images/logo/fb-logo.png`)} alt="github" /></a>
                        <a href="https://www.instagram.com/whopperdars/"><img className='logo-social' src={require(`../pages/images/logo/insta.png`)} alt="github" /></a>
                        
                        
                    </div>

                    <h2 className='title'>Kim Darius Panis</h2>
                    <p className='role'>Lead Developer</p>
                </div>

                <div className='container'>
                    <img className='profile-pic' src={require("./images/team_profiles/khyle.jpg")} alt="Khyle Cardosa" />
                   
                    <div className='overlay overlay-fade'>
                        <a href="https://github.com/kvcards26"><img className='logo-social' src={require(`../pages/images/logo/github.png`)} alt="github" /></a>
                        <a href="https://www.facebook.com/kvcards26"><img className='logo-social' src={require(`../pages/images/logo/fb-logo.png`)} alt="github" /></a>
                    </div>

                    <h2 className='title'>Khyle Cardosa</h2>
                    <p className='role'>UI/UX Designer</p>
                </div>

                <div className='container'>
                    <img className='profile-pic' src={require("./images/team_profiles/jessa.jpg")} alt="Jessa Macapagong" />

                    <div className='overlay overlay-fade'>
                        <a href="https://github.com/jmacapagong"><img className='logo-social' src={require(`../pages/images/logo/github.png`)} alt="github" /></a>
                        <a href="https://www.facebook.com/jmacapagong"><img className='logo-social' src={require(`../pages/images/logo/fb-logo.png`)} alt="github" /></a>
                        <a href="https://www.instagram.com/jessa0015/"><img className='logo-social' src={require(`../pages/images/logo/insta.png`)} alt="github" /></a>

                        
                    </div>

                    <h2 className='title'>Jessa Macapagong</h2>
                    <p className='role'>Scrum Master</p>
                </div>
                
                <div className='container'>
                    <img className='profile-pic' src={require("./images/team_profiles/rheaynne.jpg")} alt="Rheaynne Ray Eduyan" />
                    

                    <div className='overlay overlay-fade'>
                        <a href="https://github.com/rheaynne"><img className='logo-social' src={require(`../pages/images/logo/github.png`)} alt="github" /></a>
                        <a href="https://www.facebook.com/rheaynneeduyan"><img className='logo-social' src={require(`../pages/images/logo/fb-logo.png`)} alt="github" /></a>
                        <a href="https://www.instagram.com/rheaynne/"><img className='logo-social' src={require(`../pages/images/logo/insta.png`)} alt="github" /></a>
                        
                    </div>
                    <h2 className='title'>Rheaynne Ray Eduyan</h2>
                    <p className='role'>Product Owner</p>
                </div>
                
                <div className='container'>
                     <img  className='profile-pic' src={require("./images/team_profiles/stefan.jpg")} alt="Stefan James Tudtud" />
                
                    <div className='overlay overlay-fade'>
                        <a href="https://github.com/jamestudtud13"><img className='logo-social' src={require(`../pages/images/logo/github.png`)} alt="github" /></a>
                        <a href="https://www.facebook.com/stefanjames.tud2d"><img className='logo-social' src={require(`../pages/images/logo/fb-logo.png`)} alt="github" /></a>                        
                        
                    </div>
                    <h2 className='title'>Stefan James Tudtud</h2>
                    <p className='role'>Product Owner</p>
                </div>
            </div>
        
        </div>
    </div>
   
  )
}

export default About