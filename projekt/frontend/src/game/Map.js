import { v4 as uuidv4 } from 'uuid';
import Enemy from './Enemy'

const Map = (props) => {
    const width = props.map.width
    const size = 800/width
    const map = props.map.map

    const addTower = (index) => {
        props.newTowers.push({index: index, name: "archers"})
    }

    const tile = (index) => {
        
        if(props.path.includes(index)) {
            if(props.enemies.map(e=>e.positionIndex).includes(index)) {
                return <div className={`${props.pathBackgrounds[index]} path`} style={{height: `${size}px`, width: `${size}px`}} key={index}>
                {props.enemies.filter(e=> {return e.positionIndex === index ? true : false}).map(e=>
                <div key={uuidv4().substring(0,8)}>
                    <Enemy enemy={e} path={props.path} mapWidth={width} animationTable={props.animationTable} tickSpeed={props.tickSpeed}/>
                </div>
                )}
            </div>
            }
            return <div className={`${props.pathBackgrounds[index]} path`} style={{height: `${size}px`, width: `${size}px`}} key={index}>
                {index}
            </div>
        }

        if(props.towers.hasOwnProperty(index)) {
            return <div className='tile' style={{height: `${size}px`, width: `${size}px`}}>
                <div className="range" style={{height: `${size * (props.towers[index].range + 2)}px`, width: `${size * (props.towers[index].range + 2)}px`,
                top: `${(-size * (props.towers[index].range + 1)) / 2}px`, left: `${(-size * (props.towers[index].range + 1)) / 2}px`}}/>
                <img src={require(`./images/${props.towers[index].img}.png`)} className='tower' alt={props.towers[index].name} style={{height: `${size}px`, width: `${size}px`}} key={index}/>
            </div>
        }

        return <div className="tile" style={{height: `${size}px`, width: `${size}px`}} key={index}
        onClick={()=>{addTower(index)}}>
            {/* {index} */}
        </div>
    }

    return <div className="map">{map.map(i => tile(i))}</div>
}

export default Map