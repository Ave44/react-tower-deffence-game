import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from './Main';
import Game from './Game';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/:gameId">
          <Game />
        </Route>
      </Switch>
    </Router>
    
  );
}

export default App;
