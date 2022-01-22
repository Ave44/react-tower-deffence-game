import { useState, useEffect } from "react"
import Game from "./Game"

const GameDataLoader = () => {
    const [map, setMap] = useState({width: 8, height: 8, map: []})
    const [path, setPath] = useState([1,9,17,25,33,34,42,50,51,52,53,45,37,29,30,31])
    const [pathBackgrounds, setPathBackgrounds] = useState({})
    //const [path, setPath] = useState([3,11,10,18,26,27,28,20,21,22,30,38,46,45,53,52,51,43,42,50,58,57,49,48,40,32,33,25,24])
    //const [path, setPath] = useState([8,9,10,11,3])
    const [animationTable, setAnimationTable] = useState([])
    const [goblin] = useState({hp: 8, maxHp: 10, speed: 0.5, loss: 1, img: 'goblin'}) // speed = [0.1, 0.2, 0.25, 0.5, 1] ewantualnie 1/3
    const [waves, setWaves] = useState([[[goblin],[],[goblin],[goblin],[],[goblin,goblin],[goblin],[],[],[goblin,goblin,goblin], [goblin], 'end']])
    const [allTowers, setAllTowers] = useState({archers: {label: "archers", name: "Archers", img: "archers", range: 1, damage: 2, type: 'phisical',
        upgrades: [{label: 'forestArchers', name: 'Forest Archers', cost: 100}, {label: 'armyArchers', name: 'Army Archers', cost: 150}, {label: 'crosbow', name: 'Crosbow', cost: 120}]},
    forestArchers: {label: 'forestArchers', name: 'Forest Archers', img: 'forestArchers', range: 2, damage: 3, type: 'phisical'},
    armyArchers: {label: 'armyArchers', name: 'Army Archers', img: 'armyArchers', range: 1, damage: 8, type: 'phisical', upgrades: [{label: 'eliteArchers', name: 'Elite Archers', cost: 200}]},
    eliteArchers: {label: 'eliteArchers', name: 'Elite Archers', img: 'eliteArchers', range: 2, damage: 16, type: 'physical'},
    mage: {label: 'mage', name: 'Mage', img: 'mage', range: 1, damage: 6, type: 'magical'},
    peasants: {label: 'peasants', name: 'Peasants', img: 'peasants', range: 1, damage: 8, type: 'physical', cost: 60, upgrades: [{label: 'picinieres', name: 'Picinieres', cost: 100}]},
    picinieres: {label: 'picinieres', name: 'Picinieres', img: 'picinieres', range: 1, damage: 18, type: 'physical', cost: 120, upgrades: [{label: 'elitePicinieres', name: 'Elite Picinieres', cost: 250}]},
    elitePicinieres: {label: 'elitePicinieres', name: 'Elite Picinieres', img: 'elitePicinieres', range: 1, damage: 36, type: 'physical'}})
    const [startingTowers, setStartingTowers] = useState([{label: "archers", name: "Archers", img: "archers", range: 1, damage: 2, type: 'phisical', cost: 80,
    upgrades: [{label: 'forestArchers', name: 'Forest Archers', cost: 100}, {label: 'armyArchers', name: 'Army Archers', cost: 150}, {label: 'crosbow', name: 'Crosbow', cost: 120}]},
    {label: 'mage', name: 'Mage', img: 'mage', range: 1, damage: 6, type: 'magical', cost: 100},
    {label: 'peasants', name: 'Peasants', img: 'peasants', range: 1, damage: 8, type: 'physical', cost: 60},
    {label: 'forestArchers', name: 'Forest Archers', img: 'mage', range: 1, damage: 6, type: 'physical', cost: 320}])

    useEffect(()=>{
        const calculateDirection = (a,b) => {
            if(a + 1 === b) {return 'Right'}
            if(a - 1 === b) {return 'Left'}
            if(a + map.width === b) {return 'Down'}
            if(a - map.width === b) {return 'Up'}
            return 'end'
        }

        const directionsTable = []
        for(let i = 0; i < path.length; i++) {
            if(calculateDirection(path[i],path[i+1]) !== 'end') { directionsTable.push(calculateDirection(path[i],path[i+1])) }
            else { directionsTable.push(directionsTable.slice(-1)[0]) }
        }

        const finishedTable = []
        for(let i = 0; i < directionsTable.length; i++) {
            if(directionsTable[i-1]) {
                if(directionsTable[i] === directionsTable[i-1]) { finishedTable.push('move' + directionsTable[i]) }
                else { finishedTable.push('move' + directionsTable[i-1] + directionsTable[i]) }
            }
            else { finishedTable.push('move' + directionsTable[i]) }
        }
        
        setAnimationTable(finishedTable)
        
        const getDirection = (a) => {
            if(a === 'moveDown' || a === 'moveUp') { return "Horizontal" }
            if(a === 'moveRight' || a === 'moveLeft') { return "Vertical" }
            if(a === 'moveDownRight' || a === 'moveLeftUp') { return "Turn0" }
            if(a === 'moveUpRight' || a === 'moveLeftDown') { return "Turn90" }
            if(a === 'moveRightDown' || a === 'moveUpLeft') { return "Turn180" }
            if(a === 'moveDownLeft' || a === 'moveRightUp') { return "Turn270" }
            return null
        }

        const backgroundsTable = finishedTable.reduce((pre,cur, index)=>{ return {...pre, [path[index]]: getDirection(cur)} }, {})
        setPathBackgrounds(backgroundsTable)
    },[path, map])

    useEffect(()=>{
        const generatedMap = []
        for(let i = 0; i < map.width * map.height; i++) {
            generatedMap.push(i)
        }
        setMap({...map, map: generatedMap})
    },[])

    return <Game map={map} path={path} animationTable={animationTable} waves={waves} allTowers={allTowers} startingTowers={startingTowers} pathBackgrounds={pathBackgrounds}/>
}

export default GameDataLoader