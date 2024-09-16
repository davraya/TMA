// src/components/CustomDrawer.js
import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '../supabase';
import { fetchUserById } from '../../models/fetch'
import { Text, Icon } from '@rneui/base';
import { MaterialIcons } from '@expo/vector-icons';

const CustomDrawer = (props) => {
  const [userName, setUsername] = useState('')
  const isSignedIn  = useSelector(state => state.session.isSignedIn)

  const dispatch = useDispatch();

  useEffect(() => {
    

    const configureComponent = async () => {

      const userNameResult = await fetchUserById();
      setUsername(userNameResult)
    }

    configureComponent()
    
  }, [isSignedIn]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error.message);
      } else {
        console.log('User signed out successfully');
        dispatch({ type : 'hasSignedOut' })
        dispatch({ type: 'clearGroups' })
        dispatch({ type: 'roleNotSelected' })
        
      }
    } catch (error) {
      console.error('Unexpected error during sign out:', error.message)
    }
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Icon name="person" style={styles.icon} />
          <Text h4>{userName == null ? null : `${userName.first_name} ${userName.last_name}`}</Text>
        </View>
        <View style={styles.logout}>
          <TouchableOpacity 
          style={{flexDirection: 'row'}}
          onPress={handleLogout}
          >
          <MaterialIcons name="logout" size={20} color="black" />
          <Text style={{paddingLeft: 5}}>Logout</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    position: 'relative',
    justifyContent: 'space-between',
    paddingLeft: 0
  },
  logout: {
    position: 'absolute',
    bottom: 20,
    left : 10,
    flexDirectionr: 'row',
  },
  userInfo : {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  icon : {
    padding: 5
  }
  });

export default CustomDrawer;
