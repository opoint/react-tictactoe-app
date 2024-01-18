import { useState } from 'react';
import "./App.css"
import Board from './components/Board';

function App() {

  const [history, setHistory] = useState( [ {squares: Array(9).fill(null)} ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (let index = 0; index < lines.length; index++) {
      const [a, b, c] = lines[index];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
  }

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const newCurrent = newHistory[newHistory.length - 1];
    const newSquares = newCurrent.squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    } 
    newSquares[i] = xIsNext ? 'X' : 'O';
    setXIsNext(prev => !prev);
    setHistory([...newHistory, {squares: newSquares}]);
    // setStepNumber(newHistory.length);
    setStepNumber(history.length - 1);
  }

  const moves = history.map((item, index) => {
    const desc = index ?
    `Go to move #${index}` :
    `Go to game start`;
    return (
      <li key={'history_item_' + index}>
        <button className='move-button' onClick={() => jumpTo(index)}>{desc}</button>
      </li>
    )
  });
  
  const jumpTo = (index) => {
    setStepNumber(index);
    setXIsNext((index % 2) === 0);
    // setHistory(history.slice(0, index + 1));
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          squares={current.squares}
          onClick={(i) => {handleClick(i)}}
        />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol className='history-list'>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
