import { supabase } from "../src/supabase";


const addUserToGroup = async (selectedRole, user_uid, groupCode) => {
    const { error1 } = await supabase
        .from('user_info')
        .insert({role: selectedRole, user_uid })

    const { error2 } = await supabase
        .from('user_group_membership')
        .insert({group_id : groupCode, user_uid, role: selectedRole})

    console.log('e2', error2);

    }


export {
    addUserToGroup
}