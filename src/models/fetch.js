import { supabase } from "../supabase"

const fetchGroups = async () => {
    try{
      const { data: { session } } = await supabase.auth.getSession()
      const { data, error } = await supabase
        .from('groups')
        .select()
        .eq('created_by', session.user.id)
        
        return data
    } catch(e){
      console.log('error fetching groups', e.message)
    }

    
  }

const fetchGroupMembers = async (groupId) => {
  try{
    const { data, error } = await supabase
      .rpc('get_group_members', {group_id_param : groupId})
    
    return data
      
  } catch(e){
    console.log('fetchGroupMembers e', e.message)
  }

}

const fetchGroupsIds = async () => {
  try{
    const { data, error } = await supabase
      .from('groups')
      .select()

  } catch(e){
    console.log('fetchGroupsIds e', e.message)
  }
}
  

const fetchUserById = async () => {

  const { data: { session } } = await supabase.auth.getSession()

  try{
    const { data, error } = await supabase
      .rpc('get_user_name', {user_id_param : session.user.id})
    
    return {first_name: data[0].first_name, last_name: data[0].last_name}
      
  } catch(e){
    console.log('fetchUserById e', e.message)
  }
}
  
const searchUsers = async (nameSubstring) => {
  nameSubstring = nameSubstring.trim()

  if (nameSubstring === '')
    return []

  try {
    const { data, error } = await supabase
      .from('user_info')
      .select('first_name, last_name, user_uid')
      .or(`first_name.ilike.%${nameSubstring}%, last_name.ilike.%${nameSubstring}%`)

    

    if (error) {
      throw error
    }

    let usersName = {}
    try {
      usersName = await fetchUserById()
    } catch (error) {
      console.log('fetchUserById error in searchUsers', error)
    }

    
    const filteredData = data.filter(item => {
      return !(item.first_name === usersName.first_name && item.last_name === usersName.last_name)
    })

    return filteredData // Returns an array of users matching the regex criteria
  } catch (error) {
    console.error('Error searching users:', error.message)
    return null
  }
}

const fetchTasks = async () => {
  try{
    const { data, error } = await supabase
      .from('tasks')
      .select()
    
    if (error) {
      throw error
    }

    return data
      
  } catch(e){
    console.log('fetchTasks e', e.message)
  }

}


const fetchGroupTasks = async (groupId) => {
  console.log(typeof groupId)
  const groupString = groupId.toString()
  try{
    const { data, error } = await supabase
      .rpc('get_group_tasks', {group_id_param : groupId})

    console.log('fetchGroupTasks data', data)
    console.log('fetchGroupTasks error', error)
    
    if (error) {
      throw error
    }
    return data
  } catch(e){
    console.log('fetchGroupTasks e', e.message)
  }
}

const fetchPeersTasks = async (user_id) => {
  try{
    const { data, error } = await supabase
      .rpc('get_peers_tasks', {user_id_param : user_id})
    
    if (error) {
      throw error
    }
    return data
  } catch(e){
    console.log('fetchGroupTasks e', e.message)
  }
}

const fetchUsersTasks = async (user_id) => {
  try{
    const { data, error } = await supabase
      .rpc('get_users_tasks', {student_id_param : user_id})
    
    if (error) {
      throw error
    }
    return data
  } catch(e){
    console.log('fetchUsersTasks e', e.message)
  }
}


export {
    fetchGroups,
    fetchGroupMembers,
    fetchUserById,
    searchUsers,
    fetchTasks,
    fetchGroupTasks,
    fetchPeersTasks,
    fetchUsersTasks 
}