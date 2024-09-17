import React, { useEffect, useState, useCallback} from 'react';
import styles from '../styles/GroupStyles'
import { View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Text, ListItem, FAB, SpeedDial, Icon, Dialog, CheckBox  } from '@rneui/base';
import Spacer from '../components/Spacer';
import { fetchGroupMembers, fetchGroupTasks } from '../../models/fetch';
import { updateTaskStatus } from '../../models/update';
import { deleteUser } from '../../models/delete';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SelectCountry } from 'react-native-element-dropdown';
import Swiper from 'react-native-swiper'
import { MaterialCommunityIcons } from '@expo/vector-icons';



const GroupScreen = ({ navigation, route }) => {
  const { params : {groupName, id} } = route;
  const [groupMembers, setGroupMembers] = useState([])
  const [open, setOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [groupTasks, setGroupTasks] = useState([])
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(1);
  const [changingTaskId, setchangingTaskId] = useState(false);
  const [reload, setReload] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const statuses = [
  { displayTitle: 'Completed', title: 'Completed', id: 3 },
  { displayTitle: 'Unassigned', title: 'Unassigned', id: 4 },
  { displayTitle: 'Incomplete', title: 'Incomplete', id: 1 },
  { displayTitle: 'Waiting for...', title: 'Waiting for Supervisor', id: 2 }
  ];

  const filterByStatus = (status_id) => {
    const filteredTasks = groupTasks.filter(task => task.status_name === status_id)
    console.log(filteredTasks)
    setFilteredTasks(filteredTasks)
  }

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const rerender = () => {
    setReload(prev => {
      const newState = !prev;
      return newState;
    });
  };

  useFocusEffect(
    useCallback(() => {
      rerender();
    }, [])
  );


  useEffect(() => {

    const getTasks = async (groupId) => {
      const groupTasksResult = await fetchGroupTasks(groupId);
      if (groupTasksResult === null) return
      const sortedTasks = groupTasksResult.sort((a, b) => a.id - b.id);
      setGroupTasks(sortedTasks);
    }

    const getMembers = async () => {
      const members = await fetchGroupMembers(id)
      setGroupMembers(members);
    }

    const asyncCalls = async () => {
      await getMembers()
      await getTasks(id)
    }
    asyncCalls()
  }, [reload]);

  

  keyExtractor = (item, index) => index.toString()

  const renderStudent = ({item}) => (
    (<View style ={{borderRadius: 10, backgroundColor: 'gray',   borderRadius: 20, elevation: 2, margin: 4}}>
      <ListItem style={{overflow: 'hidden', borderRadius: 20}}>
        <ListItem.Content  style={styles.individualStudentContainer}>
          <View style={styles.studentInfo}>
            <AntDesign name="user" size={24} color="black" style={{ marginRight:5 }}/>
            <ListItem.Title >{`${item.first_name} ${item.last_name}`}</ListItem.Title>
          </View>
          <TouchableOpacity 
            style={styles.assignTaskContainer}
            onPress={() => { 
              navigation.navigate('AssignTask', {userParam : item}) 
            }}
            >
            <Text style={styles.assignTask}>Assign Task</Text>
          </TouchableOpacity>
          {deleteMode ? 
          <TouchableOpacity style={styles.deleteButtonContainer}
            onPress={async () =>{
              await handleDelete(item.user_uuid)
              rerender()
              console.log('delete user');

            }}>
            <Icon name="delete" color="red" />
          </TouchableOpacity>
          : null}
        </ListItem.Content>
      </ListItem>
    </View>)
    
  ) 

  const renderTask = ({item}) => (
    (<View style ={{borderRadius: 10, backgroundColor: 'gray',   borderRadius: 20, elevation: 3, margin: 5}}>
      <ListItem style={{overflow: 'hidden', borderRadius: 20}}>
        <ListItem.Content>
          <View style={styles.individualStudentContainer}>
            <View style={styles.studentInfo}>
              <MaterialIcons name="task-alt" size={24} color="black" style={{marginRight: 5}}/>
              <ListItem.Title >{item.title}</ListItem.Title>
            </View>
            <TouchableOpacity 
              style={styles.assignTaskContainer}
              onPress={() => {
                setchangingTaskId(item.id)
                toggleDialog()
              }}
              >
              <Text style={styles.assignTask}>Change status</Text>
            </TouchableOpacity>
            {deleteMode ? 
            <TouchableOpacity style={styles.deleteButtonContainer}
              onPress={async () => {
                await handleDelete(item.user_uuid)
                rerender()
              }}>
              <Icon name="delete" color="red" />
            </TouchableOpacity>
            : null}
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop:8}}>
            <ListItem.Subtitle style={{flex: 2, textAlign: 'left'}}>Assigned to {item.first_name} {item.last_name}</ListItem.Subtitle>
            <ListItem.Subtitle style={{flex: 1, textAlign: 'left', fontStyle: 'italic'}}>{item.status_name}</ListItem.Subtitle>
          </View>
        </ListItem.Content>
      </ListItem>
    </View>)
    
  )  



  const handleDelete = async (uuid) => {
    await deleteUser(uuid)
  }


  return (
    

    <View style={styles.container}>
     
      <Swiper loop={false}>
        
        <View style={styles.studentsContainer}>
          <Spacer/>
          <View style={styles.membersHeader}>
            <Text style={{fontSize: 20}}>Members</Text>
            {deleteMode ? 
            <TouchableOpacity
              onPress={() => setDeleteMode(false)}
            >
              <Text style={styles.done}>Done</Text>
            </TouchableOpacity> : null}
          </View>
          
          <Spacer/>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={groupMembers}
              renderItem={renderStudent}
              ItemSeparatorComponent={Spacer}
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
                icon={<MaterialIcons name="add-task" size={30} color="white" />}
                title="Add Task"
                buttonStyle={styles.addTaskDial}
                onPress={() => {
                  setOpen(!open)
                  navigation.navigate('AddTask')
                }}

              />
              <SpeedDial.Action
                icon={<Ionicons name="person-add" size={30} color="white" />}
                title="Add User"
                buttonStyle={styles.addUserDial}
                onPress={() => {
                  setOpen(!open)
                  navigation.navigate('AddUser', {groupId: id})
                }}

              />
              <SpeedDial.Action
                icon={<AntDesign name="delete" size={29} color="white" />}
                title="Delete user(s)"
                buttonStyle={styles.deleteDial}
                onPress={() => {
                  setDeleteMode(!deleteMode)
                  setOpen(!open)
                }}
              />
          </SpeedDial>
      
        </View>

        <View style={styles.studentsContainer}>
          <Spacer/>
          <View style={styles.header}>
            <Text style={{fontSize: 20}}>Group's Tasks</Text>
            <View style={styles.filterContainer}>
              <SelectCountry
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.placeholderStyle}
                imageStyle={styles.imageStyle}
                iconStyle={styles.iconStyle}
                maxHeight={200}
                value={filterStatus}
                data={statuses}
                valueField="title"
                labelField="displayTitle"
                placeholder="Filter by"
                searchPlaceholder="Search..."
                onChange={status => {
                  setFilterStatus(status.title);
                  filterByStatus(status.title);
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setFilterStatus("");
                  setFilteredTasks([]);
                }}
              >
                <MaterialCommunityIcons name="filter-off-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>

          </View>
          <Spacer/>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={filterStatus === "" ? groupTasks : filteredTasks}
            renderItem={renderTask}
            ItemSeparatorComponent={Spacer}
          />
          <Dialog isVisible={visible} onBackdropPress={toggleDialog} overlayStyle={{backgroundColor: 'white'}}>
            <Dialog.Title title="Select Status" />
            {statuses.map((status) => (
              <CheckBox
                key={status.id}
                title={status.title}
                containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={checked === status.id}
                onPress={() => setChecked(status.id)}
              />
            ))}
            <Dialog.Actions>
              <Dialog.Button title="CONFIRM" onPress={async () => {
                await updateTaskStatus(changingTaskId, checked)
                toggleDialog()
                rerender()
              }} />
              <Dialog.Button title="CANCEL" onPress={toggleDialog} />
            </Dialog.Actions>
          </Dialog>
        </View>
        
      </Swiper>

    </View>
  );
};



export default GroupScreen;
