const Tower = (props) => {
    const tower = props.tower
    const size = props.size
    const img = require(`./images/${tower.img}.png`)

    const upgrade = (label) => {
        props.newTowers.push({index: props.index, label})
    }

    const upgrades = () => {
        if(tower.upgrades) {
            return <div className="upgrades" style={{height: `${size}px`, width: `${size * 3}px`, top: `${-size}px`, left: `${-size}px`}}>
                {tower.upgrades.map(e=> {return <div className="upgrade" key={e.name} onClick={()=>{upgrade(e.label)}}>
                    <div>{e.name}</div>
                    <div>{'$'}{e.cost}</div>
                </div>})}
            </div>
        }
    }

    const sell = () => {
        return <div className="sellWraper" style={{height: `${size}px`, width: `${size}px`}}>
            <div className="sell" onClick={()=>{props.towersToSell.push(props.index)}}>$</div>
        </div>
    }

    const range = () => {
        return <div className="range" style={{height: `${size * (tower.range + 2)}px`, width: `${size * (tower.range + 2)}px`,
        top: `${(-size * (tower.range + 1)) / 2}px`, left: `${(-size * (tower.range + 1)) / 2}px`}}/>
    }

    return <div className="tower">
        {range()}
        {upgrades()}
        <img src={img} className='tower' alt={tower.name} style={{height: `${size}px`, width: `${size}px`}} />
        {sell()}
    </div>
}

export default Tower