import { StyleSheet } from 'react-native'
import globalStyles from './globalStyles'

const styles = StyleSheet.create({
    container: {
      ...globalStyles.container,
      position: 'relative',
  
    },
    title: {
      ...globalStyles.title,
      paddingVertical: 20,
    },
    deleteButtonContainer:{
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      padding: 0
    },
    studentsContainer: {
      flex: 1,
      paddingHorizontal: 20,
      position: 'relative',
  
    },
    individualStudentContainer: {
      flexDirection: 'row',
    },
    studentInfo:{
      flexDirection: 'row',
      flex: 3,
    },
    assignTask: {
      color: 'blue',
      fontSize: 16,
    },
    assignTaskContainer: { 
      backgroundColor: 'lightgray',
      borderRadius: 10,
      padding: 5,
      alignSelf: 'flex-start',
      flex1: 2,
      },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
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
      backgroundColor: 'gray'
    },
    dropdown: {
      // margin: 16,
      height: 28,
      width: 150,
      backgroundColor: 'white',
      borderRadius: 20,
      paddingHorizontal: 8,
    },
    imageStyle: {
      width: 24,
      height: 24,
      borderRadius: 12,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
      marginLeft: 8,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    filterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 'auto', // Pushes the container to the end
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    membersHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
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
  })

export default styles