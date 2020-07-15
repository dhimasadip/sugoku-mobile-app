import { combineReducers } from 'redux'
import boardReducer from './boardReducer'
import filledBoardReducer from './filledBoardReducer'
import usersReducer from './/usersReducer'

const reducers = combineReducers({
    boardReducer, filledBoardReducer, usersReducer
})

export default reducers