import React from 'react'; 
import { Link } from 'react-router-dom'; 
import './Home.css'; 

const Home = () => {
  return (
    <div>
        <div className="navbar">
            
        </div>
        <div className='body-homepage'>
            <div className='container homepage'>
                <Link to='/'>Home</Link>
            </div>
            <div className='container features'>
                <Link to='/features'>Features</Link>
            </div>
            <div className='container use-bot'>
                <Link to='/chatbot'>Use Bot</Link>
            </div>
            <div className='container how-use'>
                <Link to='/how-to-use'>How To Use</Link>
            </div>
            <div className='container about'>
                <Link to='/about'>About</Link>
            </div>
        </div>

        <div className="footer">

        </div>
        
    </div>
  )
}

export default Home