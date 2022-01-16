import { useState, useEffect } from "react"
import Map from "./Map"

const Game = () => {
    const tickSpeed = 500
    const map = {width: 8, height: 8}
    const [hp, setHp] = useState(20)
    const livesLostThisRound = []
    const [currentWave, setCurrentWave] = useState(0)
    const [waveIndex, setWaveIndex] = useState(0)
    const [path, setPath] = useState([1,9,17,25,33,34,42,50,51,52,53,45,37,29,30,31])
    const [animationTable] = useState([])

    useEffect(()=>{
        const calculateDirection = (a,b) => {
            if(a + 1 === b) {return 'moveRight'}
            if(a - 1 === b) {return 'moveLeft'}
            if(a + map.width === b) {return 'moveDown'}
            if(a - map.width === b) {return 'moveUp'}
            return 'end'
        }

        for(let i = 0; i < path.length; i++) {
            if(calculateDirection(path[i],path[i+1]) !== 'end') { animationTable.push(calculateDirection(path[i],path[i+1])) }
            else { animationTable.push(animationTable.slice(-1)[0]) }
        }
    },[path, map.width])

    const loseLives = () => {
        if(livesLostThisRound.length > 0) {
            setHp(hp-livesLostThisRound.length)
        }
    }
    
    const goblin = {hp: 8, maxHp: 10, speed: 0.5, loss: 1, img: 'goblin'}
    const waves = [[[goblin],[],[goblin],[goblin],[],[goblin,goblin],[goblin],[],[],[goblin,goblin,goblin], [goblin], 'end']]
    const [enemies, setEnemies] = useState([])

    const moveEnemy = (enemy) => {
        if(enemy.position < (path.length-1) ) {
            return {...enemy, position: enemy.position + enemy.speed, positionIndex: path[Math.floor(enemy.position + enemy.speed)]}
        }
        livesLostThisRound.push(enemy.loss)
    }

    const handleTickEnemies = () => {
        const enemiesAfterMove = enemies.map(e => moveEnemy(e)).filter(e => e)

        const newEnemies = waves[currentWave][waveIndex]
        if(newEnemies !== 'end') {
            // console.log(newEnemies)
            const enemiesAfterSpawning = [...enemiesAfterMove, ...newEnemies.map(enemy => {return {...enemy, position: 0, positionIndex: path[0], offset: Math.random().toFixed(2)}})]
            setEnemies(enemiesAfterSpawning)
        }
        else {
            setEnemies(enemiesAfterMove)
        }
    }

    const handleTickWave = () => {
        if(waves[currentWave][waveIndex + 1] !== 'end') {
            setWaveIndex(waveIndex + 1)
        }
    }

    const tick = () => {
        console.log('tick')
        handleTickEnemies()
        loseLives()
        handleTickWave()
    }

    useEffect(()=>{
        const timer = setInterval(() => {
            tick()
        }, tickSpeed)
        return () => clearInterval(timer)
    })

    return (<div>
        <div>game</div>
        <div>Health: {hp}</div>
        <div>Wave: {currentWave}</div>
        <button onClick={()=>{setCurrentWave(currentWave + 1);console.log(enemies)}}>next wave</button>
        <Map width={map.width} height={map.height} enemies={enemies} path={path} animationTable={animationTable}/>
    </div>)
}

export default Game