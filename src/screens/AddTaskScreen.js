import React, { useState } from 'react'
import { TextInput, View } from 'react-native'
import { Text, Button, Input } from '@rneui/base'
import Spacer from '../components/Spacer'
import { insertNewTask } from '../models/insert'
import styles from '../styles/AddTaskStyles'

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



export default AddInfoScreen