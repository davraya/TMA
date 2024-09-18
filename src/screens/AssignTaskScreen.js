import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, ListItem, FAB, SpeedDial, Icon } from '@rneui/base';
import Spacer from '../components/Spacer';
import { fetchTasks } from '../models/fetch';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { asssignTask } from '../models/insert';
import CustomSlider from '../components/CustomSlider';

const AssignTaskScreen = ({ navigation, route }) => {
  const { params: { userParam } } = route;
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [dropdowns, setDropdowns] = useState({});
  const [user, setUser] = useState(userParam);
  const [priroity, setPriority] = useState(1);

  useEffect(() => {
    const configureScreen = async () => {
      const tasksResult = await fetchTasks();
      setTasks(tasksResult);
    };

    configureScreen();
  }, []);

  const toggleDropdown = (index) => {
    setDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      [index]: !prevDropdowns[index],
    }));
  };

  const renderItem = ({ item, index }) => (
    <View>
      <ListItem>
        <ListItem.Content style={styles.studentContainer}>
          <View style={styles.studentInfo}>
            <TouchableOpacity onPress={() => toggleDropdown(index)}>
              {dropdowns[index] ? (
                <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
              ) : (
                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
              )}
            </TouchableOpacity>
            <ListItem.Title style={styles.taskTitle}>{item.title}</ListItem.Title>
          </View>
          <TouchableOpacity 
            style={styles.assignTaskContainer}
            onPress={async () => {
                await asssignTask(item.id, user.user_uuid, priroity);
                navigation.goBack();
                
            }}
            >
            <Text style={styles.assignTask}>Assign</Text>
          </TouchableOpacity>
        </ListItem.Content>
      </ListItem>
      {dropdowns[index] && (
        <View style={styles.dropdownContent}>
          <Text>{item.description}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Spacer />
      <Text  style={styles.title}>Assigning to</Text>
      <Text  style={styles.title}>{user.first_name} {user.last_name}</Text>
      <View style={{alignItems: 'center'}}>
        <CustomSlider onValueChange={setPriority}/>
        
      </View>
      <Spacer />
      {!(Array.isArray(tasks) && tasks.length > 0) && <ActivityIndicator/>}
      <View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={tasks}
        renderItem={renderItem}
        ItemSeparatorComponent={Spacer}
      />
      </View>
      

      <View style={{alignSelf: 'center'}}>

      </View>
     

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
          icon={<MaterialIcons name="add-task" size={30} color="white" />}
          title="Add Task"
          buttonStyle={styles.addTaskDial}
          onPress={() => {
            setOpen(!open);
            navigation.navigate('AddTask');
          }}
        />
        <SpeedDial.Action
          icon={<Ionicons name="person-add" size={30} color="white" />}
          title="Add User"
          buttonStyle={styles.addUserDial}
          onPress={() => {
            setOpen(!open);
            navigation.navigate('AddUser', { groupId: id });
          }}
        />
        <SpeedDial.Action
          icon={<AntDesign name="delete" size={29} color="white" />}
          title="Delete user(s)"
          buttonStyle={styles.deleteDial}
          onPress={() => {
            setDeleteMode(!deleteMode);
            setOpen(!open);
          }}
        />
      </SpeedDial>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: 'relative',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontWeight: '400', // Ensure the font weight is normal

  },
  deleteFab: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  addUserDial: {
    backgroundColor: 'green',
    width: 50,
    height: 50,
  },
  addTaskDial: {
    backgroundColor: 'blue',
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
  deleteButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  studentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  studentInfo: {
    flexDirection: 'row',
    flex: 3,
  },
  assignTask: {
    color: 'blue',
    fontSize: 16,
  },
  assignTaskContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 5,
    alignSelf: 'flex-start',
    flex1: 2,
  },
  taskTitle: {
    fontSize: 15,
    marginLeft: 10,
  },
  dropdownContent: {
    paddingLeft: 30,
    paddingVertical: 10,
  },
});

export default AssignTaskScreen;
