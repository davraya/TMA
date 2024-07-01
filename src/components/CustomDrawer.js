// src/components/CustomDrawer.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import { supabase } from '../supabase';

const CustomDrawer = (props) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    // Perform logout action
    await supabase.auth.signOut();
    dispatch({ type: 'loggedOut' });
    props.navigation.navigate('Auth'); // Navigate to AuthStack
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <DrawerItem
          label="Logout"
          onPress={handleLogout}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default CustomDrawer;
