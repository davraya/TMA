import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { ListItem, Icon, Text } from '@rneui/base';
import Swiper from 'react-native-swiper';
import { MaterialIcons } from '@expo/vector-icons';
import { fetchPeersTasks, fetchUsersTasks } from '../models/fetch';
import { updateTaskStatus } from '../models/update';
import { getUserUid } from '../util/user';
import Spacer from '../components/Spacer';

const StudentDashboard = ({ navigation }) => {
  const [peersTasks, setPeersTasks] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const [reload, setReload] = useState(false);

  const rerender = () => {
    setReload(!reload);
  };

  useEffect(() => {
    const configure = async () => {
      try {
        const user_uid = await getUserUid();
        const tasks = await fetchPeersTasks(user_uid);
        setPeersTasks(tasks);
        const usersTasks = await fetchUsersTasks(user_uid);
        console.log(usersTasks);
        setMyTasks(usersTasks);
      } catch (error) {
        console.error('Error fetching peers tasks:', error);
      }
    };

    configure();
  }, [reload]);

  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      <ListItem containerStyle={styles.listItem}>
        <ListItem.Content>
          <View style={styles.individualStudentContainer}>
            <View style={styles.studentInfo}>
              <MaterialIcons name="task-alt" size={24} color="black" style={{ marginRight: 5 }} />
              <ListItem.Title>{item.title}</ListItem.Title>
            </View>
            <View>
              <ListItem.Subtitle style={styles.subtitle}>Assigned to</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subtitle}>
                {item.first_name} {item.last_name}
              </ListItem.Subtitle>
            </View>
          </View>
          <Text style={styles.taskStatus}>{item.status_name}</Text>
        </ListItem.Content>
      </ListItem>
    </View>
  );

  const renderUsersTask = ({ item }) => (
    <View style={styles.taskContainer}>
      <ListItem containerStyle={styles.listItem}>
        <ListItem.Content>
          <View style={styles.individualStudentContainer}>
            <TouchableOpacity
              style={styles.studentInfo}
              onPress={() => {
                navigation.navigate('Task', { task: item });
              }}
            >
              <MaterialIcons name="task-alt" size={24} color="#1E90FF" style={{ marginRight: 5 }} />
              <ListItem.Title style={styles.taskTitle}>{item.title}</ListItem.Title>
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                disabled={item.status_name === 'Waiting for Supervisor'}
                style={styles.assignTaskContainer}
                onPress={async () => {
                  await updateTaskStatus(item.id, 2);
                  rerender();
                }}
              >
                <Text
                  style={
                    item.status_name === 'Waiting for Supervisor'
                      ? styles.disabledText
                      : styles.activeText
                  }
                >
                  Mark as completed
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <ListItem.Subtitle style={styles.taskStatus}>{item.status_name}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </View>
  );

  return (
    <View style={styles.container}>
      <Swiper loop={false}>
        <View>
          <Spacer />
          <Text style={styles.title}>My Tasks</Text>
          <Spacer />
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={myTasks}
            renderItem={renderUsersTask}
            ItemSeparatorComponent={Spacer}
          />
        </View>
        <View>
          <Spacer />
          <Text style={styles.title}>My Group's Tasks</Text>
          <Spacer />
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={peersTasks}
            renderItem={renderTask}
            ItemSeparatorComponent={Spacer}
          />
        </View>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    color: '#333',
    fontFamily: 'sans-serif',
    fontWeight: '400',
  },
  taskContainer: {
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    margin: 5,
  },
  listItem: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  individualStudentContainer: {
    flexDirection: 'row',
  },
  studentInfo: {
    flexDirection: 'row',
    flex: 2,
  },
  assignTaskContainer: {
    backgroundColor: 'lightgray',
    borderRadius: 10,
    padding: 5,
  },
  taskTitle: {
    color: '#1E90FF',
  },
  subtitle: {
    flex: 2,
    textAlign: 'left',
    fontSize: 12,
  },
  taskStatus: {
    flex: 1,
    textAlign: 'left',
    marginRight: 15,
    paddingTop: 10,
    fontStyle: 'italic',
    fontSize: 14,
    width: 200, // Limit widths,

  },
  disabledText: {
    color: 'black',
    opacity: 0.5,
  },
  activeText: {
    color: 'blue',
  },
});

export default StudentDashboard;
