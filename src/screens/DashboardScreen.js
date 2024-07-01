import React, {useEffect, useState} from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { Text, Button, Input, ListItem } from '@rneui/base'
import Spacer from "../components/Spacer";
import { supabase } from "../supabase";
import { userHasRole } from "../util/user";
import { fetchGroups } from "../../models/fetch";
import { useDispatch, useSelector } from "react-redux";


const DashbaordScreen =  ({ navigation }) => {

  
  const groups = useSelector(state => state.groups.groups)
  const isSignedIn = useSelector(state => state.session.isSignedIn)

  const dispatch = useDispatch()

  useEffect(() => {
    

    const configureScreen = async () => {

      const usersGroups = await fetchGroups();
      dispatch({type: 'updateGroups', payload: usersGroups})

    }

    configureScreen()
    
  }, []);



  const handleSignOut = async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error('Error signing out:', error.message);
        } else {
          console.log('User signed out successfully');
          dispatch({ type : 'hasSignedOut' })
          dispatch({ type: 'clearGroups' })
        }
      } catch (error) {
        console.error('Unexpected error during sign out:', error.message)
      }
    }

    keyExtractor = (item, index) => index.toString()

    const renderItem = ({item}) => (
      (<TouchableOpacity 
        onPress={() => { 
          navigation.navigate('Group', {groupName : item.group_name,  id : item.id})  
            }}>
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>{item.group_name}</ListItem.Title>
            <ListItem.Subtitle>CEO, Example.com</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>)
      
    )  
    

    return(
        < View >
            <Spacer />
            <Text h2 style={styles.title}>Dashboard</Text>
            <Spacer/>
            <Text h3>Groups</Text>
            {console.log(groups)}
            {!(Array.isArray(groups) && groups.length > 0) && <ActivityIndicator/>}
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={groups}
              renderItem={renderItem}
              ItemSeparatorComponent={Spacer}
            />
            <Spacer/>
            <View style={styles.buttonContainer}>
              <Button title='Add Group' type='outline' onPress={() => {navigation.navigate('AddGroup')}} />
            </View>
            <Spacer/>
            <Button title="Sign Out" onPress={handleSignOut} />
        </View>
    )
}

DashbaordScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 100,
    right: 10,
  },
})

export default DashbaordScreen