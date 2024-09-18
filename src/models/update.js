import { supabase } from '../supabase'

const updateTaskStatus = async (task_id, status_id) => {
    try {
        const { data, error } = await supabase.rpc('update_task_status', { task_id_param: task_id, status_id_param: status_id });

        if (error) {
            throw error
        }
        return data
    } catch (error) {
        console.log('updateTaskStatus error', error.message);
    }
    
}



export { 
    
    updateTaskStatus,
}