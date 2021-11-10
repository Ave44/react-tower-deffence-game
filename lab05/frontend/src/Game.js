import axios from 'axios';
import { useParams } from "react-router-dom";
import { useState ,useEffect } from "react";

function Game() {

    const gameId = useParams().gameId
    const [board, setBoard] = useState('01 02 03 04 05 06 07 08 09')

    useEffect(() => {
        axios.get(`http://localhost:5000/games/${gameId}`)
            .then(response => {
              console.log("initial board:", response.data)
              setBoard(response.data.game)
            })
            .catch(err => console.log(err))
    }, [gameId])

    function newBoard(index, symbol) {
        if(index !== '9') {
            return board.slice(0, index*3-3)+symbol+index+" "+board.slice(index*3)
        }
        return board.slice(0, index*3-3)+symbol+index
    }

    function handleClick(index) {
        const game = newBoard(index, 'x')
        axios.post(`http://localhost:5000/games/${gameId}`, {game})
        .then(response => {
          console.log(response.data)
          setBoard(response.data.game)
        })
        .catch(err => console.log(err))
    }

    function draw(board) {
        console.log(board, "draw")
        if (board !== null && board !== undefined) {
            return board.split(" ").map(i => {return match(i)})
        }
        return "Your game have expired or had never existed!"
    }

    function match(item) {   
        if( item[0] === 'x' ) {
            return <div className="field" key={item[1]}>X</div>
        }
        if( item[0] === 'o' ) {
            return <div className="field" key={item[1]}>O</div>
        }
        return (
            <div className="corners" key={item[1]}>
                <button className="small_button" onClick={() => {handleClick(item[1])}}></button>
            </div>
        )}

    return (
        <div className="board">
            {draw(board)}
        </div>
    )
}

export default Game