import { supabase } from '../supabase'


const userHasRole  = async () => {
    const user_uid = await getUserUid()

    const {data, error} = await supabase
      .from('user_info')
      .select('role')
      .eq('user_uid', user_uid )
    console.log('d', data);

    return Array.isArray(data) && data.length > 0 // When the user has no role, sometimes data is null and some other times it is an empty array

}

const getUserUid = async () => {
  const {data : {session}} = await supabase.auth.getSession()

  return session.user.id
}


export {
  userHasRole,
  getUserUid
}

