import React, { useEffect, useState } from "react";
import styles from "../styles/DashboardStyles";
import { View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
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
    const initializeData = async () => {
      const usersGroups = await fetchGroups();
      dispatch({ type: 'updateGroups', payload: usersGroups });
    };

    initializeData();
  }, []);

  const handleDeleteGroup = async (id) => {
    await deleteGroup(id);
    dispatch({ type: 'deleteGroup', payload: id });
  };

  const keyExtractor = (group) => group.id.toString();

  const groupComponent = ({ item }) => (
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
            onPress={() => handleDeleteGroup(item.id)}
          >
            <Icon name="delete" color="red" />
          </TouchableOpacity>
        )}
      </ListItem>
    </TouchableOpacity>
  );


  // MAIN JSX COMPONENT
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
        renderItem={groupComponent}
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





export default DashbaordScreen;
