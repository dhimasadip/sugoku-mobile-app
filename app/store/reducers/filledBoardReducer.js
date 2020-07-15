const initialState = {
    board: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BOARD_DATA':
            return {...state, board: action.payload.board}
            
        case 'FILL_BOARD':
            const [...newBoard] = state.board
            const row = action.payload.rowIndex
            const col = action.payload.colIndex
            newBoard[row][col] = Number(action.payload.input)

            return {...state, board: newBoard}
        default:
            return state
    }
}