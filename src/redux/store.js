import { createStore, combineReducers  } from 'redux'
import { fetchGroups } from '../../models/fetch'

const sessionReducer = (state = {roleHasBeenSelected : true, isSignedIn : false} , action) => {
    if (action.type == 'roleNotSelected'){
        return {
            ...state,
            roleHasBeenSelected : false
        } 
    }
    if (action.type == 'roleSelected'){
        return {
            ...state,
            roleHasBeenSelected : true
        }
    }
    if(action.type == 'hasSignedIn')
        {
            return {
                ...state, isSignedIn : true
            }
        }
    if(action.type =='hasSignedOut')
        {
            return {
                ...state, isSignedIn : false
            }
        }

    return state
}

const groupsReducer = (state = {groups : []} , action) => {
    if (action.type == 'updateGroups'){
        return {
            groups : action.payload
        } 
    }
    if (action.type == 'clearGroups'){
        return { groups : []}
    }

    return state
}


const rootReducer  = combineReducers({
    session: sessionReducer,
    groups: groupsReducer
})
const store = createStore(rootReducer)

export { store }