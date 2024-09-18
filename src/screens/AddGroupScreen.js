import React from "react";
import { Text, Button, Input } from '@rneui/base'
import { useState } from "react";
import Spacer from "../components/Spacer";
import { supabase } from "../supabase";
import { fetchGroups } from "../models/fetch";
import { useDispatch } from "react-redux";


const AddGroupScreen =  ({ route, navigation }) => {

  const dispatch = useDispatch()
  const [groupName, setGroupName] = useState('')
  const [showMessage, setShowMessage] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false)

  const lengthIsGood = groupName.length > 5

  const handleAdd = async () => {
    if (lengthIsGood){
      try{
        const localSession = await supabase.auth.getSession()
        const { error } = await supabase
          .from('groups')
          .insert({group_name : groupName, created_by: localSession.data.session.user.id})
        if(error){
          setIsDuplicate(true); // Show message if length is less than 5
          setTimeout(() => {
            setIsDuplicate(false); // Hide message after 3 seconds
          }, 3000);
        } else{

          const groups = await fetchGroups()
          dispatch({type: 'updateGroups', payload: groups})
          navigation.navigate('Dashboard')
        }
      } catch(error){
        console.log('add group error: ', error)
      }
    }
      
    else {
      setShowMessage(true); // Show message if length is less than 5
      setTimeout(() => {
        setShowMessage(false); // Hide message after 3 seconds
      }, 4000);
    }
    

  };

  return(
    <>
      <Spacer/>
      <Input 
      label='Group Name' 
      value={groupName}
      onChangeText={setGroupName}
      autoCapitalize="none"
      autoCorrect={false}
      />

    <Button
      title='Add'
      onPress={handleAdd}
    />
    <Spacer/>
    {showMessage ? (
        <Text style={{ color: 'red'}}>
          Group name must be at least 5 characters long.
        </Text>
        ) : null}
    {isDuplicate ? (
        <Text style={{ color: 'red'}}>
          Group name already taken. Choose a different one.
        </Text>
        ) : null}

  </>
)

}

AddGroupScreen.navigationOptions = () => {
  return {
    // headerShown: false,
    title: ''
    
  };
};

AddGroupScreen.navigationOptions = () => {
  return {
    // headerShown: false,
    title: ''
    
  };
};

export default AddGroupScreen