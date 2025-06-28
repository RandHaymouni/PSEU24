import { useEffect, useState } from 'react'
import { PartyPopper, Meh } from 'lucide-react';
import Confetti from 'react-confetti'
import './App.css'
import { useWindowSize } from 'react-use';

function App() {
  const [board, setBoard] = useState(() => {
    const saved = localStorage.getItem("XOBoard");
    return saved ? JSON.parse(saved) : Array(9).fill('');
  });
  const [isXTurn, setIsXTurn] = useState(() => {
    const saved = localStorage.getItem("turnValue");
    return saved ? JSON.parse(saved) : true;

  });

  useEffect(() => {
    const value = localStorage.getItem("turnValue");
    const XOBoard = localStorage.getItem("XOBoard");

    if (value)
      setIsXTurn(JSON.parse(value));
    if (XOBoard)
      setBoard(JSON.parse(XOBoard));
  }, [])


  const calculateWinner = (board: string[]) => {
    const boardLines: number[][] = [
      [0, 1, 2],//Rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],//Columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],//diagonals
      [2, 4, 6]
    ]

    for (const line of boardLines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(board);

  useEffect(() => {
    localStorage.setItem("turnValue", JSON.stringify(isXTurn))
    localStorage.setItem("XOBoard", JSON.stringify(board))
    if (winner)
      localStorage.setItem("winner", JSON.stringify(winner))

  }, [board, isXTurn, winner])

  const handelRestartButton = () => {
    setBoard(Array(9).fill(''));
    setIsXTurn(true);
    localStorage.clear();
  }

  const handelClick = (index: number) => {
    if (board[index] !== '' || winner !== null)
      return

    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O';
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  }

  const { width, height } = useWindowSize();

  return (
    <div className='app'>
      <h1>XO (Tic-Tac-Toe) Game !</h1>
      <div className='board'>
        {
          board.map((value: string, index: number) => (
            <div
              className={`cell ${value === 'X' ? 'x' : 'o'}`}
              key={index}
              onClick={() => handelClick(index)}
            >
              {value}
            </div>
          ))
        }
      </div>
      <h2>
        {winner && <Confetti
          width={width}
          height={height}
          numberOfPieces={300}
          gravity={0.3}
          recycle={false}
        />}

        {
          winner !== null ? <span className='turnValue'>Player <span className={`${!isXTurn ? 'x' : 'o'}`}>{winner}</span> Wins <PartyPopper size={30} /> </span> :
            board.every((cell: string) => cell !== ('')) ?
              <div className='turnValue'>It's a Draw  <Meh size={30} strokeWidth={3} /></div> :
              <div className='turnValue'>Turn :
                <span className={`${isXTurn ? 'x' : 'o'}`}> {isXTurn ? 'X' : 'O'}</span>
              </div>
        }
      </h2>

      <button className='rstBtn' onClick={() => handelRestartButton()}>Restart The Game</button>

    </div>
  )
}

export default App
