import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { Text, Icon, ListItem, SpeedDial } from '@rneui/base';
import Spacer from "../components/Spacer";
import { fetchGroups } from "../../models/fetch";
import { deleteGroup } from "../../models/delete";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

const DashbaordScreen = ({ navigation }) => {
  const groups = useSelector(state => state.groups.groups);
  const [deleteMode, setDeleteMode] = useState(false);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const configureScreen = async () => {
      const usersGroups = await fetchGroups();
      dispatch({ type: 'updateGroups', payload: usersGroups });
    };

    configureScreen();
  }, []);

  const handleDeleteGroup = async (id) => {
    await deleteGroup(id);
    dispatch({ type: 'deleteGroup', payload: id });
  };

  const keyExtractor = (item) => item.id.toString();

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.touchableContainer}
      onPress={() => { 
        navigation.navigate('Group', { groupName: item.group_name, id: item.id });
      }}>
      <ListItem containerStyle={styles.listItem}>
        <FontAwesome6 name="people-group" size={24} color="black" />
        <ListItem.Content style={styles.groupContainer}>
          <ListItem.Title style={styles.groupTitle}>{item.group_name}</ListItem.Title>
        </ListItem.Content>
        {deleteMode && (
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => handleDeleteGroup(item.id)}
          >
            <Icon name="delete" color="red" />
          </TouchableOpacity>
        )}
      </ListItem>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Spacer />
      <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
        <Text style={styles.title}>Groups</Text>
        {deleteMode ? 
        <TouchableOpacity
          onPress={() => setDeleteMode(false)}
        >
          <Text style={styles.done}>Done</Text>
        </TouchableOpacity> : null}
      </View>
      <Spacer />
      {!(Array.isArray(groups) && groups.length > 0) && <ActivityIndicator />}
      <FlatList
        keyExtractor={keyExtractor}
        data={groups}
        renderItem={renderItem}
        ItemSeparatorComponent={<Spacer />}
      />
      <SpeedDial
        isOpen={open}
        icon={{ name: 'edit', color: '#fff' }}
        openIcon={{ name: 'close', color: '#fff' }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        transitionDuration={75}
        buttonStyle={styles.mainDial}
      >
        <SpeedDial.Action
          icon={<AntDesign name="addusergroup" size={30} color="white" />}
          title="Add Group"
          buttonStyle={styles.addDial}
          onPress={() => {
            setOpen(!open);
            navigation.navigate('AddGroup');
          }}
        />
        <SpeedDial.Action
          icon={<AntDesign name="delete" size={29} color="white" />}
          title="Delete group(s)"
          buttonStyle={styles.deleteDial}
          onPress={() => {
            setDeleteMode(!deleteMode);
            setOpen(!open);
          }}
        />
      </SpeedDial>
    </View>
  );
}

DashbaordScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: 'relative',
    backgroundColor: '#f8f9fa', // Light background color
  },
  title: {
    fontSize: 30,
    color: '#333',
    fontFamily: 'sans-serif',
    fontWeight: '400',
  },
  touchableContainer: {
    borderRadius: 10,
    margin: 5,
    overflow: 'visible', // Ensure shadow is not clipped
    elevation: 2, // Higher elevation for Android

  },
  listItem: {
    borderRadius: 10,
    backgroundColor: '#fff', // Background color for each list item
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row', // Ensure items are aligned horizontally
    justifyContent: 'space-between', // Space between icon, title, and delete button
  },
  groupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Allow content to fill available space
    justifyContent: 'space-between',
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginLeft: 10, // Space between icon and text
  },
  deleteButton: {
    // padding: 8, // Added padding for touch area
  },
  addDial: {
    backgroundColor: 'green',
    width: 50,
    height: 50,
  },
  deleteDial: {
    backgroundColor: 'red',
    width: 50,
    height: 50,
  },
  mainDial: {
    backgroundColor: 'gray',
  },
  done: {
    color: '#1E90FF',
    fontSize: 18,
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    elevation: 2,
    borderRadius: 10,

  }
});



export default DashbaordScreen;
