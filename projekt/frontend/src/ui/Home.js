import { useHistory } from "react-router-dom";

const Home = () => {
    const history = useHistory()

    return <div onClick={()=>{history.push('/')}} className="button">Home</div>
}

export default Home