import http from '../../config/axios'

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

export const validateBoard = (filled) => {

    return (dispatch) => {
        const data = encodeParams({ board: filled})
        
        http.post('/validate',  data , {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(({ data }) => {
            const status = data.status == 'unsolved' || data.status == 'broken' ? 'Incorrect!  Please try again!' : 'Congratulations! You made it!'

            dispatch({
                type: 'UPDATE_STATUS',
                payload: {
                    status
                }
            })
        })
        .catch(console.log)
    }
}

export const solveBoard = (boardInit) => {
    return (dispatch) => {
        const data = encodeParams({ board: boardInit})
        
        http.post('/solve',  data , {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(({ data }) => {
            dispatch({
                type: 'SOLVE_BOARD',
                payload: {
                    solved: data.solution
                }
            })
        })
        .catch(console.log)
    }
}