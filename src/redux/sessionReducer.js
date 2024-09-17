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
export default sessionReducer