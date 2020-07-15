
const initialState = {
    users: []
}

export default (state = initialState, { payload, type }) => {
    switch (type) {
        case 'ADD_USER':
            const newUser = {
                name: payload.name,
                score: payload.score
            }

            const index = state.users.findIndex(el => el.name == newUser.name)

            if (index >= 0) {
                const [...duplicateUsers] = state.users
                duplicateUsers[index] = newUser
                return {...state, users: duplicateUsers}
            } else {
                return {...state, users: state.users.concat(newUser)}
            } 
        default:
            return state
    }
}