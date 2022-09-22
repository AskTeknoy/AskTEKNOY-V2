import io from 'socket.io-client'; 
import Main from './pages/Main';
import Chat from './pages/Chat';
import Navbar from './pages/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contacts from './pages/Contacts';

// connection to client - server 
const socket = io("http://localhost:4001", { transports: ["websocket"]}); 

function App() {
  return (
    <div>
      <BrowserRouter>
          <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/chatbot' element={<Chat socket={socket} onClick={() => window.location.reload()}/>}  refresh="true"/>
          <Route path='/contacts' element={<Contacts socket={socket}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
