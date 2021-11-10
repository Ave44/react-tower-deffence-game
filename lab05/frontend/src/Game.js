import axios from 'axios';
import { useParams } from "react-router-dom";
import { useState ,useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

function Game() {

    const gameId = useParams().gameId
    const [board, setBoard] = useState('000000000')

    useEffect(() => {
        axios.get(`http://localhost:5000/games/${gameId}`)
            .then(response => {
              console.log(response.data)
              setBoard(response.data.game)
            })
            .catch(err => console.log(err))
    }, [gameId])

    function draw(board) {
        if (board !== null) {
            return board.split("").map(i => {return match(i)})
        }
        return "Your game have expired or had never existed!"
    }

    function match(item) {   
        if( item === 'x' ) {
            return field('x')
        }
        if( item === 'o' ) {
            return field('o')
        }
        return field('')
    }

    function field(type) {
        if(type === 'x') {
            return <div className="field" key={uuidv4()}>X</div>
        }
        if(type === 'o') {
            return <div className="field" key={uuidv4()}>O</div>
        }
        return <div className="corners"><button className="field" key={uuidv4()}>_</button></div>
    }

    return (
        <div className="board">
            {draw(board)}
        </div>
    )
}

export default Game