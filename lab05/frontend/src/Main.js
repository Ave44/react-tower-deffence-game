import axios from 'axios';
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function Main() {

    const history = useHistory()

    function handleClick() {
        const id = uuidv4()
        history.push("/123")
        axios.post('http://localhost:5000/games', {key: id})
        .then(response => {
          history.push(`/${id}`)
          console.log("Game initialiazed!")
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="corners">
            <button onClick={() => {handleClick()}} className="button">
            <div className="border">start game</div>
            </button>
        </div>
    )
}

export default Main