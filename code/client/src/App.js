import io from 'socket.io-client'; 
import Main from './pages/Main';
import Chat from './pages/Chat';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
import About from './pages/About';
import Contacts from './pages/Contacts';


import { BrowserRouter, Routes, Route } from 'react-router-dom';

// connection to client - server 
const socket = io("http://localhost:4001", { transports: ["websocket"]}); 

function App() {
  return (
    <div>
      <BrowserRouter>
          <Navbar />
        <Routes>
          <Route path='/' element={<Main socket={socket}/>} />
          <Route path='/chatbot' element={<Chat socket={socket} onClick={() => window.location.reload()}/>}  refresh="true"/>
          <Route path='/contacts' element={<Contacts socket={socket}/>}/>
          <Route path='about' element={<About />}/> 
        </Routes>
          <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
