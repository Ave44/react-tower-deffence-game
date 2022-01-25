import { useHistory } from "react-router-dom";

const Main = () => {
    const history = useHistory()

    return <div className="main">
        main
        <div onClick={()=>{history.push('enemies')}} className="button">Enemies</div>
        <div onClick={()=>{history.push('towers')}} className="button">Towers</div>
        <div onClick={()=>{history.push('levels')}} className="button">Levels</div>
    </div>
}

export default Main