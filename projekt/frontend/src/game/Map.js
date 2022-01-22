import { v4 as uuidv4 } from 'uuid';
import Enemy from './Enemy'
import Tower from './Tower';

const Map = (props) => {
    const width = props.map.width
    const size = 800/width
    const map = props.map.map
    const towers = props.startingTowers

    const addTower = (index, label) => {
        props.newTowers.push({index, label})
    }

    const showTowers = (index) => {
        return <div className='options' style={{minHeight: `${size}px`, width: `${size * 3}px`, top: `${-size/2}px`, left: `${-size}px`}}>
            {towers.map(e=><div className='option' key={e.label} onClick={()=>{addTower(index, e.label)}}>
                <div>{e.name}</div>
                <div>{'$'}{e.cost}</div>
            </div>)}
        </div>
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
            return <div className={`${props.pathBackgrounds[index]} path`} style={{height: `${size}px`, width: `${size}px`}} key={index} />
        }

        if(props.towers.hasOwnProperty(index)) {
            return <div className='tile' style={{height: `${size}px`, width: `${size}px`}} key={index}>
                <Tower tower={props.towers[index]} size={size} newTowers={props.newTowers} index={index} towersToSell={props.towersToSell}/>
            </div>
        }

        return <div className="tile" style={{height: `${size}px`, width: `${size}px`}} key={index}>
            {showTowers(index)}
        </div>
    }

    return <div className="map">{map.map(i => tile(i))}</div>
}

export default Map