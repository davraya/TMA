import { supabase } from "../src/supabase";

const deleteUser = async (id) => {

    try{
        const response = await supabase
        .from('user_group_membership')
        .delete()
        .eq('user_uid', id)
        console.log('deleteUser response', response)
    } catch (error) {
        console.log('deleteUser error', error)
    }
}

const deleteGroup = async (id) => {
    try{
        const {data, error} = await supabase
        .from('groups')
        .delete()
        .eq('id', id)
        .select()
        console.log('deleteGroup response', data, error)
    } catch (error) {
        console.log('deleteGroup error', error)
    }
}

export {
    deleteUser,
    deleteGroup
}
