import './App.css';
import io from 'socket.io-client'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import Chat from './Chat';
import About from './About'; 
import Home from './Home'; 
import HowToUse from './HowToUse'; 
import Features from './Features'; 

const socket = io.connect('http://localhost:4001')

function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
         <Route exact path='/features'>
          <Features />
        </Route>
        <Route exact path='/about'>
          <About />
        </Route>
        <Route exact path='/how-to-use'>
          <HowToUse />
        </Route>
        <Route exact path='/chatbot'> 
          <Chat socket={socket}/>
        </Route>
      </Switch>
    </div>
    </Router>
    
  );
}

export default App;
