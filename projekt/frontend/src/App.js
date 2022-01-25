import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Game from './game/GameDataLodaer';
import Main from './ui/Main';
import Home from './ui/Home';
import Enemies from './ui/Enemies';
import Towers from './ui/towers/Towers';
import AddTower from './ui/towers/AddTower';

function App() {
  const [allEnemies, setAllEnemies] = useState([])
  const [allTowers, setAllTowers] = useState({})

  useEffect(()=>{
    axios.get('http://localhost:5000/towers')
    .then(res => {
      const result = res.data.reduce((pre,cur)=>{return {...pre, [cur.label]: cur}}, {})
      setAllTowers(result)
    })
    .catch(err => {
        window.alert("Threre was a problem with connecting to database (towers)")
        console.log(err)
    })
  },[])

  return (
    <Router>
      <Home />
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route exact path='/enemies'>
          <Enemies enemies={allEnemies}/>
        </Route>
        <Route exact path='/towers'>
          <Towers towers={allTowers}/>
        </Route>
        <Route exact path='/towers/add'>
          <AddTower allTowers={allTowers} setAllTowers={setAllTowers}/>
        </Route>
        <Route exact path='/level/:id'>
          <Game />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
