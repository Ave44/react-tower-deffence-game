const Enemy = (props) => {
    const enemy = props.enemy

    const calculateXOffset = (offset) => {// min -40 max 40px
        const result = parseInt(offset*100) <= 50 ? -parseInt(offset*100) + 10 : parseInt(offset*100) - 60
        return result
    }

    const calculateYOffset = (offset) => {// min -10px max 60px
        const result = parseInt(offset*70) - 10
        return result
    }

    const displayHp = () => {
        if(enemy.hp !== enemy.maxHp) {
            const percentageOfLostHp = enemy.hp/enemy.maxHp
            const hpWidth = parseInt(30 * percentageOfLostHp)
            const lostHpWidth = 30 - hpWidth
            return <div className="hpBar"><div style={{backgroundColor: "green", height: '3px', width: `${hpWidth}px`}}/><div style={{backgroundColor: "gray", height: '3px', width: `${lostHpWidth}px`}}/></div>
        }
    }

    return <div className="enemy" style={{position: "relative", left: `${calculateXOffset(enemy.xOffset)}px`, top: `${calculateYOffset(enemy.yOffset)}px`, zIndex: `${enemy.yOffset*100}`}}>
        {displayHp()}
        <img src={require(`./images/${enemy.img}.png`)} alt={props.img} style={{width: '50px'}}/>
    </div>
}

export default Enemy