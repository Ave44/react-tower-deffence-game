import { useState, useEffect } from "react"
import { v4 as uuid } from 'uuid'
import Map from "./Map"

const Game = (props) => {
    const tickSpeed = 500
    const map = props.map
    const path = props.path
    const waves = props.waves
    const startingTowers = props.startingTowers
    const allTowers = props.allTowers
    const livesLostThisRound = []
    const newTowers = []
    const towersToSell = []

    const [gameData, setGameData] = useState({hp: 20, currentWave: 0, waveIndex: 0, enemies: {}, towers: {}})

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
        const enemiesAfterMove = {}
        for (const [key, value] of Object.entries(gameData.enemies)) {
            if(value.hp > 0) {
                const enemyAfterMove = moveEnemy(value)
                if(enemyAfterMove) { enemiesAfterMove[key] = enemyAfterMove }
            }
        }

        const newEnemies = waves[gameData.currentWave][gameData.waveIndex]
        if(newEnemies !== 'end') {
            const spawnedEnemies = {}
            for(let i = 0; i < newEnemies.length; i++) {
                spawnedEnemies[uuid().substring(0,4)] = {...newEnemies[i], position: 0, positionIndex: path[0], animationProgres: 0, offsetX: randomOffset(), offsetY: randomOffset()}
            }
            return {...enemiesAfterMove, ...spawnedEnemies}
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

    const createTower = (index, label) => {
        const tower = allTowers[label]
        const inRange = props.getRange(index, tower.range, map.width).filter(e=>path.includes(e))
        return {[index]: {...tower, inRange, initiative: 0} }
    }

    const handleTickTowers = () => {
        if(towersToSell.length !== 0) {
            for(let i = 0; i < towersToSell.length; i++) {
                delete gameData.towers[towersToSell[i]]
            }  
        }
        if(newTowers.length !== 0) {
            const newKeys = newTowers.reduce((pre,cur)=>{return {...pre, ...createTower(cur.index, cur.label)}}, {})
            return {...gameData.towers, ...newKeys}
        }
        for (const [key, value] of Object.entries(gameData.towers)) {
            if(value.initiative < value.speed) {
                gameData.towers[key] = {...value, initiative: value.initiative + 1}
            }
        }
        return gameData.towers
    }

    const dealDamage = (enemyId, tower) =>{
        const enemy = gameData.enemies[enemyId]
        const damage = Math.floor(Math.random() * (tower.maxDamage - tower.minDamage + 1) + tower.minDamage)
        if(tower.type === 'physical') {
            gameData.enemies[enemyId] = {...gameData.enemies[enemyId], hp: enemy.hp - Math.floor(damage*(1-enemy.armor))}
        }
        else if(tower.type === 'magical') {
            gameData.enemies[enemyId] = {...gameData.enemies[enemyId], hp: enemy.hp - Math.floor(damage*(1-enemy.magicResistance))}
        }
        else {
            gameData.enemies[enemyId] = {...gameData.enemies[enemyId], hp: enemy.hp - damage}
        }
    }

    const handleAttacks = () => {
        const enemiesOnPath = []
        for (const [key, value] of Object.entries(gameData.enemies)) {
            enemiesOnPath.push({id: key, position: value.position, index: value.positionIndex})
        }
        const sorted = enemiesOnPath.sort((a,b)=>{return a.position - b.position})
        for (const [key, value] of Object.entries(gameData.towers)) {
            if(value.initiative === value.speed) {
                const enemiesInRange = sorted.filter(e=>value.inRange.includes(e.index))
                if(enemiesInRange.length > 0) {
                    const attackedEnemy = enemiesInRange[enemiesInRange.length - 1]
                    dealDamage(attackedEnemy.id,gameData.towers[key])
                    gameData.towers[key].initiative = 0
                }
            }
        }
    }

    const tick = () => {
        console.log('----------tick----------')
        handleAttacks()
        setGameData({...gameData, towers: handleTickTowers(), waveIndex: handleTickWave(), enemies: handleTickEnemies(), hp: loseLives()})
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
        <Map map={map} enemies={gameData.enemies} path={path} pathBackgrounds={props.pathBackgrounds} animationTable={props.animationTable} tickSpeed={tickSpeed}
        newTowers={newTowers} towersToSell={towersToSell} towers={gameData.towers} startingTowers={startingTowers}/>
    </div>)
}

export default Game