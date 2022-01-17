import { v4 as uuidv4 } from 'uuid';
import Enemy from './Enemy'

const Map = (props) => {
    const width = props.map.width
    const size = 800/width
    const map = props.map.map

    const tile = (index) => {
        
        if(props.path.includes(index)) {
            if(props.enemies.map(e=>e.positionIndex).includes(index)) {
                return <div className="tile path" style={{height: `${size}px`, width: `${size}px`}} key={index}>
                {props.enemies.filter(e=> {return e.positionIndex === index ? true : false}).map(e=>
                <div key={uuidv4().substring(0,8)}>
                    <Enemy enemy={e} path={props.path} mapWidth={width} animationTable={props.animationTable} tickSpeed={props.tickSpeed}/>
                </div>)}
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