import { useState, useEffect } from "react"
import Map from "./Map"

const Game = (props) => {
    const tickSpeed = 500
    const map = props.map
    const path = props.path
    const waves = props.waves
    const allTowers = props.allTowers
    
    const livesLostThisRound = []
    let newTowers = []

    const [gameData, setGameData] = useState({hp: 20, currentWave: 0, waveIndex: 0, enemies: [], towers: {}})

    const loseLives = () => {
        if(livesLostThisRound.length > 0) {
            return gameData.hp - livesLostThisRound.reduce((pre,cur) => {return pre + cur}, 0)
        }
        return gameData.hp
    }   

    const moveEnemy = (enemy) => {
        if(enemy.position < (path.length) ) {
            return {...enemy, position: enemy.position + enemy.speed, positionIndex: path[Math.floor(enemy.position + enemy.speed)], animationProgres: (enemy.animationProgres + enemy.speed) % 1}
        }
        livesLostThisRound.push(enemy.loss)
    }

    const randomOffset = () => {
        return Math.random().toFixed(2) * 50 - 25
    }

    const handleTickEnemies = () => {
        const enemiesAfterMove = gameData.enemies.map(e => moveEnemy(e)).filter(e => e)

        const newEnemies = waves[gameData.currentWave][gameData.waveIndex]
        if(newEnemies !== 'end') {
            const enemiesAfterSpawning = [...enemiesAfterMove, ...newEnemies.map(enemy => {
                return {...enemy, position: 0, positionIndex: path[0], animationProgres: 0, offsetX: randomOffset(), offsetY: randomOffset()}})]
            return enemiesAfterSpawning
        }
        else {
            return enemiesAfterMove
        }
    }

    const handleTickWave = () => {
        if(waves[gameData.currentWave][gameData.waveIndex + 1] !== 'end') {
            return gameData.waveIndex + 1
        }
        return gameData.waveIndex
    }

    const handleTickTowers = () => {
        if(newTowers.length !== 0) {
            const newKeys = newTowers.reduce((pre,cur)=>{return {...pre, [cur.index]: allTowers[cur.name]}}, {})
            return {...gameData.towers, ...newKeys}
        }
        return gameData.towers
    }

    const tick = () => {
        console.log('----------tick----------')
        setGameData({...gameData, waveIndex: handleTickWave(), enemies: handleTickEnemies(), hp: loseLives(), towers: handleTickTowers()})
        // ^ Kolejność jest ważna!
    }

    useEffect(()=>{
        const timer = setInterval(() => {
            tick()
        }, tickSpeed)
        return () => clearInterval(timer)
    })

    return (<div>
        <div>Health: {gameData.hp}</div>
        <div>Wave: {gameData.currentWave}</div>
        <button onClick={()=>{setGameData({...gameData, currentWave: gameData.currentWave + 1})}}>next wave</button>
        <Map map={map} enemies={gameData.enemies} path={path} pathBackgrounds={props.pathBackgrounds} animationTable={props.animationTable} tickSpeed={tickSpeed} newTowers={newTowers} towers={gameData.towers}/>
    </div>)
}

export default Game