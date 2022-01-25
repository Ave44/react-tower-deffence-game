import { useState, useEffect } from "react"
import Game from "./Game"

const GameDataLoader = (props) => {

    const [allTowers, setAllTowers] = useState(props.towers)
    const [allEnemies, setAllEnemies] = useState({})
    const [level, setLevel] = useState({})
    const [levelData, setLevelData] = useState({width: 0, height: 0, map: [], path: [], pathBackgrounds: {}, animationTable: [], waves: [], startingTowers: [], gold: 10})

    useEffect(()=> {
        setAllTowers(props.towers)
        setAllEnemies({goblin: {hp: 10, maxHp: 10, speed: 0.5, loss: 1, img: 'goblin', armor: 0, magicResistance: 0, gold: 5}}) // speed = [0.1, 0.2, 0.25, 0.5, 1] ewantualnie 1/3

        const goblin = {hp: 10, maxHp: 10, speed: 0.5, loss: 1, img: 'goblin', armor: 0, magicResistance: 0, gold: 5}
        const waves = [[[]], [[goblin],[],[goblin],[goblin],[],[goblin,goblin],[goblin],[],[],[goblin,goblin,goblin], [goblin], []],[[goblin], []]]
        const path = [1,9,17,25,33,34,42,50,51,52,53,45,37,29,30,31]
        const startingTowers = ["archers", 'peasants', 'mage']
        setLevel({width: 8, height: 8, path: path, startingTowers, waves: waves, gold: 220})
    },[props])

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

    return <Game level={levelData} allTowers={allTowers} getRange={getRange} />
}

export default GameDataLoader