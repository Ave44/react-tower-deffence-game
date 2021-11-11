import axios from 'axios';
import { useParams, useHistory } from "react-router-dom";
import { useState ,useEffect } from "react";

function Game() {

    const gameId = useParams().gameId
    const history = useHistory()
    const [board, setBoard] = useState('01 02 03 04 05 06 07 08 09')
    const [finish, setFinish] = useState(false)
    const [communicat, setCommunicat] = useState(null)
    const [movesHistory, setMovesHistory] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/games/${gameId}`)
            .then(response => {
              console.log("initial board:", response.data)
              setBoard(response.data.game)
              if(response.data.game !== null) {
                  if(response.data.game.includes('0') === false) {
                  setFinish(true)
                  setCommunicat("This game is already finished!")
              }} 
            })
            .catch(err => console.log(err))
    }, [gameId])

    function newBoard(board, index, symbol) {
        if(index !== '9') {
            return board.slice(0, index*3-3)+symbol+index+" "+board.slice(index*3)
        }
        return board.slice(0, index*3-3)+symbol+index
    }

    function victory(symbol, board) {
        setFinish(true)
        if(symbol === "x") {
            // alert("Glorious Succes!");
            setCommunicat("Glorious Succes!")
        }
        else {
            // alert("Game Over !");
            setCommunicat("Game Over !")
        }
        const game = board.split(" ").map(el => {return(el[0] === '0' ? ("."+el[1]) : el)} ).join(" ")
        axios.post(`http://localhost:5000/games/${gameId}`, {game})
            .then(response => {
            console.log("final board", response.data)
            setBoard(response.data.game)
            })
            .catch(err => console.log(err))
    }

    function checkForVictory(board) {
        const arr = board.split(" ").map(el => el[0])
        // horizontall
        if(arr[0] === arr[1] && arr[0] === arr[2] && arr[0] !== '0') {
            victory(arr[0], board)
            return true
        }
        if(arr[3] === arr[4] && arr[3] === arr[5] && arr[3] !== '0') {
            victory(arr[3], board)
            return true
        }
        if(arr[6] === arr[7] && arr[6] === arr[8] && arr[6] !== '0') {
            victory(arr[6], board)
            return true
        }
        // vertical
        if(arr[0] === arr[3] && arr[0] === arr[6] && arr[0] !== '0') {
            victory(arr[0], board)
            return true
        }
        if(arr[1] === arr[4] && arr[1] === arr[7] && arr[1] !== '0') {
            victory(arr[1], board)
            return true
        }
        if(arr[2] === arr[5] && arr[2] === arr[8] && arr[2] !== '0') {
            victory(arr[2], board)
            return true
        }
        // diagonal
        if(arr[0] === arr[4] && arr[0] === arr[8] && arr[0] !== '0') {
            victory(arr[0], board)
            return true
        }
        if(arr[2] === arr[4] && arr[2] === arr[6] && arr[2] !== '0') {
            victory(arr[2], board)
            return true
        }
        if(arr.includes("0") === false) {
            // alert("Tie!");
            setFinish(true)
            setCommunicat("Tie!");
            return true
        }
        return false
    }

    function aiMove(board, previousMove) {
        const moves = board.split(" ").filter(el => {return el[0] === '0' ? true : false})
        const index = Math.floor(Math.random() * moves.length)
        if(moves.length !== 0) {
            const game = newBoard(board, moves[index][1], 'o')
            axios.post(`http://localhost:5000/games/${gameId}`, {game})
            .then(response => {
            console.log("Ai move", response.data)
            setBoard(response.data.game)
            setMovesHistory([...movesHistory, previousMove, moves[index][1]])
            checkForVictory(response.data.game)
            })
            .catch(err => console.log(err))
        }
    }

    function handleClick(index) {
        const game = newBoard(board, index, 'x')
        axios.post(`http://localhost:5000/games/${gameId}`, {game})
        .then(response => {
          console.log("player move", response.data)
          setBoard(response.data.game)
          if (checkForVictory(response.data.game) === false) {
              aiMove(response.data.game, index)
          }
        })
        .catch(err => console.log(err))
    }

    function draw(board) {
        // console.log("draw:", board)
        if (board !== null && board !== undefined) {
            return board.split(" ").map(i => {return match(i)})
        }
        return <div>Your game have expired or had never existed!</div>
    }

    function match(item) {   
        if( item[0] === 'x' ) {
            return <div className="field" key={item[1]}>X</div>
        }
        if( item[0] === 'o' ) {
            return <div className="field" key={item[1]}>O</div>
        }
        if( item[0] === '.' ) {
            return <div className="field" key={item[1]}></div>
        }
        return (
            <div className="corners" key={item[1]}>
                <button className="small_button" onClick={() => {handleClick(item[1])}}></button>
            </div>
        )}

    function undo() {
        if(movesHistory.length !== 0) {
            const game = newBoard(board, movesHistory.at(-1), '0')
            const game2 = newBoard(game, movesHistory.at(-2), '0')
            setMovesHistory(movesHistory.slice(0,-2))
            axios.post(`http://localhost:5000/games/${gameId}`, {game: game2})
            .then(response => {
            console.log("undo", response.data)
            setBoard(response.data.game)
            })
            .catch(err => console.log(err))
        }
    }

    function buttonUnder(finish) {
        if(finish) {
            return (
                <div className="corners under">
                    <button className='button' onClick={() => {history.push('/')}}>Replay?</button>
                </div>
        )}
        else {
            return (
                <div className="corners under">
                    <button className='button' onClick={() => {undo()}}>Undo</button>
                </div>
        )}}

    function finishCommunicat(finish, communicat) {
        if(finish) {
            return (
                <div className="above">{communicat}</div>
            )
        }
    }

    return (
        <div className='game'>
            <div className="zeroHeight">{finishCommunicat(finish, communicat)}</div>
            <div className="board">{draw(board)}</div>
            <div className="zeroHeight">{buttonUnder(finish)}</div>
        </div>
    )
}

export default Game