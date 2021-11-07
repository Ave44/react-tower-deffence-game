import './App.css';
import axios from 'axios';

function App() {

  function handleClick() {
    axios.get('http://localhost:5000/games')
    .then(response => console.log(response.data))
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <div>start game</div>
      <button onClick={() => {handleClick()}}>get</button>
    </div>
  );
}

export default App;
