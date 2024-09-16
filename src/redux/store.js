import { createStore, combineReducers  } from 'redux'
import { fetchGroups } from '../../models/fetch'

const sessionReducer = (state = {roleHasBeenSelected : true, isSignedIn : false, userName: '', role: ''} , action) => {
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
    if(action.type == 'nameSelected')
        {
            return {
                ...state, userName : action.payload.name
            }
        }
    if(action.type == 'setRole')
        {
            return {
                ...state, role : action.payload.role
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
    if (action.type == 'deleteGroup'){
        return {
            groups : state.groups.filter(group => group.id != action.payload)
        }
    }

    return state
}


const rootReducer  = combineReducers({
    session: sessionReducer,
    groups: groupsReducer
})
const store = createStore(rootReducer)

export { store }