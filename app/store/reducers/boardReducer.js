const initialState = {
    board: [],
    solvedBoard: [],
    status: 'unsolved'
}

export default (state = initialState, action) => {
    
    switch (action.type) {
        case 'GET_BOARD':
            return {...state, board: action.payload.board, status: action.payload.status}
        case 'CLEAR_BOARD':
            return {...state, board: [], solvedBoard: [], status: action.payload.status}
        case 'SOLVE_BOARD':
            return {...state, solvedBoard: action.payload.solved}
        case 'UPDATE_STATUS':
            return {...state, status: action.payload.status}
        default:
            return state
    }
}