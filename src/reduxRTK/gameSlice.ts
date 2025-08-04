import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { calculateWinner, type ISquare } from "../utils/constant";

interface IGameState {
    squares: ISquare[],
    xIsNext: boolean,
    score: {
        x: number,
        0: number
    }
}

const initialState: IGameState = {
    squares: Array(9).fill(''),
    xIsNext: true,
    score: {
        x: 0,
        0: 0
    }
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        move(state, action: PayloadAction<number>) {
            if (!calculateWinner(state.squares) && !state.squares[action.payload]) {
                state.squares[action.payload] = state.xIsNext ? 'X' : 'O'
                state.xIsNext = !state.xIsNext
            }
            if(calculateWinner(state.squares) === 'Draw') return
            if (calculateWinner(state.squares)) {
                !state.xIsNext ? state.score.x++ : state.score[0]++
            }
        },
        restart(state) {
            state.xIsNext = true
            state.squares = Array(9).fill('')
        }
    },
})

export const {move, restart} = gameSlice.actions;

export const gameReducer = gameSlice.reducer