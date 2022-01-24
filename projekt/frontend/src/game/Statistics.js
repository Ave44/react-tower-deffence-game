import heart from './images/heart.png'
import coin from './images/coin.png';

const Statistics = (props) => {

    return <div className='statistics'>
        <div>Hp {props.hp} <img src={heart} alt='♡' className="image"/></div>
        <div>Gold {props.gold} <img src={coin} alt='coin' className="image"/></div>
        <div>Wave {props.wave}</div>
        <button onClick={()=>{props.nextWave()}}>next wave</button>
    </div>
}

export default Statistics