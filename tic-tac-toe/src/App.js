import { useState } from "react"

function Square({value, squareClicked}) { 
  return (
    <button className="square" onClick={squareClicked}> {value} </button>
    
  )
}


function Board({ xNext, squares, onPlay }) {

  function gotClicked(s) {
    if (winCalc(squares) || squares[s]) {
      return
    } 

    const nearSquares = squares.slice()

    if (xNext) {
      nearSquares[s] = "X"
    } else {
      nearSquares[s] = "O"
    }
    onPlay(nearSquares)
  }

  const winner = winCalc(squares)
  let statistics

  if (winner) {
    statistics = "Winner: " + winner
  } else {
    statistics = "Next player: " + (xNext ? "X" : "O")
  }

  return (
    <>
      <div className="statistics">{statistics}</div>
      <div className="board-row">
        <Square value={squares[0]} squareClicked={() => gotClicked(0)}/>
        <Square value={squares[1]} squareClicked={() => gotClicked(1)}/>
        <Square value={squares[2]} squareClicked={() => gotClicked(2)}/>
      </div>

      <div className="board-row">
        <Square value={squares[3]} squareClicked={() => gotClicked(3)}/>
        <Square value={squares[4]} squareClicked={() => gotClicked(4)}/>
        <Square value={squares[5]} squareClicked={() => gotClicked(5)}/>
      </div>

      <div className="board-row">
        <Square value={squares[6]} squareClicked={() => gotClicked(6)}/>
        <Square value={squares[7]} squareClicked={() => gotClicked(7)}/>
        <Square value={squares[8]} squareClicked={() => gotClicked(8)}/>
      </div>
    </>
  )
}

export default function GameControl() {
  const [history, setHis] = useState([Array(9).fill(null)])
  const [presentMove, setPresentMove] = useState(0)
  const xNext = presentMove % 2 == 0
  const presentSquare = history[presentMove]

  function getPlay(nearSquares) {
    const Nexthistory = [...history.slice(0, presentMove + 1), nearSquares]
    setHis(Nexthistory)
    setPresentMove(Nexthistory.length - 1)
    
  }

  function skipTo(nextmove) {
    setPresentMove(nextmove)
    
  }

  const moving = history.map((squares, moving) => {
    let description

    if (moving > 0) {
      description = "Go to move #" + moving
    } else {
      description = "Go to game start"

    }

    return (
      <li key={moving}>
        <button onClick={() => skipTo(moving)}>{description}</button>
      </li>
    )
  })
  

  return (
    
    <div className="game">
      <div className="boardGame">
        <Board xNext={xNext} squares={presentSquare} onPlay={getPlay}/>

      </div>

      <div className="infogame">
        <ol>{ moving }</ol>

      </div>
    </div>
  )
}

function winCalc(box) {
  const line = [
    [0,1,2], 
    [3,4,5], 
    [6,7,8], 
    [0,3,6], 
    [1,4,7], 
    [2,5,8], 
    [0,4,8], 
    [2,4,6]
  ]

  for (let d = 0; d < line.length; d++) {

    const [a, b, c] = line[d]

    if (box[a] && box[a] === box[b] && box[a] === box[c]) {

      return box[a]

    } 
  }
  return null
}
