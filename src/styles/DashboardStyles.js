import { StyleSheet } from 'react-native';
import globalStyles from './globalStyles';

const styles = StyleSheet.create({
    container: {
      ...globalStyles.container,  
      paddingHorizontal: 20,
      position: 'relative',
    },
    title: {
      ...globalStyles.title,
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

  export default styles