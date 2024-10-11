import { supabase } from '../supabase'


const userHasRole  = async () => {
    const user_uid = await getUserUid()

    const {data, error} = await supabase
      .from('user_info')
      .select('role')
      .eq('user_uid', user_uid )


      return data && data.length && data[0].role ? data[0] : {}
}

const getUserUid = async () => {
  const {data : {session}} = await supabase.auth.getSession()

  return session.user.id
}


export {
  userHasRole,
  getUserUid
}

