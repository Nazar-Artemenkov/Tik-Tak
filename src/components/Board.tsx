import './Board.css'
import { calculateWinner } from "../utils/constant"
import { v4 } from "uuid"
import Square from "./Square"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../reduxRTK/store"
import { move, restart } from "../reduxRTK/gameSlice"
import { useCallback, useMemo } from 'react'

const Board = () => {
    // const [squares, setSquares] = useState<ISquare[]>(Array(9).fill(''))
    // const [xIsNext, setXIsNext] = useState<boolean>(true)

    const { score, squares, xIsNext } = useSelector((state: (RootState)) => state.game)
    const dispatch: AppDispatch = useDispatch()

    const winner = useMemo(() => calculateWinner(squares), [squares])
    const status = useMemo(() => !winner
        ? `Go: ${xIsNext ? 'X' : 'O'}`
        : winner === 'Draw'
            ? 'Draw' : `Winner ${winner}`, [winner, xIsNext])

    // useCallback(() => {}, [])

    const handleClick = useCallback((i: number) => {
        if (!winner) dispatch(move(i))
    }, [winner, dispatch])

    // const restart = () => {
    //     setSquares(Array(9).fill(''))
    //     setXIsNext(true)
    // }

    return (
        <div className="game-container">
            <div className="scoreboard">
                Нолики {score[0]} : {score.x} Крестики
            </div>

            <div className="status-message">{status}</div>

            <div className="board">
                {squares.map((e, i) => (
                    <Square key={v4()} value={e} move={() => handleClick(i)} />
                ))}
            </div>

            <button className="restart-button" onClick={() => dispatch(restart())}>
                Сыграть ещё раз
            </button>
        </div>
    );
}

export default Board