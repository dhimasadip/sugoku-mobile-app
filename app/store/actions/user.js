

export const addUser = (data) => {
    return (dispatch) => {
        dispatch({
            type: 'ADD_USER',
            payload: {
                name: data.name,
                score: data.score
            }
        })
    }
}