import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { Text, Button, Input } from '@rneui/base'
import Spacer from '../components/Spacer'
import { insertNewTask } from '../models/insert'

const AddInfoScreen = ({ navigation }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    return (
        <View style={styles.container}>
            <Spacer/>
                <Text h3 style={styles.taskText}>{'Task'}</Text>
            <Spacer/>
            <Input
                style={styles.input}
                label='Title'
                value={title}
                onChangeText={setTitle}
                inputContainerStyle={styles.inputContainer}

            />
            <Spacer/>
            <TextInput
                style={styles.textInput}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter description"
            />

            <Spacer/>
            <View style={styles.buttonContainer}>
                <Button
                    title={'Add'}
                    onPress={async () => {
                        try {
                            const { error } = await insertNewTask(title, description, 4) // status 4 is 'unassigned'
                            if (!error)
                                navigation.goBack()
                        } catch (e) {
                            console.log(e)
                        }
                    }}
                />
            </View>
            
        </View>
    )
}

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

export default AddInfoScreen
