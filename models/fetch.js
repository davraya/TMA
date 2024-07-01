import { supabase } from "../src/supabase";

const fetchGroups = async () => {
    try{
      const { data: { session } } = await supabase.auth.getSession()
      const { data, error } = await supabase
        .from('groups')
        .select()
        .eq('created_by', session.user.id)
        
        return data
    } catch(e){
      console.log(e.message);
    }

    
  }

  



export {
    fetchGroups,
}