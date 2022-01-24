import { useState, useEffect } from "react"
import Game from "./Game"

const GameDataLoader = () => {

    const [allTowers, setAllTowers] = useState({})
    const [allEnemies, setAllEnemies] = useState({})
    const [level, setLevel] = useState({})
    const [levelData, setLevelData] = useState({width: 0, height: 0, map: [], path: [], pathBackgrounds: {}, animationTable: [], waves: [], startingTowers: []})

    // const [path, setPath] = useState([1,9,17,25,33,34,42,50,51,52,53,45,37,29,30,31])
    // const [path, setPath] = useState([3,11,10,18,26,27,28,20,21,22,30,38,46,45,53,52,51,43,42,50,58,57,49,48,40,32,33,25,24])
    // const [path, setPath] = useState([8,9,10,11,3])

    useEffect(()=> {
        setAllTowers({archers: {label: "archers", name: "Archers", img: "archers", range: 2, minDamage: 1, maxDamage: 4, type: 'physical', cost: 80, speed: 2,
            upgrades: [{label: 'forestArchers', name: 'Forest Archers', cost: 100}, {label: 'armyArchers', name: 'Army Archers', cost: 150}, {label: 'crosbow', name: 'Crosbow', cost: 120}]},
            forestArchers: {label: 'forestArchers', name: 'Forest Archers', img: 'forestArchers', range: 4, minDamage: 3, maxDamage: 5, type: 'physical', speed: 1},
            armyArchers: {label: 'armyArchers', name: 'Army Archers', img: 'armyArchers', range: 3, minDamage: 10, maxDamage: 12, type: 'physical', speed: 2, upgrades: [{label: 'eliteArchers', name: 'Elite Archers', cost: 200}]},
            eliteArchers: {label: 'eliteArchers', name: 'Elite Archers', img: 'eliteArchers', range: 5, minDamage: 16, maxDamage: 22, type: 'physical', speed: 1},
            mage: {label: 'mage', name: 'Mage', img: 'mage', range: 2, minDamage: 1, maxDamage: 22, type: 'magical', cost: 120, speed: 4},
            peasants: {label: 'peasants', name: 'Peasants', img: 'peasants', range: 1, minDamage: 3, maxDamage: 6, type: 'physical', cost: 60, speed: 2, upgrades: [{label: 'picinieres', name: 'Picinieres', cost: 100}]},
            picinieres: {label: 'picinieres', name: 'Picinieres', img: 'picinieres', range: 1, minDamage: 8, maxDamage: 16, type: 'physical', cost: 120, speed: 2, upgrades: [{label: 'elitePicinieres', name: 'Elite Picinieres', cost: 250}]},
            elitePicinieres: {label: 'elitePicinieres', name: 'Elite Picinieres', img: 'elitePicinieres', range: 2, minDamage: 30, maxDamage: 36, speed: 1, type: 'physical'}})

        setAllEnemies({goblin: {hp: 10, maxHp: 10, speed: 0.5, loss: 1, img: 'goblin', armor: 0, magicResistance: 0, gold: 5}}) // speed = [0.1, 0.2, 0.25, 0.5, 1] ewantualnie 1/3

        const goblin = {hp: 10, maxHp: 10, speed: 0.5, loss: 1, img: 'goblin', armor: 0, magicResistance: 0, gold: 5}
        const waves = [[[goblin],[],[goblin],[goblin],[],[goblin,goblin],[goblin],[],[],[goblin,goblin,goblin], [goblin], 'end']]
        const path = [1,9,17,25,33,34,42,50,51,52,53,45,37,29,30,31]
        const startingTowers = ["archers", 'peasants', 'mage']
        setLevel({width: 8, height: 8, path: path, startingTowers, waves: waves, gold: 120})
    },[])

    useEffect(()=> {
        if(Object.keys(level).length !== 0) {
            const generatedMap = []
            for(let i = 0; i < level.width * level.height; i++) {
                generatedMap.push(i)
            }

            const startingTowers = []
            for (const [key, value] of Object.entries(allTowers)) {
                if(level.startingTowers.includes(key)) {
                    startingTowers.push(value)
                }
            }

            const animationsAndBackgrounds = getAnimationsAndBackgrounds(level.width, level.path)
            
            setLevelData({...level, map: generatedMap, startingTowers, ...animationsAndBackgrounds})
        }
    }, [level, allTowers])  

    const getAnimationsAndBackgrounds = (width, path) => {
        const calculateDirection = (a,b) => {
            if(a + 1 === b) {return 'Right'}
            if(a - 1 === b) {return 'Left'}
            if(a + width === b) {return 'Down'}
            if(a - width === b) {return 'Up'}
            return 'end'
        }

        const directionsTable = []
        for(let i = 0; i < path.length; i++) {
            if(calculateDirection(path[i],path[i+1]) !== 'end') { directionsTable.push(calculateDirection(path[i],path[i+1])) }
            else { directionsTable.push(directionsTable.slice(-1)[0]) }
        }

        const animationTable = []
        for(let i = 0; i < directionsTable.length; i++) {
            if(directionsTable[i-1]) {
                if(directionsTable[i] === directionsTable[i-1]) { animationTable.push('move' + directionsTable[i]) }
                else { animationTable.push('move' + directionsTable[i-1] + directionsTable[i]) }
            }
            else { animationTable.push('move' + directionsTable[i]) }
        }  
        
        const getDirection = (a) => {
            if(a === 'moveDown' || a === 'moveUp') { return "Horizontal" }
            if(a === 'moveRight' || a === 'moveLeft') { return "Vertical" }
            if(a === 'moveDownRight' || a === 'moveLeftUp') { return "Turn0" }
            if(a === 'moveUpRight' || a === 'moveLeftDown') { return "Turn90" }
            if(a === 'moveRightDown' || a === 'moveUpLeft') { return "Turn180" }
            if(a === 'moveDownLeft' || a === 'moveRightUp') { return "Turn270" }
            return null
        }

        const pathBackgrounds = animationTable.reduce((pre,cur, index)=>{ return {...pre, [path[index]]: getDirection(cur)} }, {})
        return {animationTable, pathBackgrounds}
    }

    const getRange = (index, range, width) => {
        const result = [index]
        if(range > 0) {
            if(index%width-1 >= 0) { result.push(index-1) }
            if(index%width+1 < width) { result.push(index+1) }
            result.push(index-width, index+width)
        }
        if(range > 1) {
            if(index%width-1 >= 0) { result.push(index-width-1, index+width-1) }
            if(index%width+1 < width) { result.push(index-width+1, index+width+1) }
            
        }
        if(range > 2) {
            if(index%width-2 >= 0) { result.push(index-2) }
            if(index%width+2 < width) { result.push(index+2) }
            result.push(index-(2*width), index+(2*width))
        }
        if(range > 3) {
            if(index%width-1 >= 0) { result.push(index-(2*width)-1, index+(2*width)-1) }
            if(index%width+1 < width) { result.push(index-(2*width)+1, index+(2*width)+1) }
            if(index%width-2 >= 0) { result.push(index-width-2, index+width-2) }
            if(index%width+2 < width) { result.push(index-width+2, index+width+2) }
        }
        if(range > 4) {
            if(index%width-2 >= 0) { result.push(index-(2*width)-2, index+(2*width)-2) }
            if(index%width+2 < width) { result.push(index-(2*width)+2, index+(2*width)+2) }
        }
        if(range > 5) {
            if(index%width-1 >= 0) { result.push(index-(3*width)-1, index+(3*width)-1) }
            if(index%width+1 < width) { result.push(index-(3*width)+1, index+(3*width)+1) }
            if(index%width-3 >= 0) { result.push(index-width-3, index-3, index+width-3) }
            if(index%width+3 < width) { result.push(index-width+3, index+3, index+width+3) }
            result.push(index-(3*width), index+(3*width)) 
        }
        if(range > 6) {
            if(index%width-2 >= 0) { result.push(index-(3*width)-2, index+(3*width)-2) }
            if(index%width+2 < width) { result.push(index-(3*width)+2, index+(3*width)+2) }
            if(index%width-3 >= 0) { result.push(index-(3*width)-3, index-(2*width)-3, index+(2*width)-3, index+(3*width)-3) }
            if(index%width+3 < width) { result.push(index-(3*width)+3, index-(2*width)+3, index+(2*width)+3, index+(3*width)+3) }
        }
        return result.filter(e=>{ return e >= 0 ? true : false})
    }

    //const [gameData, setGameData] = useState({hp: 20, gold: 100, currentWave: 0, waveIndex: 0, enemies: {}, towers: {}})

    return <Game level={levelData} allTowers={allTowers} getRange={getRange} />//gameData={gameData} setGameData={setGameData}/>
}

export default GameDataLoader