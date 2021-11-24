import './App.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { io } from 'socket.io';

function App() {
  
  const [pokoje, setPokoje] = useState([])
  io.on('connection', client => {console.log('connected')})

  function handleClick() {
    setPokoje([...pokoje, uuidv4().substring(0,4)])
  }

  return (
    <div>
      <div>{pokoje.map(el => {return <div key={el}>{el}</div>})}</div>
      <button onClick={() => {handleClick()}}>new room</button>
    </div>
  );
}

export default App;
