import http from '../../config/axios'

export const getBoard = (difficulty) => {
    return (dispatch) => {
        http.get(`board?difficulty=${difficulty}`)
        .then(({ data }) => {
            dispatch({
                type: 'GET_BOARD',
                payload: {
                    board: data.board,
                    status: 'Incorrect!  Please try again!'
                }
            })
            dispatch({
                type: 'GET_BOARD_DATA',
                payload: {
                    board: JSON.parse(JSON.stringify(data.board))
                }
            })
        })
        .catch(console.log)
    }
}


export const clearBoard = () => {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_BOARD',
            payload: {
                status: 'Incorrect!  Please try again!'
            }
        })
    }
}