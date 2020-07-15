
export const fillBoard = (data) => {
    return (dispatch) => {
        dispatch({
            type: 'FILL_BOARD',
            payload: {
                input: data.input,
                rowIndex: data.rowIndex,
                colIndex: data.colIndex
            }
        })
    }
}