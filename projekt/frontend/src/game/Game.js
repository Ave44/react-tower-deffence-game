import { useState, useEffect } from "react"
import Map from "./Map"

const Game = () => {
    const [hp, setHp] = useState(5)
    const [wave, setWave] = useState(0)
    const path = [1,9,17,25,33,34,42,50,51,52,53,45,37,29,30,31]

    const loseLives = (lives) => {
        setHp(hp-lives)
        console.log("Lost ", lives, "HP")
    }

    const enemy = {hp: 10, speed: 0.5, loss: 1, image: "<|°_°|>"}
    const [enemies, setEnemies] = useState([{...enemy, position: 0, positionIndex: path[0]}])

    const spawnEnemy = (enemy) => {
        setEnemies([...enemies, {...enemy, position: 0, positionIndex: path[0]}])
    }

    const moveEnemy = (enemy) => {
        if(enemy.position < (path.length-1) ) {
            return {...enemy, position: enemy.position + enemy.speed, positionIndex: path[Math.floor(enemy.position + enemy.speed)]}
        }
        loseLives(enemy.loss)
    }

    const tick = () => {
        console.log("tick")
        setEnemies(enemies.map(e => moveEnemy(e)).filter(e => e))
    }

    useEffect(()=>{
        const timer = setInterval(() => {
            tick()
        }, 500)
        return () => clearInterval(timer)
    })

    return (<div>
        <div>game</div>
        <div>Health: {hp}</div>
        <div>Wave: {wave}</div>
        <button onClick={()=>{setWave(wave + 1)}}>next wave</button>
        <Map loseLives={loseLives} width={8} height={8} enemies={enemies} path={path}/>
    </div>)
}

export default Game