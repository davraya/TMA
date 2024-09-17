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

export default groupsReducer