import React, { useState } from 'react'
import { StyleSheet} from 'react-native'
import { Text, Button, Input } from '@rneui/base'
import Spacer from './Spacer'

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText, callback}) => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')



    return(
        <>
            <Spacer>
                <Text h3>{headerText}</Text>
            </Spacer>
            <Input 
             label='Email'
             value={email}
             onChangeText={setEmail}
             autoCapitalize="none"
             autoCorrect={false}
             />
            <Spacer />
            <Input 
             secureTextEntry // same as setting it to true
             label='Password' 
             value={password}
             onChangeText={setPassword}
             autoCapitalize="none"
             autoCorrect={false}

             />

            {errorMessage? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

            <Spacer>
                <Button title={submitButtonText} onPress={() => {
                    const { data, error } = onSubmit({email, password})
                    if (callback){
                        if(!error)
                            callback()
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

export default AuthForm
