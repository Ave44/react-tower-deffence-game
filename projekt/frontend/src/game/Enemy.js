const Enemy = (props) => {
    const enemy = props.enemy
    const tickSpeed = props.tickSpeed
    const animation = props.animationTable[Math.floor(enemy.position)]

    const calculateOffset = () => {

        const offset = parseInt(enemy.position * 100) % 100
// console.log(parseInt(enemy.position * 100), offset, enemy.animationProgres)
        if(animation === "moveRight") { return {top: 25, left: 0 + offset } }
        if(animation === "moveLeft") { return {top: 25, left: 100 - offset } }
        if(animation === "moveUp") { return {top: 75 - offset, left: 50} }
        if(animation === "moveDown") { return {top: -25 + offset, left: 50} }

        if(animation === "moveDownRight") { return {top: -25 + offset / 2, left: 50 + offset / 2 } }
        if(animation === "moveDownLeft") { return {top: -25 + offset * enemy.speed, left: 50 - offset / 2} }

        if(animation === "moveUpRight") { return {top: 75 - offset / 2, left: 50 + offset / 2} }
        if(animation === "moveUpLeft") { return {top: 75 - offset / 2, left: 50 - offset / 2} }

        if(animation === "moveRightDown") { return {top: 25 + offset / 2, left: 0 + offset / 2} }
        if(animation === "moveRightUp") { return {top: 25 - offset / 2, left: 0 + offset / 2} }

        if(animation === "moveLeftDown") { return {top: 25 + offset / 2, left: 100 - offset / 2} }
        if(animation === "moveLeftUp") { return {top: 25 - offset / 2, left: 100 - offset / 2} }

        return {top:0,left:0}
    }

    const offset = calculateOffset()

    const displayHp = () => {
        if(enemy.hp !== enemy.maxHp) {
            const percentageOfLostHp = enemy.hp/enemy.maxHp
            const hpWidth = parseInt(30 * percentageOfLostHp)
            const lostHpWidth = 30 - hpWidth
            return <div className="hpBar"><div style={{backgroundColor: "green", height: '3px', width: `${hpWidth}px`}}/>
                <div style={{backgroundColor: "gray", height: '3px', width: `${lostHpWidth}px`}}/>
            </div>
        }
    }

    return <div className="enemy" style={{position: "relative", zIndex: `${enemy.offset*100}`,
    top: `${offset.top}px`, left: `${offset.left}px`,
    animationName: `${animation}`, animationDuration: `${tickSpeed / enemy.speed}ms`
    }}>
        {displayHp()}
        <img src={require(`./images/${enemy.img}.png`)} alt={props.img} style={{width: '50px'}}/>
    </div>
}

export default Enemy