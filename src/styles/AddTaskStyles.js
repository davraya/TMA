import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15
    },
    textInput: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginLeft: 15,
        marginRight: 15,
    },
    input: {
        marginLeft: 15,
        marginRight: 15,
    },
    taskText: {
        alignSelf: 'center',
    },
    inputContainer: {
        marginLeft: 5,
        marginRight: 5,
    },
    container : {
        flexGrow: 1,
        flex: 1,
        
    },
    buttonContainer : {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,    }
})

export default styles