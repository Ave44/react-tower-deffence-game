import coin from '../../game/images/coin.png'
import { useHistory } from "react-router-dom";

const Towers = (props) => {
    const history = useHistory()

    const towers = []
    for (const [key, value] of Object.entries(props.towers)) {
        towers.push({label: key, ...value})
    }

    return <div>
        <div className='title'>towers</div>
        <div onClick={()=>{history.push('towers/add')}} className='button'>add</div>
        <div className='list'>
            {towers.map(e=>{
                const img = require(`../../game/images/${e.img}.png`)
                return <div key={e.label} className='item'>
                    <img src={img} alt='' className='image'/>
                    <div className='title'>{e.name}</div>
                    <div>cost</div>
                    <div className='withImage'>
                        <div>{e.cost}</div>
                        <img src={coin} alt='$' className='small-image'/>
                    </div>
                    <div>damage</div>
                    <div>{e.mindamage}-{e.maxdamage}</div>
                    <div>{e.type}</div>
                    <div>range</div>
                    <div>{e.range}</div>
                    <div>turns to attack</div>
                    <div>{e.speed}</div>
                </div>})}
        </div>
    </div>
}

export default Towers