import { useState } from "react"

function Square({value, squareClicked}) { 
  return (
    <button className="square" onClick={squareClicked}> {value} </button>
    
  )
}


export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  
  function gotClicked(s) {
    const nearSquares = squares.slice()
    nearSquares[s] = "X"
    setSquares(nearSquares)
  }

  return (
    <>
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
