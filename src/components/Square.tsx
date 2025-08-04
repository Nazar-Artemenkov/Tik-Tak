import './Square.css'
import type { FC } from "react"
import type { ISquare } from "../utils/constant"

interface ISquareProps {
    value: ISquare,
    move: () => void
}

const Square: FC<ISquareProps> = ({ value, move }) => {
    return (
        <button className="square-button" onClick={move}>
            {value}
        </button>
    );

}

export default Square