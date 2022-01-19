import { useState, useEffect } from "react"
import Game from "./Game"

const GameDataLoader = () => {
    const [map, setMap] = useState({width: 8, height: 8, map: []})
    const [path, setPath] = useState([1,9,17,25,33,34,42,50,51,52,53,45,37,29,30,31])
    //const [path, setPath] = useState([3,11,10,18,26,27,28,20,21,22,30,38,46,45,53,52,51,43,42,50,58,57,49,48,40,32,33,25,24])
    //const [path, setPath] = useState([8,9,10,11,3])
    const [animationTable, setAnimationTable] = useState([])
    const [goblin] = useState({hp: 8, maxHp: 10, speed: 0.5, loss: 1, img: 'goblin'}) // speed = [0.1, 0.2, 0.25, 0.5, 1] ewantualnie 1/3
    const [waves, setWaves] = useState([[[goblin],[],[goblin],[goblin],[],[goblin,goblin],[goblin],[],[],[goblin,goblin,goblin], [goblin], 'end']])

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
    },[path, map])

    useEffect(()=>{
        const generatedMap = []
        for(let i = 0; i < map.width * map.height; i++) {
            generatedMap.push(i)
        }
        setMap({...map, map: generatedMap})
    },[])

    return <Game map={map} path={path} animationTable={animationTable} waves={waves}/>
}

export default GameDataLoader