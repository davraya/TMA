import { supabase } from "../supabase"
import { getUserUid } from "../models/user"


const updateUserRole = async (selectedRole, user_uid, groupCode) => {

    try{
        const uid = await getUserUid()
        const { data, error } = await supabase.rpc('update_user_role', { id : uid, new_role: selectedRole })


    } catch(e)
    {
        console.log('error updating user role', e)
    }

    const { error2 } = await supabase
        .from('user_group_membership')
        .insert({group_id : groupCode, user_uid, role: selectedRole})


    }

const addUserToGroup = async (groupId, uid) =>{
        const { error } = await supabase
        .from('user_group_membership')
        .insert({group_id : groupId, user_uid: uid, role: 'student'})
    console.log('addUserToGroup e', error)
}

const insertName = async (first_name, last_name) => {

    try {
        const { data: { session } } = await supabase.auth.getSession()
        const { error } = await supabase
            .from('user_info')
            .insert({first_name, last_name, user_uid : session.user.id })
        
        return {error}
    } catch (e) {
        console.log('error inserting name', e)
    }

}

const insertNewTask = async (title, description, status) => {
    try {
        const { error } = await supabase
            .from('tasks')
            .insert({title, description, status})
        
        return {error}
    } catch (e) {
        console.log('error inserting new task', e)
    }
}

const asssignTask = async (task_id, user_uid, priority_id) => {
    try {
        const { error } = await supabase
            .from('task_assignments')
            .insert({task_id, student_id: user_uid, status_id: 1, priority_id})
        console.log('asssignTask e', error)

        if(error)
            throw error
        return {success: true}
        
        } catch (e) {
        console.log('error assigning task', e)
    }
}




export {
    updateUserRole,
    insertName,
    addUserToGroup,
    insertNewTask,
    asssignTask
}
