const Map = (props) => {
    const width = props.width
    const height = props.height
    const size = 800/width

    const map = []

    for(let i = 0; i < width*height; i++) {
        map.push(i)
    }

    const tile = (index) => {
        
        if(props.path.includes(index)) {
            if(props.enemies.map(e=>e.positionIndex).includes(index)) {
                return <div className="tile path" style={{height: `${size}px`, width: `${size}px`}} key={index}>
                {props.enemies.filter(e=> {return e.positionIndex === index ? 1 : -1})[0].image}
            </div>
            }
            return <div className="tile path" style={{height: `${size}px`, width: `${size}px`}} key={index}>
                {index}
            </div>
        }

        return <div className="tile" style={{height: `${size}px`, width: `${size}px`}} key={index}>
            {index}
        </div>
    }

    return <div className="map">{map.map(i => tile(i))}</div>
}

export default Map