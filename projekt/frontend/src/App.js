import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Game from './game/GameDataLodaer';
import Main from './ui/Main';
import Topbar from './ui/Topbar';
import Enemies from './ui/enemies/Enemies';
import AddEnemy from './ui/enemies/AddEnemy';
import EditEnemy from './ui/enemies/EditEnemy';
import Towers from './ui/towers/Towers';
import AddTower from './ui/towers/AddTower';
import EditTower from './ui/towers/EditTower';
import Upgrades from './ui/towers/Upgrades';
import UpgradesAdd from './ui/towers/UpgradesAdd';
import UpgradeEdit from './ui/towers/UpgradeEdit';

function App() {
  const [allEnemies, setAllEnemies] = useState({})
  const [allTowers, setAllTowers] = useState({})
  const [upgrades, setUpgrades] = useState({})
  const [allTowersWithUpgrades, setAllTowersWithUpgrades] = useState({})

  useEffect(()=>{
    axios.get('http://localhost:5000/enemies')
    .then(res => {
      const result = res.data.reduce((pre,cur)=>{return {...pre, [cur.label]: cur}}, {})
      setAllEnemies(result)
    })
    .catch(err => {
        window.alert("Threre was a problem with connecting to database (towers)")
        console.log(err)
    })

    axios.get('http://localhost:5000/towers')
    .then(res => {
      const result = res.data.reduce((pre,cur)=>{return {...pre, [cur.label]: cur}}, {})
      setAllTowers(result)
    })
    .catch(err => {
        window.alert("Threre was a problem with connecting to database (towers)")
        console.log(err)
    })

    axios.get('http://localhost:5000/upgrades')
    .then(res => {
      const result = res.data.reduce((pre,cur)=>{
        if(pre[cur.label1]) {
          return {...pre, [cur.label1]: [...pre[cur.label1], {label: cur.label2, name: cur.name, cost: cur.cost, id: cur.id}] }
        }
        return {...pre, [cur.label1]: [ {label: cur.label2, name: cur.name, cost: cur.cost, id: cur.id}] }
        }, {})
      setUpgrades(result)
    })
    .catch(err => {
        window.alert("Threre was a problem with connecting to database (upgrades)")
        console.log(err)
    })
  },[])

  useEffect(()=>{
    const result = {}
    for (const [key, value] of Object.entries(allTowers)) {
      result[key] = {...value, upgrades: upgrades[key]}
    }
    setAllTowersWithUpgrades(result)
  },[allTowers, upgrades])

  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route exact path='/enemies'>
          <Enemies enemies={allEnemies}/>
        </Route>
        <Route exact path='/enemies/add'>
          <AddEnemy allEnemies={allEnemies} setAllEnemies={setAllEnemies}/>
        </Route>
        <Route exact path='/enemies/edit/:label'>
          <EditEnemy allEnemies={allEnemies} setAllEnemies={setAllEnemies}/>
        </Route>
        <Route exact path='/towers'>
          <Towers towers={allTowers}/>
        </Route>
        <Route exact path='/towers/add'>
          <AddTower allTowers={allTowers} setAllTowers={setAllTowers}/>
        </Route>
        <Route exact path='/towers/edit/:label'>
          <EditTower allTowers={allTowers} setAllTowers={setAllTowers}/>
        </Route>
        <Route exact path='/towers/upgrades/:label'>
          <Upgrades towers={allTowersWithUpgrades} upgrades={upgrades} setUpgrades={setUpgrades}/>
        </Route>
        <Route exact path='/towers/upgrades/:label/add'>
          <UpgradesAdd upgrades={upgrades} setUpgrades={setUpgrades}/>
        </Route>
        <Route exact path='/towers/upgrades/:label/edit/:id'>
          <UpgradeEdit upgrades={upgrades} setUpgrades={setUpgrades}/>
        </Route>
        <Route exact path='/level/:id'>
          <Game towers={allTowersWithUpgrades}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
