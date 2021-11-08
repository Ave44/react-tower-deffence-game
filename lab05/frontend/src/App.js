import './App.css';
// import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

  // function handleClick() {
  //   axios.get('http://localhost:5000/games')
  //   .then(response => console.log(response.data))
  //   .catch(err => console.log(err))
  // }

  return (
    <Router>
      <Switch>
        <Route path="/">
          <div className="App">
            <div className="corners">
              <button>
                <div className="border">start game</div>
              </button>
            </div>
            {/* <button onClick={() => {handleClick()}}>get</button> */}
          </div>
        </Route>
      </Switch>
    </Router>
    
  );
}

export default App;
