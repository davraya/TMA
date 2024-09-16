import React, { useState } from 'react'
import { StyleSheet} from 'react-native'
import { Text, Button, Input } from '@rneui/base'
import Spacer from '../components/Spacer'
import { insertName } from '../../models/insert'

const AddInfoScreen = ({navigation}) => {
    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')



    return(
        <>
            <Spacer>
                <Text h3>{'Info'}</Text>
            </Spacer>
            <Input 
             label='First Name'
             value={firstName}
             onChangeText={setFirstName}
             autoCorrect={false}
             />
            <Spacer />
            <Input 
             label='Last Name' 
             value={lastName}
             onChangeText={setLastName}
             autoCapitalize="none"
             autoCorrect={false}

             />


            <Spacer>
                <Button title={'Save'} onPress={async () => {
                    try{
                        const {error} = await insertName(firstName, lastName)
                        if (!error)
                            navigation.navigate('RoleSelector')

                    }catch(e)
                    {
                        console.log('Add info button e', e)
                    }
                   
                    
                }} />
            </Spacer>
        </>

    )
}

const styles = StyleSheet.create({
    errorMessage:{
        fontSize: 16,
        color: 'red',
        marginLeft: 15
    },
})

export default AddInfoScreen
