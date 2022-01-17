import { useState, useEffect } from "react"
import Map from "./Map"

const Game = (props) => {
    // console.log("main") 
    const tickSpeed = 500
    const map = props.map
    const [hp, setHp] = useState(20)
    const livesLostThisRound = []
    const [currentWave, setCurrentWave] = useState(0)
    const [waveIndex, setWaveIndex] = useState(0)
    const path = props.path

    const loseLives = () => {
        if(livesLostThisRound.length > 0) {
            setHp(hp-livesLostThisRound.length)
        }
    }
   
    const waves = props.waves
    const [enemies, setEnemies] = useState([])

    const moveEnemy = (enemy) => {
        if(enemy.position < (path.length-1) ) {
            return {...enemy, position: enemy.position + enemy.speed, positionIndex: path[Math.floor(enemy.position + enemy.speed)], animationProgres: (enemy.animationProgres + enemy.speed) % 1}
        }
        livesLostThisRound.push(enemy.loss)
    }

    const handleTickEnemies = () => {
        const enemiesAfterMove = enemies.map(e => moveEnemy(e)).filter(e => e)

        const newEnemies = waves[currentWave][waveIndex]
        if(newEnemies !== 'end') {
            const enemiesAfterSpawning = [...enemiesAfterMove, ...newEnemies.map(enemy => {
                return {...enemy, position: 0, positionIndex: path[0], animationProgres: 0, offsetX: Math.random().toFixed(2)}})]
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
        // console.log('----------tick----------')
        handleTickEnemies()
        loseLives() // powoduje ponowne wygenerowanie komponentu
        handleTickWave()
    }

    useEffect(()=>{
        const timer = setInterval(() => {
            tick()
        }, tickSpeed)
        return () => clearInterval(timer)
    })

    return (<div>
        <div>Health: {hp}</div>
        <div>Wave: {currentWave}</div>
        <button onClick={()=>{setCurrentWave(currentWave + 1);console.log(enemies)}}>next wave</button>
        <Map map={map} enemies={enemies} path={path} animationTable={props.animationTable} tickSpeed={tickSpeed}/>
    </div>)
}

export default Game