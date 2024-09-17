import { createStore, combineReducers  } from 'redux'
import sessionReducer from './sessionReducer'
import groupsReducer from './groupsReducer'


const rootReducer  = combineReducers({
    session: sessionReducer,
    groups: groupsReducer
})

const store = createStore(rootReducer)

export { store }