const Tower = (props) => {
    const tower = props.tower
    const size = props.size
    const img = require(`./images/${tower.img}.png`)
    const rangeImg = require(`./images/ranges/range${tower.range}.png`)

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
        return <img src={rangeImg} alt='range' className="range"
        style={{width: `${7*size}px`, height: `${7*size}px`, left: `${-3*size}px`, top: `${-3*size}px`}}/>
    }

    return <div className="tower">
        {range()}
        {upgrades()}
        <img src={img} className='tower' alt={tower.name} style={{height: `${size}px`, width: `${size}px`}} />
        {sell()}
    </div>
}

export default Tower